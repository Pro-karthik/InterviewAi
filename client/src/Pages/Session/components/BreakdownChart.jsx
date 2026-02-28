import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,CartesianGrid 
} from "recharts"

export default function BreakdownChart({ breakdown }) {
  const data = [
    { name: "Technical", value: breakdown.technical },
    { name: "Depth", value: breakdown.depth },
    { name: "Clarity", value: breakdown.clarity },
    { name: "Problem Solving", value: breakdown.problemSolving },
    { name: "Communication", value: breakdown.communication }
  ]

  return (
    <div className="bg-white p-6 rounded-xl2 shadow-card">
      <h3 className="font-semibold text-text-primary mb-4">
        Performance Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#6B3F85"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}