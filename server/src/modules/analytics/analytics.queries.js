export const getPerformanceTrendQuery = `
SELECT
  i.created_at::date AS date,
  sa.overall_score,
  sa.technical_avg,
  sa.depth_avg,
  sa.clarity_avg,
  sa.problem_solving_avg,
  sa.communication_avg
FROM session_analysis sa
JOIN interview_sessions i ON sa.session_id = i.id
WHERE i.user_id = $1
AND sa.malpractice_flag = false
ORDER BY i.created_at ASC;
`;

export const getDimensionAveragesQuery = `
SELECT
  AVG(technical_avg)::int AS technical,
  AVG(depth_avg)::int AS depth,
  AVG(clarity_avg)::int AS clarity,
  AVG(problem_solving_avg)::int AS problem_solving,
  AVG(communication_avg)::int AS communication
FROM session_analysis sa
JOIN interview_sessions i ON sa.session_id = i.id
WHERE i.user_id = $1
AND sa.malpractice_flag = false;
`;

export const getBestSessionQuery = `
SELECT
  sa.session_id,
  sa.overall_score,
  i.skill,
  i.created_at,
  sa.strengths
FROM session_analysis sa
JOIN interview_sessions i ON sa.session_id = i.id
WHERE i.user_id = $1
AND sa.malpractice_flag = false
ORDER BY sa.overall_score DESC
LIMIT 1;
`;

export const getRiskHeatmapQuery = `
SELECT
  i.id AS session_id,
  s.total_score,
  s.tab_visibility_count,
  s.window_blur_count,
  s.fullscreen_exit_count,
  s.total_no_face_ms,
  s.total_multi_face_ms,
  s.total_head_yaw_ms,
  s.total_head_pitch_ms
FROM session_security s
JOIN interview_sessions i ON s.session_id = i.id
WHERE i.user_id = $1
ORDER BY i.created_at DESC;
`;

export const getBehavioralRiskQuery = `
SELECT
  AVG(risk_score)::int AS avg_risk_score,
  COUNT(*) FILTER (WHERE risk_level = 'HIGH') AS high_risk_sessions,
  COUNT(*) AS total_sessions
FROM interview_sessions
WHERE user_id = $1;
`;