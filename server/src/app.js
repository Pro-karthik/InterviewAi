import express from "express";
import cors from "cors";
import userRoutes from './modules/Users/users.routes.js';
import cookie from "cookie-parser";

import sessionRouter from "./modules/session/session.routes.js"
const app = express();

/* ---------- Middlewares ---------- */
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use("/api/session",sessionRouter) ;


/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "ai-mock-interviewer-api" });
});

/* ---------- Routes ---------- */
app.use('/api/users',userRoutes);

/* ---------- Base Route ---------- */
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer API is running");
});


/* ---------- Export App ---------- */
export default app;
