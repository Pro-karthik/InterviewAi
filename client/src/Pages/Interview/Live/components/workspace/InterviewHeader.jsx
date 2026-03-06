import { useLiveInterview } from "../../context/LiveInterviewContext";
import InterviewTimer from "./InterviewTimer";

const InterviewHeader = () => {
  const { session, questions, currentQuestionIndex } = useLiveInterview();

  const totalQuestions = questions.length;
  const current = currentQuestionIndex + 1;

  return (
    <div className="flex items-center justify-between border-b pb-4 mb-6 mr-12">

      {/* Left side */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {session?.skill} Interview
        </h1>

        <p className="text-sm text-gray-500">
          Question {current} of {totalQuestions}
        </p>
      </div>

      {/* Right side */}
      <InterviewTimer />

    </div>
  );
};

export default InterviewHeader;