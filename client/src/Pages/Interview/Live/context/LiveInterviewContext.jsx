import { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  beginSession,
  submitSession,
  evaluateSession
} from "../../../../api/session.api";
import { useNavigate } from "react-router-dom";

const LiveInterviewContext = createContext();

export const LiveInterviewProvider = ({ sessionId, children }) => {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("READY");
  const [timeRemaining, setTimeRemaining] = useState(null);

  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  /*
  ============================
  Load Session
  ============================
  */
  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await getSession(sessionId);
        const { session: sessionData, qaData, timer } = response.data;

        setSession(sessionData);
        setQuestions(qaData);
        setStatus(sessionData.status);

        if (timer) {
          setTimeRemaining(timer.remainingSeconds);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) loadSession();
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

      const { remainingSeconds, status } = response.data;

      setTimeRemaining(remainingSeconds);
      setStatus(status || "IN_PROGRESS");
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error(error);
    }
  };

  /*
  ============================
  Timer
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
  Save Answer
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
  Navigation
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
  Submit + Evaluate (CORE)
  ============================
  */
  const submitAndEvaluate = async () => {
    try {
      if (evaluating) return;

      setEvaluating(true);

      // 🔹 format answers safely
      const formattedAnswers = Object.keys(answers)
        .map((index) => {
          const question = questions[index];
          if (!question) return null;

          return {
            question_id: question.question_id,
            answer_text: answers[index] || ""
          };
        })
        .filter(Boolean);

      // 🔹 Submit
      await submitSession(sessionId, {
        answers: formattedAnswers
      });

      console.log("✅ Answers submitted");

      // 🔹 Redirect to loading page
      navigate("/interview/evaluating");

      // 🔹 Evaluate
      const evalResponse = await evaluateSession(sessionId);

      const evaluationData = evalResponse.data.evaluation;
      setEvaluation(evaluationData)

      console.log("✅ Evaluation done");

      // 🔹 Redirect to results
      navigate("/interview/results", {
        state: { evaluation: evaluationData }
      });

    } catch (error) {
      console.error("❌ Flow failed", error);
      setError("Something went wrong");
    } finally {
      setEvaluating(false);
    }
  };

  /*
  ============================
  Finish Interview
  ============================
  */
  const finishInterview = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      setStatus("FINISHED");

      await submitAndEvaluate(); // 🔥 full pipeline

    } catch (err) {
      console.error(err);
    }
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
        allAnswered,
        evaluating
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