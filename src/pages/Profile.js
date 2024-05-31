import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosCustom from "../utils/axiosCustom";
import { editProfileSchema, changePasswordSchema } from "../utils/Schema";

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosCustom.get("/users/");
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

  // Formik for update profile
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
        delete values.createdAt;
        // Send form data to the backend using Axios
        await axiosCustom.put("/users/", values);

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

  // Formik for change password
  const formik2 = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Set submitting state to true to indicate form submission is in progress
        setSubmitting(true);

        // Send form data to the backend using Axios
        await axiosCustom.put("/auths/change-password", values);

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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenDeleteConfirmation = () => setOpenDeleteConfirmation(true);
  const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

  const handleDeleteAccount = async () => {
    try {
      await axiosCustom.delete("/users/");

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
              id="current_password"
              name="current_password"
              label="Current Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formik2.values.current_password}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              error={
                formik2.touched.current_password &&
                Boolean(formik2.errors.current_password)
              }
              helperText={
                formik2.touched.current_password &&
                formik2.errors.current_password
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
              id="new_password"
              name="new_password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formik2.values.new_password}
              onChange={formik2.handleChange}
              onBlur={formik2.handleBlur}
              error={
                formik2.touched.new_password &&
                Boolean(formik2.errors.new_password)
              }
              helperText={
                formik2.touched.new_password && formik2.errors.new_password
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
