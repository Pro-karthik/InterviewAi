import axios from "./axios";

export const fetchDashboardReport = () => axios.get("/analytics/report");