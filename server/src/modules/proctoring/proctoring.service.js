import  pool  from "../../config/db.js";
import {
  getSessionQuery,
  updateSecurityQuery,
  terminateSessionQuery,
  markSecurityTerminatedQuery
} from "./proctoring.queries.js";

import {
  VIOLATION_WEIGHTS,
  MAX_TOTAL_SCORE
} from "../../utils/securityConstants.js";

import { ApiError } from "../../utils/ApiError.js";

export const reportViolationService = async (
  sessionId,
  userId,
  type,
  durationMs = 0
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Validate session ownership
    const sessionRes = await client.query(getSessionQuery, [
      sessionId,
      userId
    ]);

    if (sessionRes.rowCount === 0) {
      throw new ApiError(404, "Session not found.");
    }

    if (sessionRes.rows[0].status !== "IN_PROGRESS") {
      throw new ApiError(400, "Session is not active.");
    }

    // 2️⃣ Validate violation type
    if (!VIOLATION_WEIGHTS[type]) {
      throw new ApiError(400, "Invalid violation type.");
    }

    // 3️⃣ Calculate score increment
    let increment;

    if (durationMs && durationMs > 0) {
      increment = durationMs * VIOLATION_WEIGHTS[type];
    } else {
      increment = VIOLATION_WEIGHTS[type];
    }

    // 4️⃣ Update security score
    const securityRes = await client.query(updateSecurityQuery, [
      increment,
      sessionId
    ]);

    const newScore = parseFloat(securityRes.rows[0].total_score);

    let terminated = false;

    // 5️⃣ Threshold check
    if (newScore >= MAX_TOTAL_SCORE) {
      terminated = true;

      await client.query(terminateSessionQuery, [
        "Exceeded violation threshold",
        sessionId
      ]);

      await client.query(markSecurityTerminatedQuery, [sessionId]);
    }

    await client.query("COMMIT");

    return {
      currentScore: newScore,
      status: terminated ? "TERMINATED" : "IN_PROGRESS"
    };

  } catch (err) {
    console.error("Error in reportViolationService:", err);
    await client.query("ROLLBACK");

    // If already ApiError → throw directly
    if (err instanceof ApiError) {
      throw err;
    }

    // Otherwise unexpected error
    throw new ApiError(500, "Internal server error.");
  } finally {
    client.release();
  }
};
