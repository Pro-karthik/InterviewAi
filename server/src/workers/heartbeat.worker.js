import cron from "node-cron";
import pool from "../config/db.js";

const HEARTBEAT_TIMEOUT_SECONDS = 30;

export const startHeartbeatWorker = () => {

  // Runs every 10 seconds
  cron.schedule("*/10 * * * * *", async () => {
    try {

      const result = await pool.query(`
        UPDATE interview_sessions
        SET status = 'TERMINATED',
            terminated_at = NOW(),
            termination_reason = 'Heartbeat lost',
            terminated_by_system = TRUE
        WHERE id IN (
          SELECT session_id
          FROM session_security
          WHERE terminated = false
          AND last_heartbeat_at IS NOT NULL
          AND last_heartbeat_at < NOW() - INTERVAL '${HEARTBEAT_TIMEOUT_SECONDS} seconds'
        )
        AND status = 'IN_PROGRESS'
        RETURNING id;
      `);

      if (result.rowCount > 0) {

        const terminatedIds = result.rows.map(r => r.id);

        console.log("⚠ Terminated sessions:", terminatedIds);

        // Mark session_security as terminated
        await pool.query(`
          UPDATE session_security
          SET terminated = true
          WHERE session_id = ANY($1::uuid[])
        `, [terminatedIds]);

      }

    } catch (err) {
      console.error("Heartbeat worker error:", err);
    }

  });

};
