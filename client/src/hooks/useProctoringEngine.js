import { useEffect, useState } from "react";

import useTabSecurity from "./useTabSecurity";
import useFaceMonitoring from "./useFaceMonitoring";
import useHeartbeat from "./useHeartbeat";

const useProctoringEngine = (videoRef, sessionId) => {
  const [state, setState] = useState("IDLE");
  const [error, setError] = useState(null);

  // Face monitoring (camera + model)
  const { isReady: faceReady, isLoading } = useFaceMonitoring(
    videoRef,
    sessionId,
    true
  );

  // Enable tab security only when monitoring is active
  useTabSecurity(sessionId, faceReady);

  // Heartbeat only when monitoring is active
  useHeartbeat(sessionId, faceReady);

  useEffect(() => {
    try {
      if (isLoading) {
        setState("INITIALIZING");
        return;
      }

      if (faceReady) {
        setState("MONITORING_ACTIVE");
      }
    } catch (err) {
      console.error("Proctoring engine failed", err);
      setError(err);
      setState("ERROR");
    }
  }, [faceReady, isLoading]);

  return {
    state,
    isReady: state === "MONITORING_ACTIVE",
    isLoading,
    error,
  };
};

export default useProctoringEngine;