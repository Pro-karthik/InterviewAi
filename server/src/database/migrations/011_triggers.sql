CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sessions_updated
BEFORE UPDATE ON interview_sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_questions_updated
BEFORE UPDATE ON ai_questions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_answers_updated
BEFORE UPDATE ON answers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_analysis_updated
BEFORE UPDATE ON session_analysis
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_security_updated
BEFORE UPDATE ON session_security
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
