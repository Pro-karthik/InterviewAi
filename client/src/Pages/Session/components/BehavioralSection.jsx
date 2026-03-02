import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function BehavioralSection({ data }) {
  if (!data) return null;

  const {
    tabSwitches = 0,
    noFaceMs = 0,
    multiFaceMs = 0,
    totalScore = 0,
  } = data;

  const isClean =
    tabSwitches === 0 &&
    noFaceMs === 0 &&
    multiFaceMs === 0 &&
    totalScore === 0;

  const isHighRisk = totalScore >= 70;

  const containerStyles = isClean
    ? "bg-green-50 border-green-200"
    : isHighRisk
    ? "bg-red-50 border-red-200"
    : "bg-yellow-50 border-yellow-200";

  const iconColor = isClean
    ? "text-green-600"
    : isHighRisk
    ? "text-red-600"
    : "text-yellow-600";

  const message = isClean
    ? "No suspicious behavior detected"
    : isHighRisk
    ? "High suspicious activity detected"
    : "Moderate suspicious activity detected";

  const formatMsToSeconds = (ms) => `${Math.round(ms / 1000)}s`;

  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm ${containerStyles}`}
    >
      {/* Header */}
      <h3 className="text-lg font-semibold text-text-primary mb-5">
        Trust & Behavioral Analysis
      </h3>

      {/* Status Section */}
      <div className="flex items-center gap-4">
        {isClean ? (
          <ShieldCheck className={iconColor} size={40} />
        ) : (
          <ShieldAlert className={iconColor} size={40} />
        )}

        <p className="font-medium text-text-primary">
          {message}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-text-secondary text-xs">Tab Switches</p>
          <p className="font-semibold text-text-primary mt-1">
            {tabSwitches}
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-text-secondary text-xs">No Face Time</p>
          <p className="font-semibold text-text-primary mt-1">
            {formatMsToSeconds(noFaceMs)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-text-secondary text-xs">Multi Face Time</p>
          <p className="font-semibold text-text-primary mt-1">
            {formatMsToSeconds(multiFaceMs)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-text-secondary text-xs">Violation Score</p>
          <p className="font-semibold text-text-primary mt-1">
            {totalScore}
          </p>
        </div>
      </div>
    </div>
  );
}