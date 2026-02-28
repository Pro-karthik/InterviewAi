import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import SessionHeader from "./components/SessionHeader"
import BreakdownChart from "./components/BreakdownChart"
import WeakestDimensionCard from "./components/WeakestDimensionCard"
import BehavioralSummary from "./components/BehavioralSummary"
import TerminationSection from "./components/TerminationSection"

export default function SessionDetail() {
  const { sessionId } = useParams()
  // const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const dummySession = {
  sessionId: "b38d0c4e-485b-4a75-aebe-daac6972e4f0",
  skill: "Java , Python , SQL",
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
    tabSwitches: 0
  },
  breakdown: {
    technical: 10,
    depth: 8,
    clarity: 10,
    problemSolving: 8,
    communication: 10
  }
}
const session = dummySession ;


  // useEffect(() => {
    
  //   fetch("http://localhost:5173/api/sessions/history")
  //     .then(res => res.json())
  //     .then(data => {
  //       const found = data.find(s => s.sessionId === sessionId)
  //       setSession(found)
  //       setLoading(false)
  //     })
  // }, [sessionId])

  // if (loading)
  //   return <div className="p-10 text-center">Loading session...</div>

  if (!session)
    return <div className="p-10 text-center">Session not found</div>

  return (
  <div className="min-h-screen bg-background py-12 font-body">

    {/* Centered container */}
    <div className="max-w-6xl mx-auto px-6 space-y-10">

      <SessionHeader session={session} />

      {/* Main Two Column Section */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Chart takes more space */}
        <div className="lg:col-span-2">
          <BreakdownChart breakdown={session.breakdown} />
        </div>

        <div>
          <WeakestDimensionCard breakdown={session.breakdown} />
        </div>

      </div>

      <BehavioralSummary summary={session.malpracticeSummary} />

      {session.status === "TERMINATED" && (
        <TerminationSection session={session} />
      )}

    </div>
  </div>
)
}