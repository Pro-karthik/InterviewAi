import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { refreshAccessToken, getProfile, logout as logoutApi } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Safe token setter (clears header properly)
  const setAccessToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    setAccessTokenState(token);
  };

  // 🚀 Initialize auth once
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const refreshRes = await refreshAccessToken();
        const newAccessToken = refreshRes?.data?.accessToken;

        if (!newAccessToken) throw new Error("No token");

        if (!isMounted) return;

        setAccessToken(newAccessToken);

        const profileRes = await getProfile();
        if (!isMounted) return;

        setUser(profileRes.data);
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

  // 🔴 Proper logout
  const logout = async () => {
    try {
      await logoutApi(); // clears refresh cookie in backend
    } catch (err) {}

    setAccessToken(null);   // clears axios header
    setUser(null);          // clears user
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        setAccessToken,
        setUser,
        loading,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);