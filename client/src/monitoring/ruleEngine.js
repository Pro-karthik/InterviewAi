import { THRESHOLDS } from "./thresholds";

export function evaluateRules(analysis) {
  const rules = [];

  if (!analysis) return rules;

  if (Math.abs(analysis.yaw) > THRESHOLDS.YAW_LIMIT) {
    rules.push("HEAD_YAW");
  }

  if (Math.abs(analysis.pitch) > THRESHOLDS.PITCH_LIMIT) {
    rules.push("HEAD_PITCH");
  }

  if (Math.abs(analysis.roll) > THRESHOLDS.ROLL_LIMIT) {
    rules.push("HEAD_ROLL");
  }

  return rules;
}
