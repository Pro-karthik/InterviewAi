import { data } from "react-router-dom";
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

export const submitSession = (sessionId,data) => 
  axios.post(`/session/${sessionId}/submit`,data)

export const evaluateSession = (sessionId) => 
  axios.post(`/session/${sessionId}/evaluate`)