CREATE TABLE session_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  session_id UUID NOT NULL UNIQUE
    REFERENCES interview_sessions(id)
    ON DELETE CASCADE,

  overall_score INT,

  technical_avg INT,
  depth_avg INT,
  clarity_avg INT,
  problem_solving_avg INT,
  communication_avg INT,

  strengths TEXT,
  weaknesses TEXT,
  improvement_plan TEXT,

  malpractice_flag BOOLEAN DEFAULT FALSE,
  malpractice_summary JSONB,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
