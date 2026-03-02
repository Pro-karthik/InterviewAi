import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function RadarChartComponent({ data = [] }) {
  const formattedData = data.map((item) => ({
    subject: item.title,
    score: Math.round(item.value ?? 0),
    fullMark: 10,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <RadarChart data={formattedData}>
          {/* Softer grid */}
          <PolarGrid stroke="#E5E7EB" />

          {/* Axis Labels */}
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />

          {/* Scale 0–100 */}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 10]}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
          />

          {/* Radar Area */}
          <Radar
            name="Score"
            dataKey="score"
             stroke="#4D2C5E"
                  fill="#6B3F85"
            fillOpacity={0.25}
            strokeWidth={2}
          />

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}