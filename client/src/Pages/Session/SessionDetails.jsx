import SessionHeader from "./components/SessionHeader";
import PerformanceBreakdown from "./components/PerformanceBreakdown";
import BehavioralSection from "./components/BehavioralSection";
import MainLayout from "../../Layouts/MainLayout"

export default function SessionDetail() {
  const session = {
    skill: "Java, Python, SQL",
    experienceLevel: "Fresher",
    status: "EVALUATED",
    createdAt: "21 Feb 2026",
    overallScore: 50,
    riskLevel: "LOW",
    breakdown: {
      technical: 10,
      depth: 8,
      clarity: 10,
      problemSolving: 8,
      communication: 10,
    },
    malpracticeSummary: {
      tabSwitches: 0,
      noFaceMs: 0,
      multiFaceMs: 0,
      totalScore: 0,
    },
  };

  return (
    <MainLayout >
    <div className="bg-gray-50 min-h-screen p-6 space-y-6">
      <SessionHeader session={session} />
      <PerformanceBreakdown breakdown={session.breakdown} />
      <BehavioralSection data={session.malpracticeSummary} />
    </div>
    </MainLayout >
  );
}