import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* -------------------------
   Risk Helper
-------------------------- */

const getRiskMeta = (score) => {
  const value = Number(score ?? 0);

  if (value <= 30) {
    return {
      level: "LOW",
      color: "#16a34a", // green-600
      badgeClass: "bg-green-100 text-green-700",
    };
  }

  if (value <= 70) {
    return {
      level: "MEDIUM",
      color: "#f59e0b", // amber-500
      badgeClass: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    level: "HIGH",
    color: "#dc2626", // red-600
    badgeClass: "bg-red-100 text-red-700",
  };
};

/* -------------------------
   Main Component
-------------------------- */

const BehavioralRiskGauge = ({ avgRiskScore }) => {
  const score = Number(avgRiskScore ?? 0);
  const { level, color, badgeClass } = getRiskMeta(score);

  const data = [
    { name: "Risk", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Behavioral Risk
        </h2>
        <p className="text-sm text-gray-500">
          Overall session monitoring risk level
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">

        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill={color} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-gray-900">
              {score}
            </span>
            <span className="text-sm text-gray-500">
              Risk Score
            </span>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${badgeClass}`}
          >
            {level}
          </span>
        </div>

      </div>
    </div>
  );
};

export default BehavioralRiskGauge;