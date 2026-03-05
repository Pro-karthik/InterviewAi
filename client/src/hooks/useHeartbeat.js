import { useEffect } from "react";
import { heartbeat } from "../api/session.api";

const useHeartbeat = (sessionId) => {

  useEffect(() => {

    const interval = setInterval(async () => {
      try {
        await heartbeat(sessionId);
      } catch (err) {
        console.error("Heartbeat failed", err);
      }
    }, 10000);

    return () => clearInterval(interval);

  }, [sessionId]);

};

export default useHeartbeat;