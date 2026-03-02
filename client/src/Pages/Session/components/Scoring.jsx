import { useEffect, useState } from "react";

export default function ScoreRing({ score = 0, size = 120, strokeWidth = 10 }) {
 const MAX_SCORE = 50;

const [progress, setProgress] = useState(0);

const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

useEffect(() => {
  let start = 0;
  const duration = 800;
  const stepTime = 10;

  const normalizedScore = Math.min(score, MAX_SCORE);
  const increment = normalizedScore / (duration / stepTime);

  const interval = setInterval(() => {
    start += increment;

    if (start >= normalizedScore) {
      start = normalizedScore;
      clearInterval(interval);
    }

    setProgress(start);
  }, stepTime);

  return () => clearInterval(interval);
}, [score]);

const strokeDashoffset =
  circumference - (progress / MAX_SCORE) * circumference;

  return (
    <div className="relative flex items-center justify-center">

      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress */}
        <circle
          stroke="currentColor"
          className="text-primary"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Score */}
      <div className="absolute text-3xl font-bold text-text-primary">
        {Math.round(progress)}
      </div>
    </div>
  );
}