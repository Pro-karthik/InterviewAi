import { useEffect, useRef } from "react";
import { emitMetric } from "../monitoring/emitMetric";

const DEBOUNCE_TIME = 1000; // 1 second

const useTabSecurity = (sessionId, enabled = true) => {
  const lastViolationTimeRef = useRef(0);

  const emitDebounced = (event) => {
    if (!enabled || !sessionId) return;

    const now = Date.now();

    if (now - lastViolationTimeRef.current < DEBOUNCE_TIME) {
      return;
    }

    lastViolationTimeRef.current = now;

    emitMetric(sessionId, {
      ...event,
      timestamp: now
    });
  };

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        emitDebounced({
          source: "SYSTEM",
          type: "TAB_VISIBILITY",
          state: "HIDDEN"
        });
      }
    };

    const handleBlur = () => {
      emitDebounced({
        source: "SYSTEM",
        type: "WINDOW_FOCUS",
        state: "BLURRED"
      });
    };

    const handleFocus = () => {
      emitDebounced({
        source: "SYSTEM",
        type: "WINDOW_FOCUS",
        state: "FOCUSED"
      });
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        emitDebounced({
          source: "SYSTEM",
          type: "FULLSCREEN",
          state: "EXITED"
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [sessionId, enabled]);
};

export default useTabSecurity;