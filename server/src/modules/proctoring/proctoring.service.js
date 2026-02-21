import  pool  from "../../config/db.js";

import {
  VIOLATION_CONFIG,
  MAX_TOTAL_SCORE
} from "../../utils/securityConstants.js";

import { evaluateSessionService } from "../session/session.service.js";

import {
  getSessionQuery,
  updateSecurityDynamicQuery,
  terminateSessionQuery,
  markSecurityTerminatedQuery,
  updateHeartbeatQuery
} from "./proctoring.queries.js";

import { ApiError } from "../../utils/apiError.js";

export const reportViolationService = async ({ 
   sessionId,
  userId,
  type,
  durationMs = 0,
  state = null
}) => {

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Lock session

    const sessionRes = await client.query(getSessionQuery, [
      sessionId,
      userId
    ]);
   
    if (sessionRes.rowCount === 0) {
      throw new ApiError(404, "Session not found.");
    }
    console.log(sessionRes.rows[0])
    // if (sessionRes.rows[0].status !== "IN_PROGRESS") {
    //   throw new ApiError(400, "Session not active.");
    // }
    // if (sessionRes.rows[0].status === "TERMINATED") {
    //   throw new ApiError(400, "Session already terminated.");
    // }

    if (type === "HEARTBEAT") {
  throw new ApiError(400, "Invalid violation type.");
}


    const config = VIOLATION_CONFIG[type];

    if (!config) {
      throw new ApiError(400, "Invalid violation type.");
    }

    // 3️⃣ State validation (for system events)
    if (config.validState && config.validState !== state) {
      await client.query("ROLLBACK");
      return { status: "IGNORED" };
    }

    // 4️⃣ Calculate increment
    const baseValue = config.isDuration ? durationMs : 1;
   
    const scoreIncrement = config.isDuration
      ? durationMs * config.weight
      : config.weight;
    const updateQuery = updateSecurityDynamicQuery(config.column,[baseValue, scoreIncrement, sessionId]);

    const securityRes = await client.query(updateQuery, [
      baseValue,
      scoreIncrement,
      sessionId
    ]);

    console.log(securityRes)

    const newScore = parseFloat(securityRes.rows[0].total_score);
    console.log(`New total score for session ${sessionId}: ${newScore}`);
    let terminated = false;

    // 5️⃣ Threshold Check
    if (newScore >= MAX_TOTAL_SCORE) {

      terminated = true;

      await client.query(terminateSessionQuery, [
        "Exceeded violation threshold",
        sessionId
      ]);

      await client.query(markSecurityTerminatedQuery, [
        sessionId
      ]);
    }

    await client.query("COMMIT");

   if (terminated) {
  await evaluateSessionService(sessionId, userId);
}

    return {
      currentScore: newScore,
      status: terminated ? "TERMINATED" : "IN_PROGRESS"
    };

  } catch (err) {

    await client.query("ROLLBACK");

    if (err instanceof ApiError) throw err;
    console.error("Error in reportViolationService:", err);
    throw new ApiError(500, "Internal server error.");
  } finally {
    client.release();
  }
};

export const heartbeatService = async (sessionId, userId) => {
  const client = await pool.connect();

  try {

    const sessionRes = await client.query(getSessionQuery, [
      sessionId,
      userId
    ]);

    if (sessionRes.rowCount === 0) {
      throw new ApiError(404, "Session not found.");
    }
     if (sessionRes.rows[0].status === "TERMINATED") {
      throw new ApiError(400, "Session already terminated.");
    }
    if (sessionRes.rows[0].status !== "IN_PROGRESS") {
      throw new ApiError(400, "Session not active.");
    }

    await client.query(updateHeartbeatQuery, [sessionId]);

    return { status: "ALIVE" };

  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(500, "Internal server error.");
  } finally {
    client.release();
  }
};
