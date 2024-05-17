import React, { useState } from "react";
import "./App.css";
import MuiTable from "../components/MuiTable";
import MuiForm from "../components/MuiForm";
import createData from "../utils/createData";

const dummy = [
  createData(
    "Task 1",
    "lorem ipsum dolor sit amet",
    new Date("2024-05-15T09:00:00")
  ),
  createData("Task 2", "A short description", new Date("2024-05-16T10:30:00")),
  createData(
    "Task 3",
    "A longer description for Task 3",
    new Date("2024-05-17T13:45:00")
  ),
  createData("Task 4", "", new Date("2024-05-18T15:15:00")),
  createData(
    "Task 5",
    "Another short description",
    new Date("2024-05-19T17:00:00")
  ),
  createData("Task 6", "Description 6", new Date("2024-05-20T08:00:00")),
];

const App = () => {
  const [sharedData, setSharedData] = useState(dummy);

  const handleSharedData = (newValue) => {
    setSharedData(newValue);
  };

  return (
    <div className="container">
      <br />
      <MuiForm sharedData={sharedData} handleSharedData={handleSharedData} />
      <br />
      <MuiTable sharedData={sharedData} handleSharedData={handleSharedData} />
      <br />
    </div>
  );
};

export default App;
