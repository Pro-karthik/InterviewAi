import { useParams } from "react-router-dom";
import { LiveInterviewProvider } from "./context/LiveInterviewContext";
import ReadyScreen from "./components/ReadyScreen";
import { useLiveInterview } from "./context/LiveInterviewContext";
import InterviewLayout from "./components/InterviewLayout";

const InterviewContent = () => {
  const { session, questions, loading, status } = useLiveInterview();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading interview...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        Session not found
      </div>
    );
  }

  if (status === "READY") {
    return (
      <ReadyScreen
        sessionId={session.id}
        skill={session.skill}
        questionCount={questions.length}
      />
    );
  }

  if (status === "IN_PROGRESS") {
  return <InterviewLayout />;
}

  return (
    <div className="h-screen flex items-center justify-center">
      Interview in progress
    </div>
  );
};

const LiveInterviewPage = () => {
  const { id } = useParams();

  return (
    <LiveInterviewProvider sessionId={id}>
      <InterviewContent />
    </LiveInterviewProvider>
  );
};

export default LiveInterviewPage;