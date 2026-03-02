import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import SessionHeader from "./components/SessionHeader";
import PerformanceBreakdown from "./components/PerformanceBreakdown";
import BehavioralSection from "./components/BehavioralSection";
import Loader from "../../components/Loader";


import { useSessionDetails } from "../../hooks/useSessionHistory";

export default function SessionDetail() {
  const { id } = useParams();
  const { session, loading, error } = useSessionDetails(id);
  console.log("Session Details:", session);

  return (
    <MainLayout>
      <div className="p-6 space-y-8 max-w-6xl mx-auto">

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
            Error loading session details: {error}
          </div>
        )}

        {/* No Session */}
        {!loading && !error && !session && (
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-text-secondary">
            Session not found.
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && session && (
          <>
            <SessionHeader session={session} />

            <PerformanceBreakdown breakdown={session.breakdown} />

            <BehavioralSection data={session.malpracticeSummary} />
          </>
        )}

      </div>
    </MainLayout>
  );
}