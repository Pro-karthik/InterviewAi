import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionNavigator = () => {
  const {
    questions,
    answers,
    currentQuestionIndex,
    goToQuestion
  } = useLiveInterview();

  return (
    <div className="flex flex-col items-center gap-4 border-r border-gray-100 bg-gradient-to-b from-[#f7f2fb] to-gray-50 pt-6">

      {questions.map((_, index) => {
        const isCurrent = index === currentQuestionIndex;
        const isAnswered = answers[index];

        let style =
          "flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold shadow-sm transition duration-200";

        if (isCurrent) {
          style +=
            " border-transparent bg-gradient-to-br from-[#4D2C5E] to-[#6D3C82] text-white shadow-[0_16px_30px_-18px_rgba(77,44,94,0.9)]";
        } else if (isAnswered) {
          style +=
            " border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100";
        } else {
          style +=
            " border-gray-200 bg-white/90 text-gray-600 hover:border-[#ccb9d8] hover:bg-[#f7f2fb]";
        }

        return (
          <button
            type="button"
            key={index}
            className={style}
            onClick={() => goToQuestion(index)}
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`Go to question ${index + 1}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionNavigator;
