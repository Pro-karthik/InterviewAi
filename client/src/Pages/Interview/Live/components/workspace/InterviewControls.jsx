import { useLiveInterview } from "../../context/LiveInterviewContext";
import { useNavigate } from "react-router-dom";

const InterviewControls = () => {

  const {
    currentQuestionIndex,
    questions,
    nextQuestion,
    prevQuestion,
    finishInterview,
    allAnswered
  } = useLiveInterview();

  const navigate = useNavigate();

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  const handleSubmit = () => {
    finishInterview();
    navigate("/interview/evaluating");
  };

  return (
    <div className="flex items-center justify-between rounded-3xl border border-gray-100 bg-white/90 px-6 py-5 shadow-[0_20px_45px_-30px_rgba(77,44,94,0.35)] backdrop-blur-sm">

      {/* Left buttons */}
      <div className="flex gap-3">

        <button
          onClick={prevQuestion}
          disabled={isFirst}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition duration-200 hover:border-[#ccb9d8] hover:bg-[#f7f2fb] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={nextQuestion}
          disabled={isLast}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition duration-200 hover:border-[#ccb9d8] hover:bg-[#f7f2fb] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="rounded-xl bg-gradient-to-r from-[#4D2C5E] to-[#6D3C82] px-6 py-2.5 font-medium text-white shadow-lg transition duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Interview
      </button>

    </div>
  );
};

export default InterviewControls;
