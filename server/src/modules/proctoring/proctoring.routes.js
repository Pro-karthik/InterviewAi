import express from 'express';
import { reportViolation } from "./proctoring.controller.js";

const router = express.Router();

router.post('/session/:id/violation',reportViolation)

export default router;