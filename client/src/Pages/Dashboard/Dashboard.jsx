import { useDashboardReport } from "../../hooks/useDashboardReport";
import KPICards from "./components/KpiCards";
import { HashLoader } from "react-spinners";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  const { data, loading } = useDashboardReport();

  // 🔹 Loading State
  if (loading) {
    return (
    <MainLayout>
      <div className="p-6">
        <HashLoader />
      </div>
      </MainLayout> 
    );
  }

  // 🔹 Safety check
  if (!data) {
    return (
    <MainLayout>
      <div className="p-6 text-text-secondary">
        No dashboard data available.
      </div>
      </MainLayout>
    );
  }

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

      
      <KPICards
        behavioralRisk={data.behavioralRisk}
        bestSession={data.bestSession}
      />

      {/* Later we will add:
          <PerformanceTrend />
          <SkillBreakdown />
          <RiskHeatmap />
          <SessionHistory />
      */}

    
    </MainLayout>
  );
};

export default Dashboard;