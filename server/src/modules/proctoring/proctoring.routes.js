import express from 'express';
import { reportViolation } from "./proctoring.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/session/:id/violation',authenticate,reportViolation)

export default router;