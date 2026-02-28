import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchDashboardReport } from "../api/reports.api";
import { normalizeReport } from "../utils/normalizeReport";

export const useDashboardReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReport = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboardReport();
      const normalized = normalizeReport(result.data);

      setData(normalized);

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load dashboard";

      toast.error(message, {
  className: "bg-red-600 text-white rounded-lg shadow-lg",
  progressClassName: "bg-red-300"
});

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  return { data, loading, refetch: loadReport };
};