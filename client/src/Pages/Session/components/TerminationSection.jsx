export default function TerminationSection({ session }) {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-xl2">

      <h3 className="font-semibold text-red-700 mb-3">
        Session Terminated
      </h3>

      <p className="text-red-600">
        Reason: {session.terminationReason}
      </p>

      {session.terminatedAt && (
        <p className="text-sm mt-2 text-red-500">
          Terminated At: {new Date(session.terminatedAt).toLocaleString()}
        </p>
      )}

      <p className="mt-2 text-sm text-red-500">
        {session.terminatedBySystem
          ? "Terminated automatically by system."
          : "Terminated manually."}
      </p>

    </div>
  )
}