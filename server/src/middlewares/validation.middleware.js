
export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map(d => d.message),
      });
    }

    req.body = value; 
    next();   
  };
};



import {ApiError} from "../utils/ApiError.js";

export const validateCreateInterview = (req, res, next) => {
  const { skills, experience_level } = req.body;

  if (!Array.isArray(skills) || skills.length === 0) {
    return next(new ApiError(400, "Skills must be a non-empty array."));
  }

  if (skills.length > 5) {
    return next(new ApiError(400, "Maximum 5 skills allowed."));
  }

  for (const skill of skills) {
    if (
      typeof skill !== "string" ||
      skill.length < 2 ||
      skill.length > 30 ||
      /[^a-zA-Z0-9\s.+#]/.test(skill)
    ) {
      return next(new ApiError(400, `Invalid skill detected: ${skill}`));
    }
  }

  const allowedLevels = ["Fresher", "Junior", "Mid-Level", "Senior"];

  if (!allowedLevels.includes(experience_level)) {
    return next(new ApiError(400, "Invalid experience level."));
  }
    
  next();
};