import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookie from "cookie-parser";

import proctoringRoutes from "./modules/proctoring/proctoring.routes.js";
import userRoutes from './modules/Users/users.routes.js';
import sessionRouter from "./modules/session/session.routes.js"

const app = express();


app.use(cors());
app.use(express.json());
app.use(errorMiddleware);


app.use("/api/proctoring", proctoringRoutes);
app.use(cookie());
app.use("/api/session",sessionRouter) ;




/* ---------- Routes ---------- */
app.use('/api/users',userRoutes);

/* ---------- Base Route ---------- */
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer API is running");
});


/* ---------- Export App ---------- */
export default app;
