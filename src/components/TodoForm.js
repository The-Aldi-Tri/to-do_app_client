import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

const TodoForm = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        label="Task Title"
        variant="outlined"
        fullWidth
        placeholder="Enter title here"
        sx={{ marginBottom: "8px" }}
      />
      <TextField
        label="Task Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        placeholder="Enter description here"
        sx={{ marginBottom: "8px" }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginBottom: "8px" }}
      >
        Add New Task
      </Button>
    </Container>
  );
};

export default TodoForm;
