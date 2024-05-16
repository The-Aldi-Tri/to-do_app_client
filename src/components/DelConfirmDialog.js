import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Cancel, DeleteForever } from "@mui/icons-material";

const DelConfirmDialog = ({
  isDialogOpen,
  selectedRow,
  handleCloseDialog,
  handleDeleteButton,
}) => {
  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>{"Are you sure you want to delete this task?"}</DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseDialog}
          startIcon={<Cancel />}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteButton(selectedRow.id);
            handleCloseDialog();
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
