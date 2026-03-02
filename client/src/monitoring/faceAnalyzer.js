export const analyzeFace = (face) => {
  const keypoints = face.keypoints;
  const box = face.box;

  if (!keypoints || keypoints.length === 0) return null;

  // Important landmarks
  const leftEye = keypoints[33];
  const rightEye = keypoints[263];
  const nose = keypoints[1];
  const chin = keypoints[152];

  // =========================
  // 1️⃣ Face Center (Between Eyes)
  // =========================
  const centerX = (leftEye.x + rightEye.x) / 2;
  const centerY = (leftEye.y + rightEye.y) / 2;

  // =========================
  // 2️⃣ Face Size Normalization
  // =========================
  const faceWidth = box.width;
  const faceHeight = box.height;

  // Avoid divide by zero
  if (faceHeight === 0 || faceWidth === 0) return null;

  // =========================
  // 3️⃣ Normalize Coordinates
  // =========================

  const normalizedNoseX = (nose.x - centerX) / faceWidth;
  const normalizedNoseY = (nose.y - centerY) / faceHeight;

  const normalizedChinY = (chin.y - centerY) / faceHeight;

  // =========================
  // 4️⃣ Yaw Estimation (Left ↔ Right)
  // =========================
  // Based on horizontal shift of nose from eye center
  const yaw = normalizedNoseX; 
  // Rough expected range: -0.15 to 0.15

  // =========================
  // 5️⃣ Pitch Estimation (Up ↕ Down)
  // =========================
  // Using vertical displacement
  const pitch = normalizedNoseY;
  // Rough expected range: -0.2 to 0.2

  // =========================
  // 6️⃣ Roll Estimation (Tilt)
  // =========================
  const eyeSlope = (rightEye.y - leftEye.y) / faceWidth;
  const roll = eyeSlope;

  // =========================
  // 7️⃣ Face Presence Confidence
  // =========================
  const faceArea = faceWidth * faceHeight;

  return {
    yaw,          // left-right
    pitch,        // up-down
    roll,         // tilt
    faceArea,     // useful metric
    faceWidth,
    faceHeight,
  };
};
