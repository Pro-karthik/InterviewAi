import React from "react";
import { useLocation } from "react-router-dom";

import ResultSummaryCard from "./components/ResultSummaryCard";
import StrengthSection from "./components/StrengthSection";
import WeaknessSection from "./components/WeaknessSection";
import ImprovementSection from "./components/ImprovementSection";
import QuestionBreakdown from "./components/QuestionBreakdown";
import ActionButtons from "./components/ActionButtons";

const ResultPage = () => {
  const location = useLocation();

  // 🔥 Correct source of truth
  const evaluation = location.state?.evaluation;

  // ✅ fallback (optional but safe)
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

        <ResultSummaryCard evaluation={evaluation} />

        <div className="grid grid-cols-2 gap-8">
          <StrengthSection strengths={evaluation.strengths} />
          <WeaknessSection weaknesses={evaluation.weaknesses} />
        </div>

        <ImprovementSection plan={evaluation.improvement_plan} />

        <QuestionBreakdown answers={evaluation.answers} />

        <ActionButtons />
      </div>
    </div>
  );
};

export default ResultPage;