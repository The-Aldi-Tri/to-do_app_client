import { React, useState } from "react";
import { Paper, Box, Stack, Button, ButtonGroup } from "@mui/material";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginSignUp = () => {
  const [selected, setSelected] = useState("login");

  const handleSelect = (value) => setSelected(value);

  return (
    <div className="login-signup-container">
      <Box
        maxWidth={"sm"}
        sx={{ margin: "auto", mt: "25px", p: "10px" }}
        component={Paper}
        elevation={5}
      >
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <ButtonGroup>
            <Button
              variant={selected === "login" ? "contained" : "outlined"}
              onClick={() => handleSelect("login")}
            >
              Log in
            </Button>
            <Button
              variant={selected === "signup" ? "contained" : "outlined"}
              onClick={() => handleSelect("signup")}
            >
              Sign up
            </Button>
          </ButtonGroup>
          {selected === "login" ? (
            <Login handleSelect={handleSelect} />
          ) : (
            <Signup handleSelect={handleSelect} />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default LoginSignUp;
