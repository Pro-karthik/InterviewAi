import { useLiveInterview } from "../../context/LiveInterviewContext";
import InterviewTimer from "./InterviewTimer";

const InterviewHeader = () => {
  const { session, questions, currentQuestionIndex } = useLiveInterview();

  const totalQuestions = questions.length;
  const current = currentQuestionIndex + 1;

  return (
    <div className="mb-6 mr-12 flex items-center justify-between rounded-3xl border border-gray-100 bg-white/85 px-6 py-5 shadow-[0_20px_45px_-30px_rgba(77,44,94,0.35)] backdrop-blur-sm">

      {/* Left side */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-800">
          {session?.skill} Interview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Question {current} of {totalQuestions}
        </p>
      </div>

      {/* Right side */}
      <InterviewTimer />

    </div>
  );
};

export default InterviewHeader;
