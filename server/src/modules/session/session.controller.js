import {
  startInterviewService,
  submitAnswersService,
  evaluateSessionService,
  getSessionService
} from "./session.service.js";


// 1️⃣ Start Interview
export const startInterview = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const userId = 'dd51fbcd-c77b-4e70-afa0-e78f49fde748'
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


// 2️⃣ Submit Answers
export const submitAnswers = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    // const userId = req.user.id;
    const userId = 'dd51fbcd-c77b-4e70-afa0-e78f49fde748'

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
    const userId = 'dd51fbcd-c77b-4e70-afa0-e78f49fde748'

    // const userId = req.user.id;

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
    // const userId = req.user.id;
    const userId = 'dd51fbcd-c77b-4e70-afa0-e78f49fde748'
    

    const result = await getSessionService(
      sessionId,
      userId
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
