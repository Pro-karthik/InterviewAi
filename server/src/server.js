import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";
import { startHeartbeatWorker } from "./workers/heartbeat.worker.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");    
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB", error);
    process.exit(1);

  }
};

startServer();
startHeartbeatWorker();
