import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { refreshAccessToken, getProfile } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Attach token automatically to axios
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // 🚀 Initialize authentication (Single clean effect)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1️⃣ Refresh token
        const refreshRes = await refreshAccessToken();

        const newAccessToken = refreshRes?.data?.accessToken;
        if (!newAccessToken) throw new Error("No access token returned");

        setAccessToken(newAccessToken);

        // 2️⃣ Fetch user profile
        const profileRes = await getProfile();
        setUser(profileRes?.data?.user || null);

      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
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