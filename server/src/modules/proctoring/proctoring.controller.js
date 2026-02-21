import { reportViolationService ,heartbeatService} from "./proctoring.service.js";

export const reportViolation = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;
   console.log(sessionId)
    const {
      source,
      type,
      state,
      duration,
      timestamp
    } = req.body;

    if (!type || !source || !timestamp) {
      return res.status(400).json({
        message: "Invalid event payload"
      });
    }

    const result = await reportViolationService({
      sessionId,
      userId,
      source,
      type,
      state,
      durationMs: duration || 0,
      timestamp
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


export const sendHeartbeat = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    const result = await heartbeatService(sessionId, userId);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
