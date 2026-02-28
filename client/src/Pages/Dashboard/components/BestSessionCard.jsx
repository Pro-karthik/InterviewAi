/* -------------------------
   Helpers
-------------------------- */

const formatDate = (dateString) => {
  if (!dateString) return "—";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const truncateText = (text = "", maxLength = 150) => {
  if (!text) return "—";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

/* -------------------------
   Main Component
-------------------------- */

const BestSessionCard = ({ bestSession }) => {
  if (!bestSession) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          🏆 Best Performance
        </h2>

        <div className="mt-6 text-gray-500 text-sm">
          No completed sessions yet.
        </div>
      </div>
    );
  }

  const {
    skill,
    overall_score,
    created_at,
    strengths,
  } = bestSession;

  return (
   <div className="bg-white border rounded-lg shadow-sm p-6">
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-900">🏆 Best Performance</h2>
    <p className="text-sm text-gray-500">Highest scoring interview session</p>
  </div>

  {/* Skill */}
  <div className="mb-4">
    <p className="text-sm text-gray-500">Skill</p>
    <p className="text-gray-900 font-medium">{skill || "—"}</p>
  </div>

  {/* Score + Date */}
  <div className="flex justify-between items-center mb-5">
    <div>
      <p className="text-sm text-gray-500">Score</p>
      <p className="text-lg font-semibold text-gray-900">{overall_score ?? "—"}</p>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-500">Date</p>
      <p className="text-gray-900">{formatDate(created_at)}</p>
    </div>
  </div>

  {/* Strengths */}
  <div className="mb-5">
    <p className="text-sm text-gray-500 mb-1">Strengths</p>
    <p className="text-sm text-gray-700 leading-relaxed">{strengths}</p>
  </div>

  {/* Enhancement Section */}
  <div className="border-t pt-4 mt-4">
    <p className="text-sm text-gray-500 mb-1">Tip</p>
    <p className="text-sm text-gray-700 italic">
      Keep building on your clarity — aim to balance technical depth.
    </p>
  </div>
</div>
  );
};

export default BestSessionCard;