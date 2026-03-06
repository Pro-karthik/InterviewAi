import React from "react";
import ResultSummaryCard from "./components/ResultSummaryCard";
import StrengthSection from "./components/StrengthSection";
import WeaknessSection from "./components/WeaknessSection";
import ImprovementSection from "./components/ImprovementSection";
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

const ResultPage = () => {

  const evaluation = dummyData?.evaluation;

  if (!evaluation) {
    return (
      <div className="p-10 text-gray-500">
        No evaluation data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 px-12 py-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Summary */}
        <ResultSummaryCard evaluation={evaluation} />

        {/* Strengths + Weakness */}
        <div className="grid grid-cols-2 gap-8">

          <StrengthSection strengths={evaluation.strengths} />

          <WeaknessSection weaknesses={evaluation.weaknesses} />

        </div>

        {/* Improvement */}
        <ImprovementSection plan={evaluation.improvement_plan} />

        {/* Question Breakdown */}
        <QuestionBreakdown answers={evaluation.answers} />
        {/* Action Buttons */}
        <ActionButtons />
      </div>

    </div>
  );
};

export default ResultPage;