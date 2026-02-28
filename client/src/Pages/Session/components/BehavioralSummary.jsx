export default function BehavioralSummary({ summary }) {

  const isClean =
    summary.noFaceMs === 0 &&
    summary.multiFaceMs === 0 &&
    summary.tabSwitches === 0 &&
    Number(summary.totalScore) === 0

  return (
    <div className="bg-white rounded-xl2 shadow-card border p-8">

      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Behavioral Integrity
      </h3>

      {isClean ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
          <p className="text-green-700 font-medium">
            ✔ No suspicious behavior detected during the session.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          <Metric label="Tab Switches" value={summary.tabSwitches} />
          <Metric label="No Face Time" value={`${summary.noFaceMs} ms`} />
          <Metric label="Multi Face Time" value={`${summary.multiFaceMs} ms`} />
          <Metric label="Violation Score" value={summary.totalScore} />
        </div>
      )}

    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="bg-background-muted p-4 rounded-xl text-center">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="mt-2 font-semibold text-text-primary">{value}</p>
    </div>
  )
}