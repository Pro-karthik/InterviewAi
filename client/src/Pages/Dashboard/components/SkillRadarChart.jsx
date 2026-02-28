import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

/* -------------------------
   Transform Data
-------------------------- */

const transformRadarData = (dimensionAverages = {}) => {
  return [
    { subject: "Technical", value: dimensionAverages.technical ?? 0 },
    { subject: "Depth", value: dimensionAverages.depth ?? 0 },
    { subject: "Clarity", value: dimensionAverages.clarity ?? 0 },
    { subject: "Problem Solving", value: dimensionAverages.problem_solving ?? 0 },
    { subject: "Communication", value: dimensionAverages.communication ?? 0 },
  ];
};

/* -------------------------
   Main Component
-------------------------- */

const SkillRadarChart = ({ dimensionAverages, weakestDimension }) => {
  const data = transformRadarData(dimensionAverages);

  const hasData = data.some((item) => item.value > 0);

  const formattedWeakest =
    weakestDimension?.replace("_", " ") ?? null;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Skill Breakdown
        </h2>
        <p className="text-sm text-gray-500">
          Average performance across evaluation dimensions
        </p>
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No skill data available.
        </div>
      ) : (
        <>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={100} data={data}>
                <PolarGrid stroke="#e5e7eb" />
                
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#374151", fontSize: 12 }}
                />
                
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                />

                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#4D2C5E"
                  fill="#6B3F85"
                  fillOpacity={0.55}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Weakest Dimension */}
          {formattedWeakest && (
            <div className="mt-5 p-3 rounded-md border bg-gray-50 text-sm text-gray-700">
              ⚠ Weakest Area:{" "}
              <span className="font-medium capitalize">
                {formattedWeakest}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SkillRadarChart;