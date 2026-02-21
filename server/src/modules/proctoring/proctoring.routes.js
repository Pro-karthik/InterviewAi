import express from 'express';
import { reportViolation, sendHeartbeat } from "./proctoring.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/session/:id/violation',authenticate,reportViolation)
router.post('/session/:id/heartbeat',authenticate,sendHeartbeat)


export default router;