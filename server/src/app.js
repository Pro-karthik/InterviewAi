import express from "express";
import cors from "cors";

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "ai-mock-interviewer-api" });
});

/* ---------- Base Route ---------- */
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer API is running");
});

/* ---------- Export App ---------- */
export default app;
