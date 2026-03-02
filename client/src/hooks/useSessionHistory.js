// src/hooks/useSessionHistory.js
import { useEffect, useState } from "react";
import { fetchSessionHistory, fetchSessionHistoryById } from "../api/history.api";

/* -----------------------------
   1️⃣ Fetch All Sessions
------------------------------ */
export const useSessionHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetchSessionHistory();
      setSessions(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return { sessions, loading, error, refetch: fetchSessions };
};


/* -----------------------------
   2️⃣ Fetch Single Session
------------------------------ */
export const useSessionDetails = (sessionId) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSession = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const res = await fetchSessionHistoryById(sessionId);
      setSession(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch session");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  return { session, loading, error, refetch: fetchSession };
};