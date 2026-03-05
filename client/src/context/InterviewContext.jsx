import { createContext, useContext, useState, useEffect } from "react";

const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Restore state on refresh
  useEffect(() => {
    const stored = localStorage.getItem("interview_state");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSkills(parsed.skills);
      setExperience(parsed.experience);
      setSessionId(parsed.sessionId);
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      "interview_state",
      JSON.stringify({ skills, experience, sessionId })
    );
  }, [skills, experience, sessionId]);

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