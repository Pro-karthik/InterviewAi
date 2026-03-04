import axios from "./axios";

// Create Interview Session
export const validateSkills = (data) =>
  axios.post("/session/validate", data);


export const deleteSession = (id) =>
  axios.delete(`/session/${id}`);

export const getSession =  (sessionId) => 
   axios.get(`/interview/${sessionId}`);

export const beginInterview = (sessionId) => 
  axios.post(`/interview/${sessionId}/begin`);
 