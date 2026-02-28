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

export const loginRatelimiter=ratelimit({
    windowMs:15*60*1000,
    max:5,
    message:{success:false,message:'Too many login attempts, please try again later'}
});