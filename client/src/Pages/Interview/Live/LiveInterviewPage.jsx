import { useParams } from "react-router-dom";
import { LiveInterviewProvider, useLiveInterview } from "./context/LiveInterviewContext";
import ReadyScreen from "./components/ReadyScreen";
import NoInterviewLayout from "./components/NoInterviewLayout";
import InterviewLayout from "./components/InterviewLayout";
import TerminatedPage from "../Terminated/TerminatedPage";
import { HashLoader } from "react-spinners";

const InterviewContent = () => {
  const { session, questions, loading, status } = useLiveInterview();

  /*
  ============================
  Loading State
  ============================
  */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <HashLoader color="#5B2C6F" size={60} />
      </div>
    );
  }

  /*
  ============================
  No Session
  ============================
  */
  if (!session) {
    return <NoInterviewLayout />;
  }

  /*
  ============================
  Ready State
  ============================
  */
  if (status === "READY") {
    return (
      <ReadyScreen
        sessionId={session.id}
        skill={session.skill}
        questionCount={questions.length}
      />
    );
  }

  /*
  ============================
  Interview Running
  ============================
  */
  if (status === "IN_PROGRESS") {
    return <InterviewLayout />;
  }

  /*
  ============================
  Finished State
  ============================
  */
  if (status === "FINISHED") {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc] text-gray-700 text-lg font-medium">
        Interview completed successfully
      </div>
    );
  }

  /*
  ============================
  Terminated / Timeout
  ============================
  */
  if (status === "TERMINATED") {
    return (
      <TerminatedPage/>
    );
  }

  return null;
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