CREATE TABLE interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

  skill TEXT NOT NULL,
  experience_level TEXT NOT NULL,

  status session_status_enum NOT NULL DEFAULT 'CREATED',

  duration_seconds INTEGER DEFAULT 900,

  -- ✅ FIXED (timezone safe)
  started_at TIMESTAMPTZ NULL,
  expires_at TIMESTAMPTZ NULL,
  ended_at TIMESTAMPTZ NULL,

  total_questions INTEGER,
  answered_questions INTEGER DEFAULT 0,

  overall_score NUMERIC,
  risk_score NUMERIC,
  risk_level risk_level_enum,

  terminated_at TIMESTAMPTZ NULL,
  termination_reason TEXT NULL,
  terminated_by_system BOOLEAN DEFAULT FALSE,

  -- ✅ FIXED
  created_at TIMESTAMPTZ DEFAULT clock_timestamp(),
  updated_at TIMESTAMPTZ DEFAULT clock_timestamp()
);