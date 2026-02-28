import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookie from "cookie-parser";

import proctoringRoutes from "./modules/proctoring/proctoring.routes.js";
import userRoutes from './modules/Users/users.routes.js';
import sessionRouter from "./modules/session/session.routes.js"
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

const app = express();


app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(errorMiddleware);



app.use(cookie());



/* ---------- Routes ---------- */
app.use('/api/users',userRoutes);
app.use("/api/session",sessionRouter) ;
app.use("/api/proctoring", proctoringRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ---------- Base Route ---------- */
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer API is running");
});


/* ---------- Export App ---------- */
export default app;
