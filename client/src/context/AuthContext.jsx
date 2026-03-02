import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { refreshAccessToken, getProfile } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Attach token automatically
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // 🚀 Initialize auth once
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const refreshRes = await refreshAccessToken();
        const newAccessToken = refreshRes?.data?.accessToken;

        if (!newAccessToken) throw new Error("No access token");

        if (!isMounted) return;

        setAccessToken(newAccessToken);

        const profileRes = await getProfile();
        if (!isMounted) return;

        setUser(profileRes.data);   // ✅ correct
      } catch (err) {
        if (isMounted) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        setAccessToken,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);