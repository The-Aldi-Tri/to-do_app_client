import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return isAuthenticated ? children : <Navigate to="/login-signup" />;
};

export default ProtectedRoute;
