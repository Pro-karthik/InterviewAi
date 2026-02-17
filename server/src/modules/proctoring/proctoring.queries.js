export const getSessionQuery = `
SELECT id, status
FROM interview_sessions
WHERE id = $1 AND user_id = $2
FOR UPDATE;
`;

export const getSecurityQuery = `
SELECT *
FROM session_security
WHERE session_id = $1
FOR UPDATE;
`;

export const updateSecurityQuery = `
UPDATE session_security
SET total_score = total_score + $1,
    violation_count = violation_count + 1,
    updated_at = NOW()
WHERE session_id = $2
RETURNING total_score;
`;

export const terminateSessionQuery = `
UPDATE interview_sessions
SET status = 'TERMINATED',
    terminated_at = NOW(),
    termination_reason = $1,
    terminated_by_system = TRUE
WHERE id = $2;
`;

export const markSecurityTerminatedQuery = `
UPDATE session_security
SET terminated = TRUE
WHERE session_id = $1;
`;
