import axios from "./axios";

// Create Interview Session
export const validateSkills = (data) =>
  axios.post("/session/validate", data);


export const deleteSession = (id) =>
  axios.delete(`/session/${id}`);

export const createSession = (data) =>
  axios.post("/session/interview/start", data);

export const getSession =  (sessionId) => 
   axios.get(`/session/${sessionId}/details`);

export const beginSession = (sessionId) => 
  axios.post(`/session/${sessionId}/begin`);
 
export const heartbeat = (sessionId) =>
  axios.post(`/proctoring/session/${sessionId}/heartbeat`);