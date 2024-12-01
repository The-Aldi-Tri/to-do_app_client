import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axiosCustom from "../utils/axiosCustom";
import { editProfileSchema } from "../utils/Schema";
import { useAuth } from "../contexts/authContext";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import ChangePasswordModal from "../components/ChangePasswordModal";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { setLogout } = useAuth();
  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    createdAt: "",
  });
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);

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
        //console.error("Error retrieving user data:", error);
        toast.error("Could not retrieve user data");
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

      try {
        // Remove createdAt property
        delete values.createdAt;

        await axiosCustom.put("/users/", values);

        setInitialValues(values);

        toast.success("Profile updated Successfully");
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
      } finally {
        // Whether the submission was successful or not, always set submitting state back to false
        setSubmitting(false);
      }
    },
  });

  const handleOpenChangePasswordDialog = () =>
    setOpenChangePasswordDialog(true);
  const handleCloseChangePasswordDialog = () =>
    setOpenChangePasswordDialog(false);

  const handleOpenDeleteConfirmationDialog = () =>
    setOpenDeleteConfirmationDialog(true);
  const handleCloseDeleteConfirmationDialog = () =>
    setOpenDeleteConfirmationDialog(false);

  const handleDeleteAccount = async () => {
    try {
      await axiosCustom.delete("/users/");

      toast.success("Account deleted successfully");

      await axiosCustom.delete("/auths/logout");

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
            InputLabelProps={{ shrink: true }}
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

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ marginTop: "8px" }}
          >
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                disabled={!formik.dirty} // This button only active when there is change
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Typography sx={{ fontStyle: "italic", marginLeft: "3px" }}>
                *Update to save your changes
              </Typography>
            </Grid>
          </Grid>

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            sx={{ marginTop: "8px" }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={handleOpenChangePasswordDialog}
            >
              Change Password
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteConfirmationDialog}
            >
              Delete Account
            </Button>
          </Stack>
        </form>
      </Box>
      <ChangePasswordModal
        state={openChangePasswordDialog}
        handleClose={handleCloseChangePasswordDialog}
      />
      <DeleteConfirmationDialog
        state={openDeleteConfirmationDialog}
        handleClose={handleCloseDeleteConfirmationDialog}
        handleDelete={handleDeleteAccount}
        dialogData={{
          title: "Delete Account",
          content:
            "Are you sure you want to delete your account? This action cannot be undone.",
        }}
      />
    </Container>
  );
};

export default ProfilePage;
