import { useEffect, useState } from "react";

export default function ScoreRing({ score = 0, size = 120, strokeWidth = 10 }) {
  const [progress, setProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Animate from 0 to score
    let start = 0;
    const duration = 800;
    const stepTime = 10;
    const increment = score / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        start = score;
        clearInterval(interval);
      }
      setProgress(start);
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background Circle */}
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress Circle */}
        <circle
          stroke="#3B82F6"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Score Number */}
      <div className="absolute text-3xl font-bold text-primary">
        {Math.round(progress)}
      </div>
    </div>
  );
}