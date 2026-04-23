import { useLiveInterview } from "../../context/LiveInterviewContext";

const AnswerEditor = () => {

  const {
    currentQuestionIndex,
    answers,
    saveAnswer
  } = useLiveInterview();

  const currentAnswer = answers[currentQuestionIndex] || "";

  const handleChange = (e) => {
    saveAnswer(currentQuestionIndex, e.target.value);
  };

  return (
    <div className="mb-6">

      <textarea
        value={currentAnswer}
        onChange={handleChange}
        placeholder="Write your answer here..."
        className="h-48 w-full resize-none rounded-3xl border border-gray-100 bg-white/90 p-5 text-gray-700 shadow-[0_20px_45px_-30px_rgba(77,44,94,0.35)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[#c9b5d6] focus:ring-4 focus:ring-[#4D2C5E]/10"
      />

    </div>
  );
};

export default AnswerEditor;
