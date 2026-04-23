import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionCard = () => {
  const { questions, currentQuestionIndex } = useLiveInterview();

  const question = questions[currentQuestionIndex];
  if (!question) return null;

  return (
    <div className="mb-6 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-[0_20px_45px_-30px_rgba(77,44,94,0.35)] backdrop-blur-sm">

      <p className="whitespace-pre-line text-[15px] leading-7 text-gray-800">
        {question.question_text}
      </p>

    </div>
  );
};

export default QuestionCard;
