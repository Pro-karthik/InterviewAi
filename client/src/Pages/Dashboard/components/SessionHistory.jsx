import { useNavigate } from "react-router-dom";

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

const getRiskBadge = (level) => {
  switch (level) {
    case "LOW":
      return "bg-green-100 text-green-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "HIGH":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "EVALUATED":
      return "bg-blue-100 text-blue-700";
    case "TERMINATED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

/* -------------------------
   Main Component
-------------------------- */

const SessionHistory = ({ sessions = [] }) => {
  const navigate = useNavigate();

  if (!sessions.length) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Session History
        </h2>

        <div className="mt-6 text-gray-500 text-sm">
          No session history available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-3">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Session History
        </h2>
        <p className="text-sm text-gray-500">
          Review past interview sessions
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="max-h-96 overflow-y-auto space-y-4 pr-2">

        {sessions.map((session) => (
          <div
            key={session.sessionId}
            onClick={() =>
              navigate(`/dashboard/session/${session.sessionId}`)
            }
            className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition"
          >

            {/* Top Row */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-900">
                  {session.skill}
                </p>
                <p className="text-sm text-gray-500">
                  {session.experienceLevel} • {formatDate(session.createdAt)}
                </p>
              </div>

              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge(
                  session.status
                )}`}
              >
                {session.status}
              </span>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center mt-3">

              <div className="text-sm text-gray-700">
                Score:{" "}
                <span className="font-semibold text-gray-900">
                  {session.overallScore ?? "—"}
                </span>
              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getRiskBadge(
                    session.riskLevel
                  )}`}
                >
                  {session.riskLevel}
                </span>

                {session.malpractice ? (
                  <span className="text-red-600 text-xs font-medium">
                    ⚠ Suspicious
                  </span>
                ) : (
                  <span className="text-green-600 text-xs font-medium">
                    ✔ Clean
                  </span>
                )}

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default SessionHistory;