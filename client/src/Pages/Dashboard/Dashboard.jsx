import { useDashboardReport } from "../../hooks/useDashboardReport";
import KPICards from "./components/KpiCards";
import Loader from "../../components/Loader";
import MainLayout from "../../layouts/MainLayout";
import PerformanceTrend from "./components/PerformanceTrend";
import BestSessionCard from "./components/BestSessionCard";
import RiskHeatmap from "./components/RiskHeatmap";
import BehavioralRiskGauge from "./components/BehavioralRiskGauge";
import SessionHistory from "./components/SessionHistory";
import SkillRadarChart from "./components/SkillRadarchart";
import { useSessionHistory } from "../../hooks/useSessionHistory";

const Dashboard = () => {
  const { data, loading } = useDashboardReport();
  const { sessions: historyData, loading: historyLoading } = useSessionHistory();

  return (
    <MainLayout>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-3 text-text-primary">
          AI Interview Dashboard
        </h1>
        <p className="text-text-secondary mb-3">
          Track performance, behavioral risk and growth insights
        </p>
      </div>

      {/* 🔹 Dashboard Analytics Section */}
      {loading ? (
        <Loader />
      ) : !data ? (
        <div className="p-6 text-text-secondary">
          No dashboard data available.
        </div>
      ) : (
        <>
          <KPICards
            behavioralRisk={data.behavioralRisk}
            bestSession={data.bestSession}
          />

          <PerformanceTrend performanceTrend={data.performanceTrend} />

          <div className="grid md:grid-cols-2 gap-6 mt-3">
            <SkillRadarChart
              dimensionAverages={data.dimensionAverages}
              weakestDimension={data.weakestDimension}
            />
            <BestSessionCard bestSession={data.bestSession} />
          </div>

          <RiskHeatmap riskHeatmap={data.riskHeatmap} />
          <BehavioralRiskGauge avgRiskScore={data.behavioralRisk?.avgRiskScore} />
        </>
      )}

      {/* 🔹 Session History Section (Independent) */}
      <div className="mt-6">
        {historyLoading ? (
          <Loader />
        ) : (
          <SessionHistory sessions={historyData} />
        )}
      </div>

    </MainLayout>
  );
};

export default Dashboard;