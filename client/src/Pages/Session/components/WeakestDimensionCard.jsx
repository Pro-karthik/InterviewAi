export default function WeakestDimensionCard({ breakdown }) {

  const weakest = Object.entries(breakdown)
    .sort((a, b) => a[1] - b[1])[0]

  return (
    <div className="bg-white p-6 rounded-xl2 shadow-card border-l-4 border-accent">

      <h3 className="font-semibold text-text-primary mb-3">
        Weakest Dimension
      </h3>

      <p className="text-2xl font-bold text-accent">
        {weakest[0]}
      </p>

      <p className="mt-2 text-text-secondary">
        Score: {weakest[1]}
      </p>

      <p className="mt-4 text-sm text-text-secondary">
        This is the area that needs improvement in upcoming sessions.
      </p>

    </div>
  )
}