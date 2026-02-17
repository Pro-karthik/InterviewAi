import { reportViolationService } from "./proctoring.service.js";

export const reportViolation = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = 'dd51fbcd-c77b-4e70-afa0-e78f49fde748';
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
