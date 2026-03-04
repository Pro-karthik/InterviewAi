import { createContext, useContext, useState, useEffect } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [skill, setSkill] = useState(null);
  const [experience, setExperience] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Restore state on refresh
  useEffect(() => {
    const stored = localStorage.getItem("interview_state");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSkill(parsed.skill);
      setExperience(parsed.experience);
      setSessionId(parsed.sessionId);
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      "interview_state",
      JSON.stringify({ skill, experience, sessionId })
    );
  }, [skill, experience, sessionId]);

  return (
    <InterviewContext.Provider
      value={{
        skill,
        experience,
        sessionId,
        setSkill,
        setExperience,
        setSessionId,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => useContext(InterviewContext);