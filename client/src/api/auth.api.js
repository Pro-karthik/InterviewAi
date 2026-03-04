import axios from "./axios";

export const loginUser = (data) =>
  axios.post("/users/login", data);

export const registerUser = (data) =>
  axios.post("/users/register", data);

export const refreshAccessToken = () =>
  axios.post("/users/refresh");

export const logoutUser = () =>
  axios.post("/users/logout");

export const getProfile = async () => {
  return axios.get("/users/profile");
};

export const forgotPassword = (data) =>{
  return axios.post("/users/forgot",data);
}

export const ResetPassword =(data) =>{
  axios.post("/users/resetpassword",data);
}
export const verifyOtp = async (data) => {
  const response = await axios.post("/users/verifyotp", data);
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await axios.post("/users/resend-otp", data);
  return response.data;
};

export const logout = () =>
  axios.post('/users/logout');