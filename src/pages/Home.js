import { React, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiTable from "../components/MuiTable";
import MuiForm from "../components/MuiForm";

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
      <MuiForm toggleTrigger={toggleTrigger} />
      <MuiTable trigger={trigger} toggleTrigger={toggleTrigger} />
    </div>
  );
};

export default Home;
