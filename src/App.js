import React, { useState } from "react";
import { Container } from "@mui/material";
import "./App.css";
import MuiTable from "./components/MuiTable";
import MuiForm from "./components/MuiForm";
import createData from "./utils/createData";

const dummy = [
  createData(
    "Task 1",
    "lorem ipsum dolor sit amet",
    new Date("2024-05-15T09:00:00")
  ), // Empty description
  createData("Task 2", "A short description", new Date("2024-05-16T10:30:00")), // Short description
];

const App = () => {
  const [sharedData, setSharedData] = useState(dummy);

  const handleSharedData = (newValue) => {
    setSharedData(newValue);
  };

  return (
    <Container maxWidth="md">
      <br />
      <MuiForm sharedData={sharedData} handleSharedData={handleSharedData} />
      <br />
      <MuiTable sharedData={sharedData} handleSharedData={handleSharedData} />
      <br />
    </Container>
  );
};

export default App;
