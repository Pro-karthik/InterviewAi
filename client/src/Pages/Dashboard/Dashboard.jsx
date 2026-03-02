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

const historyData = [
  {
    sessionId: "s1-123",
    skill: "Java, Python, SQL",
    experienceLevel: "Fresher",
    status: "EVALUATED",
    createdAt: "2026-02-21T06:27:29.032Z",
    terminatedAt: null,
    terminationReason: null,
    terminatedBySystem: false,
    overallScore: 46,
    riskScore: "0",
    riskLevel: "LOW",
    malpractice: false,
    malpracticeSummary: {
      noFaceMs: 0,
      totalScore: "0",
      multiFaceMs: 0,
      tabSwitches: 0,
      terminatedBySystem: false,
    },
    breakdown: {
      technical: 10,
      depth: 8,
      clarity: 10,
      problemSolving: 8,
      communication: 10,
    },
  },

  {
    sessionId: "s2-456",
    skill: "React, Node.js",
    experienceLevel: "Intermediate",
    status: "EVALUATED",
    createdAt: "2026-02-18T10:15:00.000Z",
    terminatedAt: null,
    terminationReason: null,
    terminatedBySystem: false,
    overallScore: 38,
    riskScore: "35",
    riskLevel: "MEDIUM",
    malpractice: true,
    malpracticeSummary: {
      noFaceMs: 6000,
      totalScore: "35",
      multiFaceMs: 2000,
      tabSwitches: 2,
      terminatedBySystem: false,
    },
    breakdown: {
      technical: 9,
      depth: 7,
      clarity: 8,
      problemSolving: 7,
      communication: 7,
    },
  },

  {
    sessionId: "s3-789",
    skill: "System Design",
    experienceLevel: "Experienced",
    status: "TERMINATED",
    createdAt: "2026-02-15T09:00:00.000Z",
    terminatedAt: "2026-02-15T09:25:00.000Z",
    terminationReason: "Multiple face detection & tab switching",
    terminatedBySystem: true,
    overallScore: 22,
    riskScore: "82",
    riskLevel: "HIGH",
    malpractice: true,
    malpracticeSummary: {
      noFaceMs: 15000,
      totalScore: "82",
      multiFaceMs: 8000,
      tabSwitches: 6,
      terminatedBySystem: true,
    },
    breakdown: {
      technical: 6,
      depth: 4,
      clarity: 5,
      problemSolving: 3,
      communication: 4,
    },
  },

  {
    sessionId: "s4-321",
    skill: "Data Structures & Algorithms",
    experienceLevel: "Fresher",
    status: "EVALUATED",
    createdAt: "2026-02-10T14:30:00.000Z",
    terminatedAt: null,
    terminationReason: null,
    terminatedBySystem: false,
    overallScore: 41,
    riskScore: "12",
    riskLevel: "LOW",
    malpractice: false,
    malpracticeSummary: {
      noFaceMs: 1000,
      totalScore: "12",
      multiFaceMs: 0,
      tabSwitches: 1,
      terminatedBySystem: false,
    },
    breakdown: {
      technical: 9,
      depth: 8,
      clarity: 8,
      problemSolving: 8,
      communication: 8,
    },
  },
];

const Dashboard = () => {
  const { data, loading } = useDashboardReport();

  // 🔹 Loading State
  if (loading) {
    return (
    <MainLayout>
       <Loader/>
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
<SessionHistory sessions={historyData} />

    
    </MainLayout>
  );
};

export default Dashboard;