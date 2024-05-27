import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Cancel, DeleteForever } from "@mui/icons-material";

const DelConfirmDialog = ({
  isOpen,
  data,
  handleClose,
  handleDeleteButton,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{"Are you sure you want to delete this task?"}</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          startIcon={<Cancel />}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteButton(data._id);
            handleClose();
          }}
          startIcon={<DeleteForever />}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DelConfirmDialog;
