

export async function createSession(client, userId, skill, experience) {
  const result = await client.query(
    `
    INSERT INTO interview_sessions
    (user_id, skill, experience_level, status)
    VALUES ($1, $2, $3, 'CREATED')
    RETURNING *;
    `,
    [userId, skill, experience]
  );

  return result.rows[0];
}

export async function updateSessionStatus(client, sessionId, status) {
  await client.query(
    `
    UPDATE interview_sessions
    SET status = $1
    WHERE id = $2;
    `,
    [status, sessionId]
  );
}


export async function getSessionById(client, sessionId) {
  const result = await client.query(
    `
    SELECT * FROM interview_sessions
    WHERE id = $1;
    `,
    [sessionId]
  );

  return result.rows[0];
}


export async function insertQuestion(
  client,
  sessionId,
  questionText,
  difficulty,
  category,
  order
) {
  await client.query(
    `
    INSERT INTO ai_questions
    (session_id, question_text, difficulty, category, question_order)
    VALUES ($1, $2, $3, $4, $5);
    `,
    [sessionId, questionText, difficulty, category, order]
  );
}


export async function insertAnswer(
  client,
  sessionId,
  questionId,
  answerText
) {
  await client.query(
    `
    INSERT INTO answers
    (session_id, question_id, answer_text)
    VALUES ($1, $2, $3);
    `,
    [sessionId, questionId, answerText]
  );
}


export async function getFullSessionData(client, sessionId) {
  const result = await client.query(
    `
    SELECT 
      q.id AS question_id,
      q.question_text,
      a.answer_text
    FROM ai_questions q
    LEFT JOIN answers a
      ON q.id = a.question_id
    WHERE q.session_id = $1
    ORDER BY q.question_order ASC;
    `,
    [sessionId]
  );

  return result.rows;
}


export async function insertSessionAnalysis(
  client,
  sessionId,
  data
) {
  const {
    overall_score = null,
    technical_avg = null,
    depth_avg = null,
    clarity_avg = null,
    problem_solving_avg = null,
    communication_avg = null,
    strengths = null,
    weaknesses = null,
    improvement_plan = null,
    malpractice_flag = false,
    malpractice_summary = null
  } = data;

  await client.query(
    `
    INSERT INTO session_analysis
    (
      id,
      session_id,
      overall_score,
      technical_avg,
      depth_avg,
      clarity_avg,
      problem_solving_avg,
      communication_avg,
      strengths,
      weaknesses,
      improvement_plan,
      malpractice_flag,
      malpractice_summary,
      created_at,
      updated_at
    )
    VALUES
    (
      gen_random_uuid(),
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,
      NOW(),
      NOW()
    )
    ON CONFLICT (session_id)
    DO UPDATE SET
      overall_score = EXCLUDED.overall_score,
      technical_avg = EXCLUDED.technical_avg,
      depth_avg = EXCLUDED.depth_avg,
      clarity_avg = EXCLUDED.clarity_avg,
      problem_solving_avg = EXCLUDED.problem_solving_avg,
      communication_avg = EXCLUDED.communication_avg,
      strengths = EXCLUDED.strengths,
      weaknesses = EXCLUDED.weaknesses,
      improvement_plan = EXCLUDED.improvement_plan,
      malpractice_flag = EXCLUDED.malpractice_flag,
      malpractice_summary = EXCLUDED.malpractice_summary,
      updated_at = NOW();
    `,
    [
      sessionId,
      overall_score,
      technical_avg,
      depth_avg,
      clarity_avg,
      problem_solving_avg,
      communication_avg,
      strengths,
      weaknesses,
      improvement_plan,
      malpractice_flag,
      malpractice_summary
    ]
  );
}

export async function updateAnswerScores(
  client,
  answer
) {
  await client.query(
    `
    UPDATE answers
    SET
      technical_score = $1,
      depth_score = $2,
      clarity_score = $3,
      problem_solving_score = $4,
      communication_score = $5,
      total_score = $6,
      ai_feedback = $7,
      raw_evaluation = $8
    WHERE question_id = $9;
    `,
    [
      answer.technical_score,
      answer.depth_score,
      answer.clarity_score,
      answer.problem_solving_score,
      answer.communication_score,
      answer.total_score,
      answer.feedback,
      answer,
      answer.question_id
    ]
  );
}


export async function updateSessionOverallScore(
  client,
  sessionId,
  overallScore
) {
  await client.query(
    `
    UPDATE interview_sessions
    SET overall_score = $1
    WHERE id = $2;
    `,
    [overallScore, sessionId]
  );
}

export const createSessionSecurity = async (client, sessionId) => {
  await client.query(
    `
    INSERT INTO session_security (
      session_id,
      total_score,
      violation_count,
      total_no_face_ms,
      total_multi_face_ms,
      total_head_yaw_ms,
      total_head_pitch_ms,
      tab_visibility_count,
      window_blur_count,
      fullscreen_exit_count,
      terminated,
      created_at,
      updated_at
    )
    VALUES (
      $1,
      0,0,0,0,0,0,0,0,0,
      false,
      NOW(),
      NOW()
    )
    `,
    [sessionId]
  );
};


export const getSessionAnalysisBySessionId = async (client, sessionId) => {
  const result = await client.query(
    `SELECT id FROM session_analysis WHERE session_id = $1`,
    [sessionId]
  );

  return result.rows[0] || null;
};

export const getSessionSecurity = async (client, sessionId) => {
  const result = await client.query(
    `SELECT * FROM session_security WHERE session_id = $1`,
    [sessionId]
  );

  return result.rows[0];
};

export const updateSessionRisk = async (
  client,
  sessionId,
  riskScore,
  riskLevel
) => {
  await client.query(
    `
    UPDATE interview_sessions
    SET risk_score = $1,
        risk_level = $2,
        updated_at = NOW()
    WHERE id = $3
    `,
    [riskScore, riskLevel, sessionId]
  );
};

export const getSessionHistory = async (client, userId) => {
  const result = await client.query(
    `
    SELECT
      i.id AS session_id,
      i.skill,
      i.experience_level,
      i.status,
      i.created_at,

      COALESCE(sa.overall_score, i.overall_score) AS overall_score,
      i.risk_level,
      COALESCE(sa.malpractice_flag, false) AS malpractice_flag

    FROM interview_sessions i
    LEFT JOIN session_analysis sa
      ON i.id = sa.session_id

    WHERE i.user_id = $1
    ORDER BY i.created_at DESC
    `,
    [userId]
  );

  return result.rows.map(row => ({
    sessionId: row.session_id,
    skill: row.skill,
    experienceLevel: row.experience_level,
    status: row.status,
    createdAt: row.created_at,
    overallScore: row.overall_score,
    riskLevel: row.risk_level,
    malpractice: row.malpractice_flag
  }));
};

export const getSessionHistoryById = async (client, userId, sessionId) => {
  const result = await client.query(
    `
    SELECT
      i.id AS session_id,
      i.skill,              
      i.experience_level,
      i.status,
      i.created_at,
      i.terminated_at,
      i.termination_reason,
      i.terminated_by_system,
      i.overall_score AS session_overall_score,
      i.risk_score,
      i.risk_level,
      sa.malpractice_flag,
      sa.malpractice_summary,
      sa.overall_score AS analysis_overall_score,
      sa.technical_avg,
      sa.depth_avg,
      sa.clarity_avg,
      sa.problem_solving_avg,
      sa.communication_avg
    FROM interview_sessions i
    LEFT JOIN session_analysis sa
      ON i.id = sa.session_id
    WHERE i.user_id = $1 AND i.id = $2
    `,
    [userId, sessionId]
  );
  
  return result.rows[0] || null;
};