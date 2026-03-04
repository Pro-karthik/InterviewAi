import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../../api/session.api";
import ReadyScreen from "./components/ReadyScreen";

const LiveInterviewPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const data = await getSession(id);

        setSession(data.session);
        setQuestions(data.qaData);
      } catch (error) {
        console.error("Failed to fetch session", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [id]);

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

  if (session.status === "READY") {
    return (
      <ReadyScreen
        sessionId={session.id}
        skill={session.skill}
        questionCount={questions.length}
      />
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      Interview already started or finished
    </div>
  );
};

export default LiveInterviewPage;