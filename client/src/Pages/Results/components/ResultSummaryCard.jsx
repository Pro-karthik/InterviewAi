import { FaChartBar } from "react-icons/fa";
const ResultSummaryCard = ({ evaluation }) => {
  if (!evaluation) return null;

  const score = evaluation?.overall_score ?? 0;

  const getScoreBadge = () => {
    if (score >= 45) return "Excellent";
    if (score >= 40) return "Strong";
    if (score >= 30) return "Good";
    return "Needs Work";
  };

  return (
    <div className="bg-card text-text-white rounded-lg p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-semibold flex items-center">
             <FaChartBar className="text-[#4D2C5E] inline-block w-5 h-5 mr-2" />
            Interview Result
          </h2>

          <p className="text-sm text-purple-200">
            AI evaluation summary
          </p>
        </div>

        <div className="text-right">
          <p className="text-4xl font-bold">
            {score}
          </p>

          <p className="text-sm text-purple-200">
            {getScoreBadge()}
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">

        <div className="bg-card-light rounded-lg p-3">
          <p className="text-xs text-purple-200">Questions</p>
          <p className="text-lg font-semibold">
            {evaluation.answers?.length || 0}
          </p>
        </div>

        <div className="bg-card-light rounded-lg p-3">
          <p className="text-xs text-purple-200">Overall Score</p>
          <p className="text-lg font-semibold">
            {evaluation.overall_score}
          </p>
        </div>

        <div className="bg-card-light rounded-lg p-3">
          <p className="text-xs text-purple-200">Status</p>
          <p className="text-lg font-semibold">
            Completed
          </p>
        </div>

      </div>

    </div>
  );
};

export default ResultSummaryCard;