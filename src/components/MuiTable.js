import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Delete,
  CheckBox,
  Info,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import DetailsModal from "./DetailsModal";
import DelConfirmDialog from "./DelConfirmDialog";

export default function MuiTable({ sharedData, handleSharedData }) {
  const [data, setData] = [sharedData, handleSharedData];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEmptyRows = () => {
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    return (
      emptyRows > 0 && (
        <TableRow sx={{ height: 115 * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )
    );
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Styling
  const paperSx = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const tableHeaderSx = {
    backgroundColor: "darkblue",
    position: "sticky",
    top: 0,
    zIndex: 3,
  };
  const tableHeaderCellSx = { color: "white", fontWeight: "bold" };
  const actionsButtonSx = { margin: "3px 0" };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={paperSx}>
        <Table size="small">
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
                    width: "20%",
                  }}
                >
                  {row.dateTime}
                </TableCell>
                <TableCell
                  sx={{
                    textDecoration: row.finished ? "line-through" : "none",
                    width: "50%",
                  }}
                >
                  {row.task.length < 30
                    ? row.task
                    : row.task.slice(0, 30) + "..."}
                </TableCell>
                <TableCell
                  sx={{
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
                        handleOpenDialog();
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {handleEmptyRows()}
          </TableBody>
        </Table>
        <TablePagination
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]} // Add number to activate
          showFirstButton={true}
          showLastButton={true}
          component="div"
          style={{ margin: "auto" }}
        />
        <DetailsModal
          isOpen={isModalOpen}
          data={selectedRow}
          handleClose={handleCloseModal}
        />
        <DelConfirmDialog
          isOpen={isDialogOpen}
          data={selectedRow}
          handleClose={handleCloseDialog}
          handleDeleteButton={handleDeleteButton}
        />
      </Paper>
    </Container>
  );
}
