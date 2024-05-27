import { React, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [trigger, setTrigger] = useState(false);
  const toggleTrigger = () => setTrigger((prevTrigger) => !prevTrigger);

  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: "25px",
      }}
    >
      <TaskForm toggleTrigger={toggleTrigger} />
      <TaskTable trigger={trigger} toggleTrigger={toggleTrigger} />
    </div>
  );
};

export default Home;
