import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionCard = () => {
  const { questions, currentQuestionIndex } = useLiveInterview();

  const question = questions[currentQuestionIndex];
  if (!question) return null;

  return (
    <div className="bg-white border rounded-lg p-5 mb-6 shadow-sm">

      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {question.question_text}
      </p>

    </div>
  );
};

export default QuestionCard;