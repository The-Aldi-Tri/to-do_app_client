import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteConfirmationDialog = ({
  state,
  handleClose,
  handleDelete,
  dialogData,
}) => {
  return (
    <Dialog open={state} onClose={handleClose} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle>{dialogData.title}</DialogTitle>
      <DialogContent>{dialogData.content}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
