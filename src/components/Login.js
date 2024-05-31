import { useFormik } from "formik";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginSchema } from "../utils/Schema";
import { useAuth } from "../contexts/authContext";
import axiosCustom from "../utils/axiosCustom";

const Login = ({ handleSelect }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setLogin } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email_or_username: "",
      password: "",
      remember_me: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Set submitting state to true to indicate form submission is in progress
        setSubmitting(true);

        // Send form data to the backend using Axios
        const response = await axiosCustom.post("/auths/login", values);

        // Log the response from the backend
        console.log(response.data);

        // Set login state to true to indicate user is logged in
        setLogin();

        // Redirect user to the home page
        navigate("/");
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
          Log in
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          /*noValidate*/
        >
          <TextField
            id="email_or_username"
            label="Email or Username"
            name="email_or_username"
            autoComplete="username"
            required
            fullWidth
            value={formik.values.email_or_username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email_or_username &&
              Boolean(formik.errors.email_or_username)
            }
            helperText={
              formik.touched.email_or_username &&
              formik.errors.email_or_username
            }
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.remember_me}
                onChange={formik.handleChange}
                color="primary"
              />
            }
            id="remember_me"
            name="remember_me"
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => handleSelect("signup")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
