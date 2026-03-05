import axios from "./axios";

export const sentViolation = (id,data) => axios.post(`/proctoring/session/${id}/violation`,data)