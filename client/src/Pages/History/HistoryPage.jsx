import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/Loader";
import SessionHistory from "../Dashboard/components/SessionHistory";
import { useSessionHistory } from "../../hooks/useSessionHistory";

export default function HistoryPage() {
  const { sessions, loading, error } = useSessionHistory();

  return (
    <MainLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Session History
          </h1>
          <p className="text-text-secondary mt-1">
            View all your AI interview sessions
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div >
            <Loader />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
            Failed to load session history.
          </div>
        )}

        {/* Empty */}
        {!loading && !error && sessions?.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center">
            <p className="text-text-secondary">
              No sessions found.
            </p>
          </div>
        )}

        {/* Session List */}
        {!loading && !error && sessions?.length > 0 && (
          <SessionHistory sessions={sessions} />
        )}

      </div>
    </MainLayout>
  );
}