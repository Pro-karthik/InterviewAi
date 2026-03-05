import { sentViolation } from "../api/proctoring.api";

export const emitMetric = async (sessionId, metric) => {
  try {
    console.log(metric)
    await sentViolation(sessionId, metric);
  } catch (err) {
    console.error("Metric send failed:", err);
  }
};