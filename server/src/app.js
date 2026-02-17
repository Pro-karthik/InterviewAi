import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import proctoringRoutes from "./modules/proctoring/proctoring.routes.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(errorMiddleware);


app.use("/api/proctoring", proctoringRoutes);




export default app;
