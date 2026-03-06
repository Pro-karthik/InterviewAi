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
        className="w-full h-48 border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
      />

    </div>
  );
};

export default AnswerEditor;