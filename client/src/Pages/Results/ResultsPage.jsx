import ScoreCard from "./components/ScoreCard";
import FeedbackSummary from "./components/FeedbackSummary";
import ImprovementPlan from "./components/ImprovementPlan";
import QuestionBreakdown from "./components/QuestionBreakdown";
import ActionButtons from "./components/ActionButtons";

const dummyData = {
  evaluation: {
    overall_score: 43,
    strengths:
      "The candidate demonstrates solid fundamental knowledge across Java, Python, and SQL. Communication is clear and concise.",
    weaknesses:
      "Answers are mostly textbook-level and lack deeper system understanding.",
    improvement_plan:
      "Focus on advanced SQL, JVM internals and modern Java features.",

    answers: [
      {
        question_id: "1",
        technical_score: 8,
        depth_score: 7,
        clarity_score: 9,
        problem_solving_score: 6,
        communication_score: 9,
        total_score: 39,
        feedback:
          "Correct explanation but missing JIT compiler details."
      },
      {
        question_id: "2",
        technical_score: 9,
        depth_score: 7,
        clarity_score: 9,
        problem_solving_score: 7,
        communication_score: 9,
        total_score: 41,
        feedback:
          "Good explanation of immutability and performance tradeoffs."
      },
      {
        question_id: "3",
        technical_score: 9,
        depth_score: 8,
        clarity_score: 9,
        problem_solving_score: 8,
        communication_score: 9,
        total_score: 43,
        feedback:
          "Strong SQL explanation with correct examples."
      }
    ]
  }
};

const ResultsPage = () => {

  const evaluation = dummyData.evaluation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 px-12 py-10">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">
          Interview Report
        </h1>

        <p className="text-gray-500 mt-2">
          A detailed AI evaluation of your interview performance
        </p>
      </div>

      <ScoreCard score={evaluation.overall_score} />

      <div className="grid grid-cols-2 gap-8 mt-10">

        <FeedbackSummary
          strengths={evaluation.strengths}
          weaknesses={evaluation.weaknesses}
        />

        <ImprovementPlan plan={evaluation.improvement_plan} />

      </div>

      <QuestionBreakdown answers={evaluation.answers} />

      <ActionButtons />

    </div>
  );
};

export default ResultsPage;