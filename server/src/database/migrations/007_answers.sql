CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  session_id UUID NOT NULL
    REFERENCES interview_sessions(id)
    ON DELETE CASCADE,

  question_id UUID NOT NULL
    REFERENCES ai_questions(id)
    ON DELETE CASCADE,

  answer_text TEXT,

  technical_score INT,
  depth_score INT,
  clarity_score INT,
  problem_solving_score INT,
  communication_score INT,

  total_score INT,

  ai_feedback TEXT,
  raw_evaluation JSONB,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(session_id, question_id)
);
