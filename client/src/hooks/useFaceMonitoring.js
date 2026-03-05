import { useEffect, useRef, useState } from "react";

import * as tf from "@tensorflow/tfjs-core";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";

import { analyzeFace } from "../monitoring/faceAnalyzer";
import { evaluateRules } from "../monitoring/ruleEngine";
import { createBehaviorTracker } from "../monitoring/behaviorTracker";
import { THRESHOLDS } from "../monitoring/thresholds";
import { emitMetric } from "../monitoring/emitMetric";

const useFaceMonitoring = (videoRef, sessionId, enabled = true) => {
  const detectorRef = useRef(null);
  const animationRef = useRef(null);
  const initializedRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Helper: enrich with timestamp
  const emitWithContext = (event) => {
    const now = Date.now();
    if (!sessionId) return;

    emitMetric(sessionId, {
      ...event,
      timestamp: now,
    });
  };

  // 🔹 Behavior trackers
  const noFaceTracker = useRef(
    createBehaviorTracker({
      thresholdDuration: 5000,
      cooldownDuration: 4000,
      gracePeriod: 500,
    }),
  ).current;


  const multiFaceTracker = useRef(
    createBehaviorTracker({
      thresholdDuration: 3000,
      cooldownDuration: 5000,
      gracePeriod: 500,
    }),
  ).current;

  const yawTracker = useRef(
    createBehaviorTracker({
      thresholdDuration: THRESHOLDS.HEAD_TURN_DURATION,
    }),
  ).current;

  const pitchTracker = useRef(
    createBehaviorTracker({
      thresholdDuration: THRESHOLDS.LOOK_DOWN_DURATION,
    }),
  ).current;

  useEffect(() => {
    if (!enabled) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    let stream;
    let detecting = false; // concurrency guard
    const waitForVideo = () =>
      new Promise((resolve) => {
        const check = () => {
          if (videoRef.current) {
            resolve(videoRef.current);
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    const init = async () => {
      try {
        setIsLoading(true);

        await tf.setBackend("webgl");
        await tf.ready();

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });

        const video = await waitForVideo();
        console.log(videoRef);
        if (!video) return;

        video.srcObject = stream;

        await new Promise((resolve) => {
          video.onloadedmetadata = () => resolve();
        });

        await video.play();

        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: "tfjs",
          refineLandmarks: true,
          maxFaces: 2,
        };

        detectorRef.current = await faceLandmarksDetection.createDetector(
          model,
          detectorConfig,
        );

        console.log("FaceMesh Loaded");

        setIsReady(true);
        setIsLoading(false);

        startDetection();
      } catch (error) {
        console.error("Initialization Error:", error);
        setIsLoading(false);
        initializedRef.current = false; // allow retry
      }
    };

    const startDetection = () => {
      let lastDetectionTime = 0;
      const DETECTION_INTERVAL = 300;

      const detect = async (time) => {
        const video = videoRef.current;

        if (
          video &&
          detectorRef.current &&
          !video.paused &&
          !video.ended &&
          video.videoWidth > 0 &&
          video.videoHeight > 0
        ) {
          if (time - lastDetectionTime > DETECTION_INTERVAL && !detecting) {
            detecting = true;
            lastDetectionTime = time;
            if (video.videoWidth && video.width !== video.videoWidth) {
              video.width = video.videoWidth;
              video.height = video.videoHeight;
            }

            try {
              const faces = await detectorRef.current.estimateFaces(video, {
                flipHorizontal: false,
              });

              // 1️⃣ No Face
              const noFaceViolation = noFaceTracker(faces.length === 0);
              if (noFaceViolation.triggered) {
                emitWithContext({
                  source: "FACE",
                  type: "NO_FACE",
                });
              }

              // 2️⃣ Multiple Faces
              const validFaces = faces.filter(
                (face) =>
                  (face.box?.width ?? face.boundingBox?.width ?? 0) > 100 &&
                  (face.box?.height ?? face.boundingBox?.height ?? 0) > 100,
              );

              const isMultipleFaces = validFaces.length > 1;
              const multiFaceViolation = multiFaceTracker(isMultipleFaces);

              if (multiFaceViolation.triggered) {
                emitWithContext({
                  source: "FACE",
                  type: "MULTIPLE_FACES",
                  duration: multiFaceViolation.duration,
                });
              }

              // 3️⃣ Face analysis
              if (faces.length > 0) {
                const analysis = analyzeFace(faces[0]);
                const rules = evaluateRules(analysis);

                const yawResult = yawTracker(rules.includes("HEAD_YAW"));
                if (yawResult.triggered) {
                  emitWithContext({
                    source: "FACE",
                    type: "HEAD_YAW",
                    duration: yawResult.duration,
                  });
                }

                const pitchResult = pitchTracker(rules.includes("HEAD_PITCH"));
                if (pitchResult.triggered) {
                  emitWithContext({
                    source: "FACE",
                    type: "HEAD_PITCH",
                    duration: pitchResult.duration,
                  });
                }
              }
            } catch (err) {
              console.error("Detection Error:", err);
            } finally {
              detecting = false;
            }
          }
        }

        animationRef.current = requestAnimationFrame(detect);
      };

      animationRef.current = requestAnimationFrame(detect);
    };

    init();

    return () => {
      console.log("Cleaning up...");

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (detectorRef.current) {
        detectorRef.current.dispose();
      }

      initializedRef.current = false;
    };
  }, [enabled, videoRef, sessionId]);

  return {
    isReady,
    isLoading,
  };
};

export default useFaceMonitoring;
