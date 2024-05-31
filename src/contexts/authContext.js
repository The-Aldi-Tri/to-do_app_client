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
        await axiosCustom.get("/auths/is-valid");
        setLogin();
      } catch (error) {
        try {
          await axiosCustom.get("/auths/refresh");
          setLogin();
        } catch (error) {
          setLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]); // Runs on mount and every time navigate value changed

  useEffect(() => {
    let refreshInterval;

    const refreshToken = async () => {
      try {
        await axiosCustom.get("/auths/refresh");
        setLogin();
      } catch (error) {
        setLogout();
      }
    };

    // Start interval to refresh token if authenticated
    if (isAuthenticated) {
      console.log("Refresh interval started: ", new Date());
      refreshInterval = setInterval(() => {
        console.log("Refreshing :", new Date());
        refreshToken();
      }, 14.5 * 60 * 1000); // 14.5 minutes(1/2 minute before token expire to ensure)
    }

    // Clear interval when isAuthenticated becomes false or component unmounts
    return () => {
      console.log("Refresh interval cleared :", new Date());
      clearInterval(refreshInterval);
    };
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
