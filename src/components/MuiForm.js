import React, { useState } from "react";
import {
  Container,
  FormControl,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import createData from "../utils/createData";

const Form = ({ sharedData, handleSharedData }) => {
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateRequired = (data) => {
    return data.trim() !== "" ? true : false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      if (!validateRequired(task))
        throw new Error("Task Field cannot be empty");

      const newData = createData(task, details);
      await handleSharedData([newData, ...sharedData]);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" component="form" onSubmit={handleSubmit}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            margin: "20px 0 10px 0",
          }}
        >
          To-do List
        </Typography>
        <FormControl fullWidth={true} sx={{ alignItems: "center" }}>
          <TextField
            label="Task"
            variant="outlined"
            required={true}
            value={task}
            error={isError}
            helperText={isError ? "Can not be empty" : ""}
            onBlur={() =>
              validateRequired(task) ? setIsError(false) : setIsError(true)
            }
            onChange={(e) => {
              validateRequired(e.target.value)
                ? setIsError(false)
                : setIsError(true);
              setTask(e.target.value);
            }}
            sx={{ width: "75%", margin: "10px 0" }}
          />
          <TextField
            label="Details"
            variant="outlined"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            sx={{ width: "75%", margin: "10px 0" }}
          />
        </FormControl>
        <LoadingButton
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          type="submit"
          loading={isLoading}
          sx={{ width: "50%", margin: "10px 0 20px 0" }}
        >
          <span>Add New Task</span>
        </LoadingButton>
      </Paper>
    </Container>
  );
};

export default Form;
