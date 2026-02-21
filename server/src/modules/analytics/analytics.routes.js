import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getUserAnalytics } from "./analytics.controller.js";

const router = express.Router();

router.get("/report", authenticate, getUserAnalytics);

export default router;  