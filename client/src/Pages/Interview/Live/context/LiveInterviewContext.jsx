import { createContext, useContext, useEffect, useState } from "react";
import { getSession, beginSession } from "../../../../api/session.api";

const LiveInterviewContext = createContext();

export const LiveInterviewProvider = ({ sessionId, children }) => {
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("READY");
  const [timeRemaining, setTimeRemaining] = useState(0);

  /*
  ============================
  Helper: Calculate remaining time
  ============================
  */
  const calculateRemainingTime = (
    startTime,
    durationSeconds,
    serverTime
  ) => {
    console.log(startTime,serverTime)
    const start = new Date(startTime).getTime();
    const serverNow = new Date(serverTime).getTime();

    const elapsed = Math.floor((serverNow - start) / 1000);
    console.log(elapsed)
    return Math.max(durationSeconds - elapsed, 0);
  };

  /*
  ============================
  Load Interview Session
  ============================
  */
  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getSession(sessionId);

        const { session: sessionData, qaData, serverTime } = response.data;
        setSession(sessionData);
        setQuestions(qaData);
        setStatus(sessionData.status);

        /*
        Restore timer if already started
        */
        if (sessionData.status === "IN_PROGRESS") {
          const remaining = calculateRemainingTime(
            sessionData.started_at,
            sessionData.duration_Seconds,
            serverTime
          );

          setTimeRemaining(remaining);
        }

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

  /*
  ============================
  Start Interview
  ============================
  */
  const startInterview = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }

      const response = await beginSession(sessionId);

      const { startTime, durationSeconds, serverTime } = response.data;

      const remaining = calculateRemainingTime(
        startTime,
        durationSeconds,
        serverTime
      );

      setTimeRemaining(remaining);
      setStatus("IN_PROGRESS");
      setCurrentQuestionIndex(0);

    } catch (error) {
      console.error("Failed to start interview", error);
    }
  };

  /*
  ============================
  Timer Logic
  ============================
  */
  useEffect(() => {
    if (status !== "IN_PROGRESS") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, [status]);

  /*
  ============================
  Answer Handling
  ============================
  */
  const saveAnswer = (index, text) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: text
    }));
  };

  /*
  ============================
  Question Navigation
  ============================
  */
  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, questions.length - 1)
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  /*
  ============================
  Interview Finish
  ============================
  */
  const finishInterview = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    setStatus("FINISHED");
  };

  /*
  ============================
  Helpers
  ============================
  */
  const allAnswered =
    Object.keys(answers).length === questions.length;

  return (
    <LiveInterviewContext.Provider
      value={{
        session,
        questions,
        loading,
        error,

        status,
        currentQuestionIndex,

        answers,
        saveAnswer,

        startInterview,
        nextQuestion,
        prevQuestion,
        goToQuestion,

        finishInterview,

        timeRemaining,
        allAnswered
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