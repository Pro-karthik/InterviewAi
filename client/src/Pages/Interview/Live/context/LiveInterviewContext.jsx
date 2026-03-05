import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../../../../api/session.api";
import { beginSession } from "../../../../api/session.api";

const LiveInterviewContext = createContext();

export const LiveInterviewProvider = ({ sessionId, children }) => {
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("READY");

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getSession(sessionId);

        setSession(response.data.session);
        setQuestions(response.data.qaData);

        setStatus(response.data.session.status);
      } catch (err) {
        console.error("Failed to load interview session", err);
        setError("Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

 const startInterview = async () => {
  try {

    // 1️⃣ Fullscreen
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }

    // 2️⃣ Start session timer on backend
    await beginSession(sessionId);

    // 3️⃣ Update status
    setStatus("IN_PROGRESS");
    setCurrentQuestionIndex(0);

  } catch (error) {
    console.error("Failed to start interview", error);
  }
};

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const finishInterview = () => {
    setStatus("FINISHED");
  };

  return (
    <LiveInterviewContext.Provider
      value={{
        session,
        questions,
        loading,
        error,

        status,
        currentQuestionIndex,

        startInterview,
        nextQuestion,
        finishInterview,
      }}
    >
      {children}
    </LiveInterviewContext.Provider>
  );
};

export const useLiveInterview = () => {
  const context = useContext(LiveInterviewContext);

  if (!context) {
    throw new Error(
      "useLiveInterview must be used within LiveInterviewProvider"
    );
  }

  return context;
};