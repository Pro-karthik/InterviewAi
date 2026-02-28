export default function SessionHeader({ session }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl2 shadow-card border p-8">

      {/* Subtle gradient accent strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-heroGradient" />

      <div className="flex justify-between items-start flex-wrap gap-6">

        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Interview Evaluation Report
          </h1>

          <p className="mt-2 text-lg text-primary font-medium">
            {session.skill}
          </p>

          <p className="text-sm text-text-secondary mt-1">
            {new Date(session.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right space-y-3">
          <p className="text-4xl font-bold text-primary">
            {session.overallScore}
          </p>

          <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            {session.riskLevel} RISK
          </span>
        </div>

      </div>
    </div>
  )
}