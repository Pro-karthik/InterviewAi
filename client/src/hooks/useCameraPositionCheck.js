import { useEffect, useRef, useState } from "react";
import * as faceDetection from "@tensorflow-models/face-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const useCameraPositionCheck = (videoRef) => {
  const [status, setStatus] = useState({
    isFaceDetected: false,
    isCentered: false,
    faceDirection: null,
    alignmentMessage: "Initializing...",
  });

  const detectorRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const waitForVideoReady = () =>
      new Promise((resolve) => {
        const video = videoRef.current;
        const checkReady = () => {
          if (
            video &&
            video.videoWidth > 0 &&
            video.videoHeight > 0 &&
            !video.paused
          ) {
            resolve();
          } else {
            requestAnimationFrame(checkReady);
          }
        };
        checkReady();
      });

    const initDetector = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();

        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
const detectorConfig = { runtime: "tfjs", maxFaces: 1, modelType: "short" };
detectorRef.current = await faceDetection.createDetector(model, detectorConfig);

        await waitForVideoReady();
        startDetection();
      } catch (err) {
        console.error("Camera Position Check Error:", err);
      }
    };

    const startDetection = () => {
      const detect = async () => {
        const video = videoRef.current;
        if (!video || !detectorRef.current) {
          animationRef.current = requestAnimationFrame(detect);
          return;
        }

        try {
          const faces = await detectorRef.current.estimateFaces(video, {
            flipHorizontal: false,
          });
          console.log("Detected faces:", faces);

          if (!isMounted) return;

          if (!faces || faces.length === 0) {
            setStatus({
              isFaceDetected: false,
              isCentered: false,
              faceDirection: null,
              alignmentMessage: "No face detected",
            });
          } else {
            const { box, keypoints } = faces[0];
            const faceCenterX = box.xMin + box.width / 2;
            const faceCenterY = box.yMin + box.height / 2;
            const videoCenterX = video.videoWidth / 2;
            const videoCenterY = video.videoHeight / 2;

            const offsetX = faceCenterX - videoCenterX;
            const offsetY = faceCenterY - videoCenterY;
            const centerThresholdX = video.videoWidth * 0.15;
            const centerThresholdY = video.videoHeight * 0.15;

            const isCentered =
              Math.abs(offsetX) < centerThresholdX &&
              Math.abs(offsetY) < centerThresholdY;

            const leftEye = keypoints?.find((k) => k.name === "leftEye");
            const rightEye = keypoints?.find((k) => k.name === "rightEye");
            const nose = keypoints?.find((k) => k.name === "noseTip");

            let faceDirection = "straight";
            if (leftEye && rightEye && nose) {
              const eyeCenterX = (leftEye.x + rightEye.x) / 2;
              const noseOffset = nose.x - eyeCenterX;
              const directionThreshold = box.width * 0.08;

              if (noseOffset > directionThreshold) faceDirection = "right";
              else if (noseOffset < -directionThreshold) faceDirection = "left";
            }

            let alignmentMessage = "Perfect alignment";
            if (!isCentered) alignmentMessage = "Please center your face";
            else if (faceDirection !== "straight")
              alignmentMessage = `Please look straight (${faceDirection})`;

            setStatus({
              isFaceDetected: true,
              isCentered,
              faceDirection,
              alignmentMessage,
            });
          }
        } catch (err) {
          console.error("Detection error:", err);
        }

        animationRef.current = requestAnimationFrame(detect);
      };

      animationRef.current = requestAnimationFrame(detect);
    };

    initDetector();

    return () => {
      isMounted = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (detectorRef.current) detectorRef.current.dispose();
    };
  }, [videoRef]);

  return status;
};

export default useCameraPositionCheck;