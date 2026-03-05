import { createContext, useContext, useState, useEffect } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Restore state on refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("interview_state");
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log("Restoring state from localStorage:", parsed);
          setSkills(parsed.skills || []);
          setExperience(parsed.experience || null);
          setSessionId(parsed.sessionId || null);
        }
      } catch (err) {
        console.error("Failed to parse interview_state:", err);
      }
      setInitialized(true);
    }
  }, []);

  // Persist state only after initialization
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(
        "interview_state",
        JSON.stringify({ skills, experience, sessionId })
      );
    }
  }, [skills, experience, sessionId, initialized]);

  return (
    <InterviewContext.Provider
      value={{
        skills,
        experience,
        sessionId,
        setSkills,
        setExperience,
        setSessionId,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);