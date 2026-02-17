

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
    overall_score,
    technical_avg,
    depth_avg,
    clarity_avg,
    problem_solving_avg,
    communication_avg,
    strengths,
    weaknesses,
    improvement_plan
  } = data;

  await client.query(
    `
    INSERT INTO session_analysis
    (
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
      created_at,
      updated_at
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW());
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
      improvement_plan
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
