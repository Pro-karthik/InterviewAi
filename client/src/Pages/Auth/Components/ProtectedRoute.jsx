import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { accessToken, loading } = useAuth();
  console.log("ProtectedRoute - accessToken:", accessToken, "loading:", loading);

  // wait for auth initialization
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;