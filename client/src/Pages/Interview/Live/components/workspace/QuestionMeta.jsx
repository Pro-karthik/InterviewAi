import { useLiveInterview } from "../../context/LiveInterviewContext";

const QuestionMeta = () => {
  const { questions, currentQuestionIndex } = useLiveInterview();

  const question = questions[currentQuestionIndex];

  if (!question) return null;

  return (
    <div className="flex items-center gap-3 mb-4">

      {/* Category Badge */}
      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
        Category: {question.category}
      </span>

      {/* Difficulty Badge */}
      <span
        className={`px-3 py-1 text-sm rounded-full font-medium
        ${
          question.difficulty === "Easy"
            ? "bg-green-100 text-green-700"
            : question.difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        Difficulty: {question.difficulty}
      </span>

    </div>
  );
};

export default QuestionMeta;