import * as React from "react";
// import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "darkblue" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-do App
          </Typography>
          <Button href="/login-signup" variant="contained" color="primary">
            Login/Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
