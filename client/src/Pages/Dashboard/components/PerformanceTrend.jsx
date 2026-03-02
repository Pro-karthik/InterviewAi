import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* -------------------------
   Transform Data
-------------------------- */

const transformTrendData = (data = []) => {
  return data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    score: Number(item.overall_score ?? 0),
  }));
};

/* -------------------------
   Custom Tooltip
-------------------------- */

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md shadow-sm px-3 py-2 text-sm">
        <p className="text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900 font-semibold">
          Score: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

/* -------------------------
   Main Component
-------------------------- */

const PerformanceTrend = ({ performanceTrend = [] }) => {
  const data = transformTrendData(performanceTrend);

  const maxScore =
    data.length > 0
      ? Math.max(...data.map((d) => d.score)) + 5
      : 50;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Performance Trend
        </h2>
        <p className="text-sm text-gray-500">
          Overall score progression over time
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-gray-500">
          No performance data available.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4D2C5E" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#4D2C5E" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />

              <YAxis
                domain={[0, maxScore]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#4D2C5E"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PerformanceTrend;