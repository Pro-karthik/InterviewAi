import express from "express";
import * as sessionController from "./session.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validateCreateInterview } from "../../middlewares/validation.middleware.js";

const router = express.Router();

//validation for create interview
router.post(
  "/create",
 
  validateCreateInterview,
  sessionController.validateInterviewController
); 

// Start Interview
router.post("/interview/start", authenticate, sessionController.startInterview);

// Submit Answers
router.post("/:id/submit", authenticate, sessionController.submitAnswers);

// Evaluate Session
router.post("/:id/evaluate", authenticate, sessionController.evaluateSession);

// history
router.get("/history", authenticate, sessionController.getSessionHistory);

//history by id
router.get("/history/:id", authenticate, sessionController.getSessionHistoryById);

// Get Session
router.get("/:id", authenticate, sessionController.getSession);



export default router; 
