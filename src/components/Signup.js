import { useFormik } from "formik";
import { React, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { registerSchema } from "../utils/Schema";
import axiosCustom from "../utils/axiosCustom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Signup = ({ handleSelect }) => {
  const navigate = useNavigate();
  const { setLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        // Register (create user)
        await axiosCustom.post("/users/", values);

        toast.success("Register Successful");
        try {
          // Login
          await axiosCustom.post("/auths/login", {
            email_or_username: values.username,
            password: values.password,
            remember_me: false,
          });

          toast.success("Login Successful");

          // Set login state to true to indicate user is logged in
          setLogin();

          // Redirect user to the home page
          navigate("/");
        } catch (errorLogin) {
          if (errorLogin.response) {
            // The request was made but the server responded with a non-2xx status code
            toast.warning(errorLogin.response.data.message);
          } else {
            toast.error("Something wrong. Please try again later");
            /*error.request
              ? console.error("No response received:", error.request) // The request was made but no response was received
              : console.error("Error setting up the request:", error.message); // Something else happened while setting up the request*/
          }
        }
      } catch (errorRegister) {
        if (errorRegister.response) {
          // The request was made but the server responded with a non-2xx status code
          toast.warning(errorRegister.response.data.message);
        } else {
          toast.error("Something wrong. Please try again later");
          /*error.request
            ? console.error("No response received:", error.request) // The request was made but no response was received
            : console.error("Error setting up the request:", error.message); // Something else happened while setting up the request*/
        }
      } finally {
        // Whether the submission was successful or not, always set submitting state back to false
        setSubmitting(false);
      }
    },
  });

  return (
    <Container>
      <Box
        sx={{
          margin: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit} /*noValidate*/>
          <TextField
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            required
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            required
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
          />
          <TextField
            id="confirm_password"
            label="Confirm Password"
            name="confirm_password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            fullWidth
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => handleSelect("login")}
              >
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
