CREATE TABLE session_security (
  session_id UUID PRIMARY KEY
    REFERENCES interview_sessions(id)
    ON DELETE CASCADE,

  total_score NUMERIC DEFAULT 0 CHECK (total_score >= 0),
  violation_count INT DEFAULT 0 CHECK (violation_count >= 0),

  total_no_face_ms INT DEFAULT 0 CHECK (total_no_face_ms >= 0),
  total_multi_face_ms INT DEFAULT 0 CHECK (total_multi_face_ms >= 0),
  total_head_yaw_ms INT DEFAULT 0 CHECK (total_head_yaw_ms >= 0),
  total_head_pitch_ms INT DEFAULT 0 CHECK (total_head_pitch_ms >= 0),

  tab_visibility_count INT DEFAULT 0 CHECK (tab_visibility_count >= 0),
  window_blur_count INT DEFAULT 0 CHECK (window_blur_count >= 0),
  fullscreen_exit_count INT DEFAULT 0 CHECK (fullscreen_exit_count >= 0),

  last_heartbeat_at TIMESTAMP NULL,

  terminated BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
