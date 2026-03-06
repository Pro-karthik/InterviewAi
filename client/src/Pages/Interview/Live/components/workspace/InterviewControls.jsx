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
    <div className="border-t pt-5 flex items-center justify-between">

      {/* Left buttons */}
      <div className="flex gap-3">

        <button
          onClick={prevQuestion}
          disabled={isFirst}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={nextQuestion}
          disabled={isLast}
          className="px-4 py-2 border rounded-lg"
        >
          Next
        </button>

      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-40"
      >
        Submit Interview
      </button>

    </div>
  );
};

export default InterviewControls;