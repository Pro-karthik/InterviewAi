import { Calendar } from "lucide-react";
import ScoreRing from "./Scoring";

/* --------------------------
   Badge Helpers
--------------------------- */

const getRiskBadge = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case "low":
      return "bg-green-50 text-green-600";
    case "medium":
      return "bg-yellow-50 text-yellow-600";
    case "high":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "evaluated":
      return "bg-blue-100 text-blue-700";
    case "terminated":
      return "bg-red-100 text-red-700";
    case "in_progress":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function SessionHeader({ session }) {
  const formattedDate = new Date(session.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex items-center justify-between">

      {/* LEFT - Score Section */}
      <div className="flex items-center gap-6">

        <ScoreRing score={session.overallScore} />

        <div>
          {/* Risk Badge */}
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${getRiskBadge(
              session.riskLevel
            )}`}
          >
            {session.riskLevel || "Unknown"} Risk
          </span>

          <h2 className="text-2xl font-semibold mt-3 text-text-primary">
            Overall Score
          </h2>

          <p className="text-text-secondary text-sm mt-1">
            Skill: {session.skill}
          </p>

          <p className="text-text-secondary text-sm">
            Experience: {session.experienceLevel}
          </p>
        </div>
      </div>

      {/* RIGHT - Status + Date */}
      <div className="text-right space-y-3">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
            session.status
          )}`}
        >
          {session.status}
        </span>

        <div className="flex items-center gap-2 text-text-secondary justify-end text-sm">
          <Calendar size={16} />
          {formattedDate}
        </div>
      </div>
    </div>
  );
}