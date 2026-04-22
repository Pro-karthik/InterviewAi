import { Clock3 } from "lucide-react";
import { useLiveInterview } from "../../context/LiveInterviewContext";

const InterviewTimer = () => {
  const { timeRemaining } = useLiveInterview();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatted = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const danger = timeRemaining < 120;
  const timerClasses = danger
    ? "inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm"
    : "inline-flex items-center gap-2 rounded-full border border-[#e7ddf0] bg-[#f7f2fb] px-4 py-2 text-sm font-semibold text-[#4D2C5E] shadow-sm";

  return (
    <div className={timerClasses} aria-live="polite">
      <Clock3 size={18} />
      <span>{formatted}</span>
    </div>
  );
};

export default InterviewTimer;
