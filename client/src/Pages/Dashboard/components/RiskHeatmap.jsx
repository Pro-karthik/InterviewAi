/* -------------------------
   Helpers
-------------------------- */

const getHeatColor = (value, type = "count") => {
  const num = Number(value || 0);

  if (num === 0) return "bg-white";

  if (type === "ms") {
    if (num <= 5000) return "bg-yellow-100";
    if (num <= 15000) return "bg-orange-200";
    return "bg-red-300";
  }

  // count logic
  if (num <= 2) return "bg-yellow-100";
  if (num <= 5) return "bg-orange-200";
  return "bg-red-300";
};

const formatMs = (ms) => {
  if (!ms) return "0s";
  return `${Math.round(ms / 1000)}s`;
};

/* -------------------------
   Main Component
-------------------------- */

const RiskHeatmap = ({ riskHeatmap = [] }) => {
  if (!riskHeatmap.length) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Risk Heatmap
        </h2>
        <div className="mt-6 text-gray-500 text-sm">
          No behavioral data available.
        </div>
      </div>
    );
  }

  const data = riskHeatmap[0]; // current API gives one object

  const metrics = [
    { label: "Tab Switches", key: "tab_visibility_count", type: "count" },
    { label: "Window Blur", key: "window_blur_count", type: "count" },
    { label: "Fullscreen Exit", key: "fullscreen_exit_count", type: "count" },
    { label: "No Face Time", key: "total_no_face_ms", type: "ms" },
    { label: "Multi Face Time", key: "total_multi_face_ms", type: "ms" },
    { label: "Head Yaw", key: "total_head_yaw_ms", type: "ms" },
    { label: "Head Pitch", key: "total_head_pitch_ms", type: "ms" },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Risk Heatmap
        </h2>
        <p className="text-sm text-gray-500">
          Behavioral pattern detection overview
        </p>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const value = data[metric.key] ?? 0;

          return (
            <div
              key={metric.key}
              className={`border rounded-md p-4 text-sm text-gray-700 ${getHeatColor(
                value,
                metric.type
              )}`}
            >
              <p className="text-gray-500 mb-1">{metric.label}</p>

              <p className="font-semibold text-gray-900">
                {metric.type === "ms"
                  ? formatMs(value)
                  : value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskHeatmap;