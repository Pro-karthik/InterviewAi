import { getFullAnalyticsService } from "./analytics.service.js";

export const getUserAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const analytics = await getFullAnalyticsService(userId);

    res.status(200).json(analytics);
  } catch (err) {
    next(err);
  }
};