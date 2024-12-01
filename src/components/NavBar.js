import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext";
import axiosCustom from "../utils/axiosCustom";

const NavBar = () => {
  const { isAuthenticated, setLogout } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Perform logout logic (e.g., clear authentication token)
      await axiosCustom.delete("/auths/logout");

      toast.success("Logout Successful");

      setLogout();

      navigate("/login-signup");
    } catch (error) {
      if (error.response) {
        // The request was made but the server responded with a non-2xx status code
        toast.warning(error.response.data.message);
      } else {
        toast.error("Something wrong. Please try again later");
        /*error.request
          ? console.error("No response received:", error.request) // The request was made but no response was received
          : console.error("Error setting up the request:", error.message); // Something else happened while setting up the request*/
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
              onClick={() => navigate("/profile")}
              sx={{ marginRight: "5px" }}
            >
              Profile
            </Button>
            <Button color="error" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/login-signup")}
          >
            Login/Sign up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
