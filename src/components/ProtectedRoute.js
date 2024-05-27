import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "75vh", // Full viewport height
  };

  const textStyle = {
    marginTop: "20px",
    fontSize: "1.5rem",
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <CircularProgress style={{ color: "#61dafb" }} />
        <div style={textStyle}>Loading . . .</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login-signup" />;
};

export default ProtectedRoute;
