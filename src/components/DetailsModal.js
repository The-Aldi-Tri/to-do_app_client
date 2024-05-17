import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Close } from "@mui/icons-material";

const DetailsModal = ({ isModalOpen, selectedRow, handleCloseModal }) => {
  const modalSx = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    p: 1,
    minWidth: 300,
    minHeight: 200,
    "@media screen and (min-width: 768px)": {
      minWidth: 600,
      minHeight: 400,
    },
    border: "1px solid black",
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Paper sx={modalSx}>
        <Typography>Task: </Typography>
        <Typography
          sx={{
            alignContent: "center",
            minHeight: 50,
            "@media screen and (min-width: 768px)": {
              minHeight: 100,
            },
            border: "1px solid",
            marginBottom: "10px",
            padding: "3px",
          }}
        >
          {selectedRow.task ? selectedRow.task : ""}
        </Typography>
        <Typography>Details: </Typography>
        <Typography
          sx={{
            minHeight: 100,
            "@media screen and (min-width: 768px)": {
              minHeight: 300,
            },
            padding: "3px",
            border: "1px solid",
            marginBottom: "10px",
            whiteSpace: "break-spaces",
          }}
        >
          {selectedRow.details ? selectedRow.details : ""}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseModal}
          sx={{ marginTop: "auto", p: "3px" }}
          startIcon={<Close />}
        >
          CLOSE
        </Button>
      </Paper>
    </Modal>
  );
};

export default DetailsModal;
