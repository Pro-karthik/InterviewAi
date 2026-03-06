import { sentViolation } from "../api/proctoring.api";

export const emitMetric = async (sessionId, metric) => {
  try {

    const res = await sentViolation(sessionId, metric);

    const data = res.data;

    if (data.status === "TERMINATED") {

      window.dispatchEvent(
        new CustomEvent("INTERVIEW_TERMINATED")
      );

    }

  } catch (err) {
    console.error("Metric send failed:", err);
  }
};