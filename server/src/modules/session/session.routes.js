import express from "express";
import * as sessionController from "./session.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Start Interview
router.post("/interview/start", authenticate, sessionController.startInterview);

// Submit Answers
router.post("/:id/submit",authenticate, sessionController.submitAnswers);

// Evaluate Session
router.post("/:id/evaluate",authenticate, sessionController.evaluateSession);

// Get Session
router.get("/:id", authenticate, sessionController.getSession);


export default router; 
