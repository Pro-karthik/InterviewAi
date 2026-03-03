import { useEffect, useRef } from "react";
import { emitMetric } from "../monitoring/emitMetric";

const useTabSecurity = () => {
  const lastViolationTimeRef = useRef(0);
  const DEBOUNCE_TIME = 1000; // 1 second

  const emitDebounced = (event) => {
    const now = Date.now();

    if (now - lastViolationTimeRef.current < DEBOUNCE_TIME) {
      return; // Ignore rapid duplicate events
    }

    lastViolationTimeRef.current = now;

    emitMetric({
      ...event,
      timestamp: now
    });
  };

  useEffect(() => {

    const handleVisibilityChange = () => {
      if (document.hidden) {
        emitDebounced({
          source: "SYSTEM",
          type: "TAB_VISIBILITY",
          state: "HIDDEN",
        });
      }
    };

    const handleBlur = () => {
      emitDebounced({
        source: "SYSTEM",
        type: "WINDOW_FOCUS",
        state: "BLURRED",
      });
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        emitDebounced({
          source: "SYSTEM",
          type: "FULLSCREEN",
          state: "EXITED",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };

  }, []);

};

export default useTabSecurity;
