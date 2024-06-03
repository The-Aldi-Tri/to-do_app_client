import { useFormik } from "formik";
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
import { toast } from "react-toastify";
import { taskSchema } from "../utils/Schema";
import axiosCustom from "../utils/axiosCustom";

const TaskForm = ({ toggleTrigger }) => {
  const formik = useFormik({
    initialValues: {
      task: "",
      details: "",
      finished: false,
    },
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        await axiosCustom.post("/tasks/", values);

        resetForm(); // Reset form values to initial state

        toast.success("Task added successfully!");

        toggleTrigger();
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
            disabled={formik.isSubmitting}
            sx={{ marginTop: "8px", marginBottom: "8px" }}
          >
            {formik.isSubmitting ? "Adding..." : "Add New Task"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TaskForm;
