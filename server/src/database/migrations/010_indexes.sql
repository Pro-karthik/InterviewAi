-- Interview Sessions
CREATE INDEX idx_sessions_user
ON interview_sessions(user_id);

CREATE INDEX idx_sessions_status
ON interview_sessions(status);

CREATE INDEX idx_sessions_created
ON interview_sessions(created_at DESC);

-- AI Questions
CREATE INDEX idx_questions_session
ON ai_questions(session_id);

-- Answers
CREATE INDEX idx_answers_session
ON answers(session_id);

-- Session Security
CREATE INDEX idx_security_terminated
ON session_security(terminated);

CREATE INDEX idx_security_heartbeat
ON session_security(last_heartbeat_at);
