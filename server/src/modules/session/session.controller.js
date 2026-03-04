import {
  startInterviewService,
  submitAnswersService,
  evaluateSessionService,
  getSessionService,
  getSessionHistoryService,
  getSessionHistoryByIdService
} from "./session.service.js";


// 1️⃣ Start Interview
export const startInterview = async (req, res, next) => {
  try {
     const userId = req.user.id;
  
    const { skill, experience } = req.body;

    const result = await startInterviewService(
      userId,
      skill,
      experience
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export async function beginInterview(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await sessionService.beginInterviewService(id, userId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


// 2️⃣ Submit Answers
export const submitAnswers = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;
    
    const { answers } = req.body;

    const result = await submitAnswersService(
      sessionId,
      userId,
      answers
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


// 3️⃣ Evaluate Session
export const evaluateSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
   

    const userId = req.user.id;
      

    const result = await evaluateSessionService(
      sessionId,
      userId
    );

    res.status(200).json(result);  
  } catch (err) {
    next(err);
  }
};


// 4️⃣ Get Session
export const getSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;
   

    const result = await getSessionService(
      sessionId,
      userId
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


// 5️⃣ Get Session History
export const getSessionHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getSessionHistoryService(userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  } 
};

export const getSessionHistoryById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;
    const result = await getSessionHistoryByIdService(userId, sessionId);
    res.status(200).json(result);
  }
  catch(err){
    next(err);
  }
}



import { validateSkillsWithAI } from "../../ai/ai.service.js";

export const validateInterviewController = async (req, res, next) => {
  try {
    const { skills, experience_level } = req.body;

    // 🧠 AI validation layer
    await validateSkillsWithAI(skills);

    // If everything passes
    res.status(200).json({
      success: true,
      message: "Skills validated successfully."
    });

  } catch (error) {
    next(error);
  }
};