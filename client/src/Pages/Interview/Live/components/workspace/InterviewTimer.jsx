import { useLiveInterview } from "../../context/LiveInterviewContext";

const InterviewTimer = () => {
  const { timeRemaining } = useLiveInterview();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatted = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const danger = timeRemaining < 120;

  return (
    <div
      className={`text-lg font-semibold ${
        danger ? "text-red-500" : "text-gray-800"
      }`}
    >
      ⏱ {formatted}
    </div>
  );
};

export default InterviewTimer;