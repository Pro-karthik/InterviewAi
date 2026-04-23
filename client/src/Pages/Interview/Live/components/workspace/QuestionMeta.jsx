import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionMeta = () => {
  const { questions, currentQuestionIndex } = useLiveInterview();

  const question = questions[currentQuestionIndex];
  const difficultyStyles =
    question?.difficulty === "Easy"
      ? "border border-green-200 bg-green-50 text-green-700"
      : question?.difficulty === "Medium"
      ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
      : "border border-red-200 bg-red-50 text-red-700";

  if (!question) return null;

  return (
    <div className="flex items-center gap-3 mb-4">

      {/* Category Badge */}
      <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
        Category: {question.category}
      </span>

      {/* Difficulty Badge */}
      <span className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ${difficultyStyles}`}>
        Difficulty: {question.difficulty}
      </span>

    </div>
  );
};

export default QuestionMeta;
