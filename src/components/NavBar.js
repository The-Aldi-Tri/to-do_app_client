import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../contexts/authContext";
import axiosCustom from "../utils/axiosCustom";

export default function NavBar() {
  const { isAuthenticated, setLogout } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Perform logout logic (e.g., clear authentication token)
      await axiosCustom.delete("http://localhost:3001/api/auth/logout");
      setLogout();
      navigate("/login-signup");
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        window.alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkblue" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
          to="/"
        >
          To-do App
        </Typography>
        {isAuthenticated ? (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountCircleIcon />}
              href="/profile"
              sx={{ marginRight: "5px" }}
            >
              Profile
            </Button>
            <Button color="error" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button href="/login-signup" color="primary" variant="contained">
            Login/Sign up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
