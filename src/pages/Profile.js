import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editProfileSchema, changePasswordSchema } from "../utils/Schema";
import axiosCustom from "../utils/axiosCustom";
import queryString from "query-string";

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    createdAt: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosCustom.get(
          "http://localhost:3001/api/user/"
        );
        setInitialValues({
          username: response.data.data.username,
          email: response.data.data.email,
          createdAt: response.data.data.createdAt,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: editProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Set submitting state to true to indicate form submission is in progress
      setSubmitting(true);

      // Check if there are any changes to the form data
      if (!formik.dirty) {
        window.alert("Successfully updated");
        setSubmitting(false);
        return;
      }

      try {
        // Convert data object to URL-encoded format
        const formData = queryString.stringify({
          username: values.username,
          email: values.email,
        });

        // Send form data to the backend using Axios
        await axiosCustom.put("http://localhost:3001/api/user/", formData);

        // Log the response from the backend
        // console.log(response.data);

        window.alert("Successfully updated");
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const formik2 = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Set submitting state to true to indicate form submission is in progress
        setSubmitting(true);

        // Convert data object to URL-encoded format
        const formData = queryString.stringify(values);

        // Send form data to the backend using Axios
        await axiosCustom.put(
          "http://localhost:3001/api/auth/change-password",
          formData
        );

        // Log the response from the backend
        // console.log(response.data);
        window.alert("Successfully changed password");
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

  const handleDeleteAccount = async () => {
    try {
      await axiosCustom.delete("http://localhost:3001/api/user/");

      window.alert("Successfully deleted account");
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
    <Container
      maxWidth="sm"
      sx={{ margin: "auto", mt: "25px", p: "10px" }}
      component={Paper}
      elevation={5}
    >
      <Box
        sx={{
          margin: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          /*noValidate*/
        >
          <TextField
            id="createdAt"
            label="Created At"
            name="createdAt"
            fullWidth
            value={formik.values.createdAt}
            disabled
            margin="normal"
          />
          <TextField
            id="username"
            label="Username"
            name="username"
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
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            sx={{ marginTop: "8px" }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Typography sx={{ fontStyle: "italic", marginLeft: "3px" }}>
                  *Update to save your changes
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="warning"
              onClick={handleOpenDialog}
            >
              Change Password
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteConfirmation}
            >
              Delete Account
            </Button>
          </Stack>
        </form>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth={"sm"}
          fullWidth={true}
          PaperProps={{
            component: "form",
            onSubmit: formik2.handleSubmit,
          }}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <TextField
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formik2.values.currentPassword}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              error={
                formik2.touched.currentPassword &&
                Boolean(formik2.errors.currentPassword)
              }
              helperText={
                formik2.touched.currentPassword &&
                formik2.errors.currentPassword
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
            <TextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formik2.values.newPassword}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              error={
                formik2.touched.newPassword &&
                Boolean(formik2.errors.newPassword)
              }
              helperText={
                formik2.touched.newPassword && formik2.errors.newPassword
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
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button variant="contained" color="warning" type="submit">
              Change
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteConfirmation}
          onClose={handleCloseDeleteConfirmation}
          maxWidth={"sm"}
          fullWidth={true}
        >
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseDeleteConfirmation}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ProfilePage;
