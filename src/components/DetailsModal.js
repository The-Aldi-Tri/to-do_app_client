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
    maxWidth: 600,
    minHeight: 200,
    maxHeight: 400,
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Paper sx={modalSx}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "justify",
            p: "3px",
            borderBottom: "1px solid",
          }}
        >
          {selectedRow.task ? selectedRow.task : ""}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            textAlign: "justify",
            p: "3px",
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
