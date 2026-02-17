import { reportViolationService } from "./proctoring.service.js";

export const reportViolation = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;
    const { type, durationMs } = req.body;
    
    const result = await reportViolationService(
      sessionId,
      userId,
      type,
      durationMs
    ); 

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
