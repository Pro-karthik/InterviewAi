import pool from "../../config/db.js";
import { generateQuestions, evaluateSession } from "../../ai/ai.service.js";
import * as queries from "./session.queries.js";


export async function startInterviewService(userId, skill, experience) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Create session (CREATED)
    const session = await queries.createSession(
      client,
      userId,
      skill,
      experience
    );

    // AI Call (ONLY ONCE)
    const aiResponse = await generateQuestions(skill, experience);

    if (!aiResponse || aiResponse.questions.length !== 10) {
      throw new Error("AI did not return exactly 10 questions");
    }

    // Insert questions
    for (let i = 0; i < aiResponse.questions.length; i++) {
      const q = aiResponse.questions[i];

      await queries.insertQuestion(
        client,
        session.id,
        q.question_text,
        q.difficulty,
        q.category,
        i + 1
      );
    }

    // Update status → IN_PROGRESS
    await queries.updateSessionStatus(
      client,
      session.id,
      "IN_PROGRESS"
    );

    await client.query("COMMIT");

    return {
      session_id: session.id,
      aiResponse,
      message: "Interview started successfully"
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function submitAnswersService(sessionId, userId, answers) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session = await queries.getSessionById(client, sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    if (session.status !== "IN_PROGRESS") {
      throw new Error("Session is not in progress");
    }

    if (!answers || answers.length !== 10) {
      throw new Error("All 10 questions must be answered");
    }

    for (const ans of answers) {
      await queries.insertAnswer(
        client,
        sessionId,
        ans.question_id,
        ans.answer_text
      );
    }

    await queries.updateSessionStatus(
      client,
      sessionId,
      "COMPLETED"
    );

    await client.query("COMMIT");

    return { message: "Answers submitted successfully" };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}


export async function evaluateSessionService(sessionId, userId) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const session = await queries.getSessionById(client, sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    if (session.status !== "COMPLETED") {
      throw new Error("Session not ready for evaluation");
    }

    const qaData = await queries.getFullSessionData(client, sessionId);

    if (!qaData || qaData.length !== 10) {
      throw new Error("Incomplete answers");
    }

    // ONE AI CALL
    const evaluation = await evaluateSession({
      skill: session.skill,
      experience: session.experience_level,
      questions_and_answers: qaData
    });

    // Calculate averages
    const averages = calculateAverages(evaluation.answers);

    // Update per-question scores
    for (const ans of evaluation.answers) {
      await queries.updateAnswerScores(client, ans);
    }

    // Insert session analysis (merged data)
    await queries.insertSessionAnalysis(
      client,
      sessionId,
      {
        ...evaluation,
        ...averages
      }
    );

    await queries.updateSessionOverallScore(
      client,
      sessionId,
      evaluation.overall_score
    );


    // Update status → EVALUATED
    await queries.updateSessionStatus(
      client,
      sessionId,
      "EVALUATED"
    );

    await client.query("COMMIT");

    return {
      evaluation,
      message: "Session evaluated successfully"
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}



export async function getSessionService(sessionId, userId) {
  const client = await pool.connect();

  try {
    const session = await queries.getSessionById(client, sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.user_id !== userId) {
      throw new Error("Unauthorized");
    }

    const qaData = await queries.getFullSessionData(client, sessionId);

    return {
      session,
      qaData
    };

  } finally {
    client.release();
  }
}


function calculateAverages(answers) {
  const total = answers.length;

  let technical = 0;
  let depth = 0;
  let clarity = 0;
  let problemSolving = 0;
  let communication = 0;

  for (const ans of answers) {
    technical += ans.technical_score;
    depth += ans.depth_score;
    clarity += ans.clarity_score;
    problemSolving += ans.problem_solving_score;
    communication += ans.communication_score;
  }

  return {
    technical_avg: Math.round(technical / total),
    depth_avg: Math.round(depth / total),
    clarity_avg: Math.round(clarity / total),
    problem_solving_avg: Math.round(problemSolving / total),
    communication_avg: Math.round(communication / total)
  };
}
