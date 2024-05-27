import { useFormik } from "formik";
import queryString from "query-string";
import { React } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { taskSchema } from "../utils/Schema";
import axiosCustom from "../utils/axiosCustom";

const Form = ({ toggleTrigger }) => {
  const formik = useFormik({
    initialValues: {
      task: "",
      details: "",
      finished: false,
    },
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Set submitting state to true to indicate form submission is in progress
        setSubmitting(true);

        // Convert data object to URL-encoded format
        const formData = queryString.stringify(values);

        // Send form data to the backend using Axios
        await axiosCustom.post(
          "http://localhost:3001/api/task/create-task",
          formData
        );

        // Log the response from the backend
        // console.log(response.data);

        toggleTrigger();
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
    <Container
      maxWidth="sm"
      component={Paper}
      elevation={5}
      sx={{ marginTop: "25px", maxHeight: "450px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "25px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          To-do List
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          /*noValidate*/
        >
          <TextField
            id="task"
            label="Task"
            name="task"
            required
            value={formik.values.task}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            id="details"
            label="Details"
            name="details"
            multiline
            rows={4}
            error={formik.touched.details && Boolean(formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.finished}
                onChange={formik.handleChange}
                color="primary"
                id="finished"
                name="finished"
              />
            }
            label="Mark finished"
            sx={{ marginTop: "8px", marginBottom: "8px" }}
          />
          <Button
            startIcon={<AddCircleOutlineIcon />}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: "8px", marginBottom: "8px" }}
          >
            Add New Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
