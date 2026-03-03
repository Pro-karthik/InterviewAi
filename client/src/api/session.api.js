import axios from "./axios";

// Create Interview Session
export const createSession = (data) =>
  axios.post("/session/create", data);

// (Optional – future ready)
export const getSession = (id) =>
  axios.get(`/session/${id}`);

export const deleteSession = (id) =>
  axios.delete(`/session/${id}`);