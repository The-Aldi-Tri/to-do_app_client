import { React, useState, useEffect } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Container,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Info,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import DetailsModal from "./DetailsModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import axiosCustom from "../utils/axiosCustom";

const TaskTable = ({ trigger, toggleTrigger }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCustom.get(`/tasks/`);
        setData(response.data.data);
      } catch (error) {
        if (error.response) {
          // The request was made but the server responded with a non-2xx status code
          toast.warning(error.response.data.message);
        } else {
          toast.error("Something wrong. Please try again later");
          /*error.request
            ? console.error("No response received:", error.request) // The request was made but no response was received
            : console.error("Error setting up the request:", error.message); // Something else happened while setting up the request*/
        }
      }
    };

    fetchData();
  }, [trigger]);

  // Handle finish task button click
  const handleFinishButton = async (id) => {
    try {
      await axiosCustom.put(`/tasks/toggle-finished/${id}`);
      toggleTrigger();
    } catch (error) {
      // console.error("Error toggling finished:", error.response.data);
    }
  };

  // Handle delete task button click
  const handleDeleteButton = async (id) => {
    try {
      await axiosCustom.delete(`/tasks/${id}`);
      handleCloseDialog();
      toggleTrigger();
      toast.success("Task deleted successfully");
    } catch (error) {
      // console.error("Error deleting task:", error.response.data);
    }
  };

  // Modal and dialog handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Render empty rows for pagination
  // const handleEmptyRows = () => {
  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  //   return (
  //     emptyRows > 0 && (
  //       <TableRow sx={{ height: 115 * emptyRows }}>
  //         <TableCell colSpan={3} />
  //       </TableRow>
  //     )
  //   );
  // };

  // Styling
  const actionsButtonSx = { margin: "3px 0" };

  // Create table header
  const createTableHeader = (headerNames) => {
    return headerNames.map((element) => (
      <TableCell sx={{ color: "white", fontWeight: "bold" }} key={element}>
        {element}
      </TableCell>
    ));
  };

  // Create table body rows
  const createTableBodyRows = (data) => {
    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3}>No records found.</TableCell>
        </TableRow>
      );
    } else {
      return (
        rowsPerPage > 0
          ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : data
      ).map((row, index) => (
        <TableRow
          key={row._id}
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
            {row.createdAt}
          </TableCell>
          <TableCell
            sx={{
              textDecoration: row.finished ? "line-through" : "none",
              width: "50%",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.task}
          </TableCell>
          <TableCell sx={{ width: "30%" }}>
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
                  onClick={() => handleFinishButton(row._id)}
                >
                  Finish
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="warning"
                  sx={actionsButtonSx}
                  startIcon={<CheckBoxOutlineBlank />}
                  onClick={() => handleFinishButton(row._id)}
                >
                  Undo
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
      ));
    }
  };

  return (
    <Container
      component={Paper}
      elevation={5}
      maxwidth="md"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "600px",
        marginTop: "25px",
        overflow: "auto",
      }}
    >
      <TableContainer>
        <Table size="small">
          <TableHead
            sx={{
              backgroundColor: "darkblue",
              position: "sticky",
              top: 0,
              zIndex: 3,
            }}
          >
            <TableRow>
              {createTableHeader(["Created", "Task", "Actions"])}
            </TableRow>
          </TableHead>
          <TableBody>
            {createTableBodyRows(data)}
            {/* {handleEmptyRows()} */}
          </TableBody>
        </Table>

        <DetailsModal
          isOpen={isModalOpen}
          data={selectedRow}
          handleClose={handleCloseModal}
        />
        <DeleteConfirmationDialog
          state={isDialogOpen}
          handleClose={handleCloseDialog}
          handleDelete={() => handleDeleteButton(selectedRow._id)}
          dialogData={{
            title: "Delete Task",
            content:
              "Are you sure you want to delete this task? This action cannot be undone.",
          }}
        />
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "auto" }}
      >
        <TablePagination
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]} // Add number to activate
          showFirstButton={true}
          showLastButton={true}
        />
      </Box>
    </Container>
  );
};

export default TaskTable;
