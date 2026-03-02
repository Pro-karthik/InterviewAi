import axios from "./axios";

export const fetchSessionHistory = () => axios.get("/session/history");
export const fetchSessionHistoryById = (id) => axios.get(`/session/history/${id}`);