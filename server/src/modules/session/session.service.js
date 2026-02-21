import pool from "../../config/db.js";
import { generateQuestions, evaluateSession } from "../../ai/ai.service.js";
import * as queries from "./session.queries.js";
import { MAX_TOTAL_SCORE } from "../../utils/securityConstants.js";


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

    await queries.createSessionSecurity(client, session.id);

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

    if (!["COMPLETED", "TERMINATED"].includes(session.status)) {
      throw new Error("Session not ready for evaluation");
    }

    // 🔒 Prevent double evaluation
    const existingAnalysis = await queries.getSessionAnalysisBySessionId(
      client,
      sessionId
    );

    if (existingAnalysis) {
      await client.query("ROLLBACK");
      return {
        message: "Session already evaluated"
      };
    }

    // 🔐 Fetch security data
    const security = await queries.getSessionSecurity(client, sessionId);

    const malpracticeFlag =
      security.total_score >= MAX_TOTAL_SCORE ||
      security.terminated === true;

    const malpracticeSummary = {
      totalScore: security.total_score,
      tabSwitches: security.tab_visibility_count,
      multiFaceMs: security.total_multi_face_ms,
      noFaceMs: security.total_no_face_ms,
      terminatedBySystem: security.terminated
    };
    // Calculate risk score
let riskScore =
  (security.total_score / MAX_TOTAL_SCORE) * 70 +
  (security.tab_visibility_count * 2) +
  (security.window_blur_count * 3);

riskScore = Math.min(100, Math.round(riskScore));

let riskLevel;
if (riskScore < 30) {
  riskLevel = "LOW";
} else if (riskScore < 70) {
  riskLevel = "MEDIUM";
} else {
  riskLevel = "HIGH";
}

await queries.updateSessionRisk(client, sessionId, riskScore, riskLevel);
    // 🔴 CASE 1 — TERMINATED (Skip AI)
    if (session.status === "TERMINATED") {

      await queries.insertSessionAnalysis(client, sessionId, {
        overall_score: null,
        technical_avg: null,
        depth_avg: null,
        clarity_avg: null,
        problem_solving_avg: null,
        communication_avg: null,
        strengths: null,
        weaknesses: null,
        improvement_plan: null,
        malpractice_flag: true,
        malpractice_summary: malpracticeSummary
      });

      await client.query("COMMIT");

      return {
        message: "Session terminated due to malpractice",
        malpracticeFlag: true
      };
    }

    // 🟢 CASE 2 — COMPLETED (Run AI)

    const qaData = await queries.getFullSessionData(client, sessionId);

    if (!qaData || qaData.length !== 10) {
      throw new Error("Incomplete answers");
    }

    const evaluation = await evaluateSession({
      skill: session.skill,
      experience: session.experience_level,
      questions_and_answers: qaData
    });

    const averages = calculateAverages(evaluation.answers);

    for (const ans of evaluation.answers) {
      await queries.updateAnswerScores(client, ans);
    }

    await queries.insertSessionAnalysis(client, sessionId, {
      ...evaluation,
      ...averages,
      malpractice_flag: malpracticeFlag,
      malpractice_summary: malpracticeSummary
    });

    await queries.updateSessionOverallScore(
      client,
      sessionId,
      evaluation.overall_score
    );

    await queries.updateSessionStatus(
      client,
      sessionId,
      "EVALUATED"
    );

    await client.query("COMMIT");

    return {
      evaluation,
      malpracticeFlag,
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
