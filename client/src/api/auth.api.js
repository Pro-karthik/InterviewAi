import axios from "./axios";

export const loginUser = (data) =>
  axios.post("/users/login", data);

export const registerUser = (data) =>
  axios.post("/users/register", data);

export const refreshAccessToken = () =>
  axios.post("/users/refresh");

export const logoutUser = () =>
  axios.post("/users/logout");

export const logout = () =>
  axios.post('/users/logout');