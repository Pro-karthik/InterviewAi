import { useEffect, useRef, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const useCameraPositionCheck = (videoRef) => {
  const [status, setStatus] = useState({
    isFaceDetected: false,
    isCentered: false,
    alignmentMessage: "Initializing...",
  });

  const modelRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const waitForVideoReady = () =>
      new Promise((resolve) => {
        const video = videoRef.current;
        const check = () => {
          if (video?.readyState === 4) resolve();
          else requestAnimationFrame(check);
        };
        check();
      });

    const init = async () => {
      await tf.setBackend("webgl");
      await tf.ready();

      modelRef.current = await blazeface.load();

      await waitForVideoReady();

      detectLoop();
    };

    const detectLoop = async () => {
      const video = videoRef.current;
      if (!video || !modelRef.current) {
        rafRef.current = requestAnimationFrame(detectLoop);
        return;
      }

      try {
        const predictions = await modelRef.current.estimateFaces(video, false);

        if (!isMounted) return;

       if (!predictions || predictions.length === 0) {
  setStatus({
    isFaceDetected: false,
    isCentered: false,
    faceDirection: null,
    alignmentMessage: "No face detected",
  });

} else if (predictions.length > 1) {
  setStatus({
    isFaceDetected: true,
    isCentered: false,
    faceDirection: null,
    alignmentMessage: "Multiple faces detected. Only one person allowed.",
  });

} else {
         const face = predictions[0];

const [x1, y1] = face.topLeft;
const [x2, y2] = face.bottomRight;

const boxWidth = x2 - x1;
const boxHeight = y2 - y1;

const faceCenterX = x1 + boxWidth / 2;
const faceCenterY = y1 + boxHeight / 2;

const videoCenterX = video.videoWidth / 2;
const videoCenterY = video.videoHeight / 2;

const thresholdX = video.videoWidth * 0.15;
const thresholdY = video.videoHeight * 0.15;

const isCentered =
  Math.abs(faceCenterX - videoCenterX) < thresholdX &&
  Math.abs(faceCenterY - videoCenterY) < thresholdY;
// --- FACE DIRECTION LOGIC ---

const landmarks = face.landmarks;

const rightEye = landmarks[0];
const leftEye = landmarks[1];
const nose = landmarks[2];

let faceDirection = "straight";

if (rightEye && leftEye && nose) {
  const eyeCenterX = (leftEye[0] + rightEye[0]) / 2;
  const noseOffset = nose[0] - eyeCenterX;

  const faceWidth = x2 - x1;
  const directionThreshold = faceWidth * 0.07; // tweakable

  if (noseOffset > directionThreshold) {
    faceDirection = "right";
  } else if (noseOffset < -directionThreshold) {
    faceDirection = "left";
  }
}
let alignmentMessage = "Perfect alignment";

if (!isCentered) {
  alignmentMessage = "Please center your face";
} else if (faceDirection !== "straight") {
  alignmentMessage = `Please look straight (${faceDirection})`;
}

setStatus({
  isFaceDetected: true,
  isCentered,
  faceDirection,
  alignmentMessage,
});

         
        }
      } catch (err) {
        console.error("BlazeFace error:", err);
      }

      rafRef.current = requestAnimationFrame(detectLoop);
    };

    init();

    return () => {
      isMounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      modelRef.current = null;
    };
  }, [videoRef]);

  return status;
};

export default useCameraPositionCheck;
