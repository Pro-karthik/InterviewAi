import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionNavigator = () => {

  const {
    questions,
    answers,
    currentQuestionIndex,
    goToQuestion
  } = useLiveInterview();

  return (
    <div className="border-r bg-gray-50 flex flex-col items-center pt-6 gap-4">

      {questions.map((_, index) => {

        const isCurrent = index === currentQuestionIndex;
        const isAnswered = answers[index];

        let style =
          "w-10 h-10 flex items-center justify-center rounded-lg font-medium cursor-pointer";

        if (isCurrent) {
          style += " bg-black text-white";
        } else if (isAnswered) {
          style += " bg-green-100 text-green-700";
        } else {
          style += " bg-gray-200 text-gray-700";
        }

        return (
          <div
            key={index}
            className={style}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </div>
        );

      })}

    </div>
  );
};

export default QuestionNavigator;