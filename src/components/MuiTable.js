import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Delete, CheckBox, Info, Undo } from "@mui/icons-material";

import rows from "./DummyData"; // Import Dummy Data

export default function MuiTable() {
  // For Table
  const [data, setData] = useState(rows);

  const handleFinishButton = (id) => {
    setData(
      data.map((i) => {
        if (i.id === id) {
          return { ...i, finished: !i.finished };
        }
        return i;
      })
    );
  };

  const handleDeleteButton = (id) => {
    setData(data.filter((i) => i.id !== id));
  };

  // For Table Pagination
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

  // For Modal
  const [selectedRow, setSelectedRow] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // For Dialog

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Styling
  const tableHeadSx = { color: "white", fontWeight: "bold", p: 0.5 };
  const actionsButtonSx = { p: 0.5 };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="Task table">
          <TableHead
            sx={{
              backgroundColor: "darkblue",
              position: "sticky",
              top: 0,
              zIndex: 3,
            }}
          >
            <TableRow>
              <TableCell sx={tableHeadSx}>Created</TableCell>
              <TableCell sx={tableHeadSx}>Task</TableCell>
              <TableCell sx={tableHeadSx}>Actions</TableCell>
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
                    p: 0.5,
                    width: "20%",
                  }}
                >
                  {row.time}
                </TableCell>
                <TableCell
                  sx={{
                    textDecoration: row.finished ? "line-through" : "none",
                    p: 0.5,
                    width: "50%",
                  }}
                >
                  {row.task.length < 30
                    ? row.task
                    : row.task.slice(0, 30) + "..."}
                </TableCell>
                <TableCell
                  sx={{
                    p: 0.5,
                    width: "30%",
                  }}
                >
                  <Stack direction="column" spacing={1}>
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
                        startIcon={<Undo />}
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
        <Paper
          sx={{
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
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "justify",
              p: 0.5,
              borderBottom: "1px solid",
            }}
          >
            {selectedRow.task ? selectedRow.task : ""}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              textAlign: "justify",
              p: 0.5,
            }}
          >
            {selectedRow.details ? selectedRow.details : ""}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
            sx={{ marginTop: "auto" }}
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
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
