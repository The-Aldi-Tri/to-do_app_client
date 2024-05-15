import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import rows from "./DummyData"; // Import Dummy Data

export default function BasicTable() {
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

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="Task table">
          <TableHead sx={{ bgcolor: "darkblue" }}>
            <TableRow>
              <TableCell sx={{ color: "white", border: "1px solid black" }}>
                Created Time
              </TableCell>
              <TableCell sx={{ color: "white", border: "1px solid black" }}>
                Task
              </TableCell>
              <TableCell sx={{ color: "white", border: "1px solid black" }}>
                Details
              </TableCell>
              <TableCell sx={{ color: "white", border: "1px solid black" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row) => (
              <TableRow
                key={row.id}
                style={{
                  textDecoration: row.finished ? "line-through" : "none",
                  backgroundColor: row.finished ? "green" : "white",
                }}
              >
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.task}</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {row.details ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpenModal();
                      }}
                      sx={{ maxWidth: "20px" }}
                    >
                      VIEW
                    </Button>
                  ) : (
                    "[ EMPTY ]"
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <div sx={{ display: "flex" }}>
                    {!row.finished ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ margin: 1, width: "45%", maxWidth: "20px" }}
                        onClick={() => handleFinishButton(row.id)}
                      >
                        Finish
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ margin: 1, width: "45%", maxWidth: "20px" }}
                        onClick={() => handleFinishButton(row.id)}
                      >
                        Unfinish
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ margin: "0 1 1 0", width: "45%", maxWidth: "20px" }}
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpenDialog(row);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: "flex", justifyContent: "center" }}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          sx={{
            p: 1,
            minWidth: 300,
            maxWidth: 600,
            minHeight: 200,
            maxHeight: 400,
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            sx={{
              borderBottom: "1px solid",
              minHeight: 50,
              maxHeight: 100,
              display: "flex",
              alignItems: "center",
              p: 1,
              textAlign: "justify",
            }}
          >
            {selectedRow.task ? selectedRow.task : ""}
          </Typography>
          <Typography
            sx={{
              borderBottom: "1px solid",
              marginBottom: "5px",
              minHeight: 200,
              maxHeight: 400,
              display: "flex",
              p: 1,
              textAlign: "justify",
            }}
          >
            {selectedRow.details ? selectedRow.details : ""}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
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
