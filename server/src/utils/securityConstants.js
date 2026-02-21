export const VIOLATION_CONFIG = {
  NO_FACE: {
    column: "total_no_face_ms",
    weight: 0.005,
    isDuration: true
  },
  MULTIPLE_FACES: {
    column: "total_multi_face_ms",
    weight: 0.01,
    isDuration: true
  },
  HEAD_YAW: {
    column: "total_head_yaw_ms",
    weight: 0.003,
    isDuration: true
  },
  HEAD_PITCH: {
    column: "total_head_pitch_ms",
    weight: 0.003,
    isDuration: true
  },
  TAB_VISIBILITY: {
    column: "tab_visibility_count",
    weight: 2,
    isDuration: false,
    validState: "HIDDEN"
  },
  WINDOW_FOCUS: {
    column: "window_blur_count",
    weight: 2,
    isDuration: false,
    validState: "BLURRED"
  },
  FULLSCREEN: {
    column: "fullscreen_exit_count",
    weight: 3,
    isDuration: false,
    validState: "EXITED"
  }
};

export const MAX_TOTAL_SCORE = 50;
