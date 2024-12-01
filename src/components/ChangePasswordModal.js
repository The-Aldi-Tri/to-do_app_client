import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { changePasswordSchema } from "../utils/Schema";
import axiosCustom from "../utils/axiosCustom";

const ChangePasswordModal = ({ state, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formikChangePassword = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await axiosCustom.put("/auths/change-password", values);

        resetForm(); // Reset form values to initial state

        toast.success("Password changed successfully");

        handleClose();
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

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth={true}
      PaperProps={{
        component: "form",
        onSubmit: formikChangePassword.handleSubmit,
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
          value={formikChangePassword.values.current_password}
          onChange={formikChangePassword.handleChange}
          onBlur={formikChangePassword.handleBlur}
          error={
            formikChangePassword.touched.current_password &&
            Boolean(formikChangePassword.errors.current_password)
          }
          helperText={
            formikChangePassword.touched.current_password &&
            formikChangePassword.errors.current_password
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
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
          value={formikChangePassword.values.new_password}
          onChange={formikChangePassword.handleChange}
          onBlur={formikChangePassword.handleBlur}
          error={
            formikChangePassword.touched.new_password &&
            Boolean(formikChangePassword.errors.new_password)
          }
          helperText={
            formikChangePassword.touched.new_password &&
            formikChangePassword.errors.new_password
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
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
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          disabled={formikChangePassword.isSubmitting}
        >
          {formikChangePassword.isSubmitting ? "Changing..." : "Change"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
