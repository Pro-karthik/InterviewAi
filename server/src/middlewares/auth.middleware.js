import { verifyToken } from "../utils/token.js";
import ratelimit from 'express-rate-limit';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);
    
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

export const loginRateLimiter = ratelimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    return req.body.email 
  },
  message: {
    success: false,
    message: "Too many login attempts for this account. Please try again later.",
  },
});