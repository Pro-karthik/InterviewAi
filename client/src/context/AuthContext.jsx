import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { refreshAccessToken } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Attach token automatically
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.Authorization;
    }
  }, [accessToken]);

  // Silent refresh on app load
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const { data } = await refreshAccessToken();
        setAccessToken(data.accessToken);
      } catch (err) {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    tryRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);