export default function SkillCard({ skill, isLowest }) {
  const value = Number(skill.value ?? 0).toFixed(1);

  const getProgressColor = () => {
    if (value >= 8) return "bg-green-500";
    if (value >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-200
        ${
          isLowest
            ? "border-red-200 bg-red-50"
            : "border-gray-200 bg-white hover:shadow-sm"
        }`}
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-text-primary text-sm">
          {skill.title}
        </h4>

        <span className="font-semibold text-text-primary">
          {value}
        </span>
      </div>

      {/* Weakest Badge */}
      {isLowest && (
        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full mt-2 inline-block font-medium">
          Weakest Area
        </span>
      )}

      {/* Progress Bar (0–10 scaled to %) */}
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${value * 10}%` }}
        />
      </div>

      <p className="text-xs text-text-secondary mt-2">
        Out of 10
      </p>
    </div>
  );
}