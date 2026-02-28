import { Shield, AlertTriangle, Trophy, Layers } from "lucide-react";

/* -------------------------
   Utility: Risk Helpers
-------------------------- */

const getRiskMeta = (score) => {
  const value = Number(score);

  if (value <= 30) {
    return { badge: "LOW" };
  }

  if (value <= 70) {
    return { badge: "MEDIUM" };
  }

  return { badge: "HIGH" };
};

/* -------------------------
   Reusable Card
-------------------------- */

const KPICard = ({ title, value, subtitle, icon, valueColor = "text-gray-900", badge }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>

        <div className="flex items-center gap-3">
          <h2 className={`text-3xl font-bold ${valueColor}`}>{value}</h2>
          {badge && (
            <span className="text-xs px-2 py-1 border rounded font-medium text-gray-700">
              {badge}
            </span>
          )}
        </div>

        {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
      </div>

      <div className="w-12 h-12 flex items-center justify-center text-gray-600">
        {icon}
      </div>
    </div>
  );
};

/* -------------------------
   KPI Container
-------------------------- */

const KPICards = ({ behavioralRisk, bestSession }) => {
  const totalSessions = behavioralRisk?.totalSessions ?? 0;
  const avgRisk = Number(behavioralRisk?.avgRiskScore ?? 0);
  const highRisk = behavioralRisk?.highRiskSessions ?? 0;

  const bestScore =
    bestSession && typeof bestSession.overall_score === "number"
      ? bestSession.overall_score
      : "-";

  const riskMeta = getRiskMeta(avgRisk);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total Sessions"
        value={totalSessions}
        subtitle="Sessions attempted"
        icon={<Layers size={22} />}
      />

      <KPICard
        title="Avg Risk Score"
        value={avgRisk}
        subtitle="Behavioral monitoring"
        icon={<Shield size={22} />}
        valueColor={avgRisk > 70 ? "text-red-600" : avgRisk > 30 ? "text-yellow-600" : "text-green-600"}
        badge={riskMeta.badge}
      />

      <KPICard
        title="High Risk Sessions"
        value={highRisk}
        subtitle="Flagged as HIGH"
        icon={<AlertTriangle size={22} />}
        valueColor={highRisk > 0 ? "text-red-600" : "text-gray-900"}
      />

      <KPICard
        title="Best Score"
        value={bestScore}
        subtitle="Highest performance"
        icon={<Trophy size={22} />}
        valueColor="text-blue-600"
      />
    </div>
  );
};

export default KPICards;