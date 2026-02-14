CREATE TABLE ai_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL
    REFERENCES interview_sessions(id)
    ON DELETE CASCADE,

  question_text TEXT NOT NULL,
  difficulty VARCHAR(20),
  category VARCHAR(100),
  question_order INT NOT NULL,

  ai_metadata JSONB,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(session_id, question_order)
);
