import express from "express";
import * as sessionController from "./session.controller.js";

const router = express.Router();

// Start Interview
router.post("/interview/start", sessionController.startInterview);

// Submit Answers
router.post("/:id/submit", sessionController.submitAnswers);

// Evaluate Session
router.post("/:id/evaluate", sessionController.evaluateSession);

// Get Session
router.get("/:id", sessionController.getSession);


export default router; 
