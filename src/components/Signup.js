import { useFormik } from "formik";
import { React, useState, useEffect } from "react";
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
  const [errorDuplicate, setErrorDuplicate] = useState({
    username: "Initial error",
    email: "Please add TLD (.com, .co.id, etc)",
  });
  const [countdown, setCountdown] = useState(() => {
    // Check if countdown value exists in localStorage
    const savedCountdown = localStorage.getItem("countdown");
    return savedCountdown ? parseInt(savedCountdown) : 0; // Default to 0 if not found
  });

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId); // Clean up the timer on component unmount or countdown change
    }
  }, [countdown]);

  useEffect(() => {
    // Save countdown value to localStorage whenever it changes
    localStorage.setItem("countdown", countdown.toString());
  }, [countdown]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      verification_code: "",
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

  const checkAvailable = async (fieldName, value) => {
    if (!formik.errors[fieldName]) {
      try {
        await axiosCustom.post("/users/check-available", {
          value: value,
        });

        // formik.setFieldError(fieldName, undefined);
        setErrorDuplicate((prevState) => ({
          ...prevState,
          [fieldName]: "",
        }));
      } catch (error) {
        if (error.response.status === 409) {
          // formik.setFieldError(
          //   fieldName,
          //   error.response.data.message.replace("Email or Username", fieldName)
          // );
          setErrorDuplicate((prevState) => ({
            ...prevState,
            [fieldName]: error.response.data.message.replace(
              "Email or Username",
              fieldName
            ),
          }));
        }
      }
    }
  };

  const sendVerificationCode = async () => {
    const sendVerificationCodeOperation = async () => {
      try {
        await axiosCustom.post("/users/send-verification-code", {
          email: formik.values.email,
        });
      } catch (error) {
        setCountdown(0);
      }
    };
    toast.promise(sendVerificationCodeOperation(), {
      pending: `Sending verification code to ${formik.values.email}`,
      success: `Verification code sent to ${formik.values.email}`,
      error: `Error sending verification code to ${formik.values.email}`,
    });
  };

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
            onBlur={(e) => {
              formik.handleBlur(e);
              checkAvailable("username", e.currentTarget.value);
            }}
            error={
              formik.touched.username &&
              (Boolean(formik.errors.username) ||
                Boolean(errorDuplicate.username))
            }
            helperText={
              formik.touched.username &&
              (formik.errors.username || errorDuplicate.username)
            }
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
            onBlur={(e) => {
              formik.handleBlur(e);
              checkAvailable("email", e.currentTarget.value);
            }}
            error={
              formik.touched.email &&
              (Boolean(formik.errors.email) || Boolean(errorDuplicate.email))
            }
            helperText={
              formik.touched.email &&
              (formik.errors.email || errorDuplicate.email)
            }
            margin="normal"
          />
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !formik.touched.email ||
                  Boolean(formik.errors.email) ||
                  errorDuplicate.email ||
                  countdown > 0
                }
                onClick={() => {
                  sendVerificationCode();
                  setCountdown(60);
                }}
              >
                {countdown > 0 ? `${countdown} s` : "Send"}
              </Button>
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="verification_code"
                name="verification_code"
                label="Verification code"
                required
                fullWidth
                disabled={
                  !formik.touched.email ||
                  Boolean(formik.errors.email) ||
                  errorDuplicate.email
                }
                value={formik.values.verification_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.verification_code &&
                  Boolean(formik.errors.verification_code)
                }
                helperText={
                  formik.touched.verification_code &&
                  formik.errors.verification_code
                }
                margin="normal"
              />
            </Grid>
          </Grid>
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
