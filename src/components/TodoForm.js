import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const TodoForm = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        //border: "1px solid",
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: "8px" }}>
        Add New Task
      </Typography>
      <TextField
        label="Task"
        variant="outlined"
        placeholder="Enter task here"
        fullWidth
        sx={{ marginBottom: "8px", maxWidth: "600px" }}
      />
      <TextField
        label="Task Description"
        variant="outlined"
        multiline
        rows={4}
        placeholder="Enter description here"
        fullWidth
        sx={{ marginBottom: "8px", maxWidth: "600px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginBottom: "8px", maxWidth: "600px" }}
      >
        Add New Task
      </Button>
    </Container>
  );
};

export default TodoForm;
