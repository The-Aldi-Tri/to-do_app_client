import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosCustom from "../utils/axiosCustom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const setLogin = () => {
    setIsAuthenticated(true);
  };

  const setLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosCustom.get("http://localhost:3001/api/auth/is-valid");
        setLogin();
      } catch (error) {
        setLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]); // Runs on mount and every time navigate value changed

  useEffect(() => {
    let interval;

    const refreshToken = async () => {
      try {
        await axiosCustom.get("http://localhost:3001/api/auth/refresh");
        setLogin();
      } catch (error) {
        setLogout();
      }
    };

    // Start interval to refresh token if authenticated
    if (isAuthenticated) {
      interval = setInterval(() => {
        refreshToken();
      }, 15 * 60 * 1000); // 15 minutes
    }

    // Clear interval when isAuthenticated becomes false or component unmounts
    return () => clearInterval(interval);
  }, [isAuthenticated]); // Depends on isAuthenticated state

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setLogin, setLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
