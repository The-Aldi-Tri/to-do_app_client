import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import {
  Delete,
  CheckBox,
  Info,
  CheckBoxOutlineBlank,
  Close,
  Cancel,
  DeleteForever,
} from "@mui/icons-material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";

import rows from "./DummyData"; // Import Dummy Data

export default function MuiTable() {
  // For Table Component
  const [data, setData] = useState(rows);

  const handleFinishButton = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, finished: !item.finished };
        }
        return item;
      })
    );
  };

  const handleDeleteButton = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // For Table Pagination Component
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // For Modal Component
  const [selectedRow, setSelectedRow] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // For Dialog Component
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Styling
  const tableHeaderSx = {
    backgroundColor: "darkblue",
    position: "sticky",
    top: 0,
    zIndex: 3,
  };
  const tableHeaderCellSx = { color: "white", fontWeight: "bold", p: "3px" };
  const actionsButtonSx = { p: "3px", margin: "3px" };

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
    <Paper>
      <TableContainer>
        <Table aria-label="Task table">
          <TableHead sx={tableHeaderSx}>
            <TableRow>
              <TableCell sx={tableHeaderCellSx}>Created</TableCell>
              <TableCell sx={tableHeaderCellSx}>Task</TableCell>
              <TableCell sx={tableHeaderCellSx}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: row.finished
                    ? "green"
                    : index % 2 === 0
                    ? "lightgrey"
                    : "white",
                }}
              >
                <TableCell
                  sx={{
                    textDecoration: row.finished ? "line-through" : "none",
                    p: "3px",
                    width: "20%",
                  }}
                >
                  {row.time}
                </TableCell>
                <TableCell
                  sx={{
                    textDecoration: row.finished ? "line-through" : "none",
                    p: "3px",
                    width: "50%",
                  }}
                >
                  {row.task.length < 30
                    ? row.task
                    : row.task.slice(0, 30) + "..."}
                </TableCell>
                <TableCell
                  sx={{
                    p: "3px",
                    width: "30%",
                  }}
                >
                  <Stack direction="column">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={actionsButtonSx}
                      startIcon={<Info />}
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpenModal();
                      }}
                    >
                      Detail
                    </Button>
                    {!row.finished ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={actionsButtonSx}
                        startIcon={<CheckBox />}
                        onClick={() => handleFinishButton(row.id)}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="warning"
                        sx={actionsButtonSx}
                        startIcon={<CheckBoxOutlineBlank />}
                        onClick={() => handleFinishButton(row.id)}
                      >
                        Undone
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      sx={actionsButtonSx}
                      startIcon={<Delete />}
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpenDialog(row);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow sx={{ height: 100 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]} // Add number to activate rows per page options
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
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
              setOpenDialog(false);
            }}
            startIcon={<DeleteForever />}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
