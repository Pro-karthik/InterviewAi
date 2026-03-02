import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function RadarChartComponent({ data }) {

  const formattedData = data.map((item) => ({
    subject: item.title,
    score: item.value,
    fullMark: 10,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <RadarChart data={formattedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="Score"
            dataKey="score"
            // stroke="#3b82f6"
            // fill="#3b82f6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}