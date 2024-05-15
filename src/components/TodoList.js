import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import myTodo from "./Todos";

const TodoList = () => {
  const [todos, setTodos] = useState(myTodo);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  const handleMarkFinished = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, finished: !todo.finished };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDescriptionClick = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        //border: "1px solid",
      }}
    >
      <TableContainer>
        <Table
          style={{
            border: "1px solid",
            borderCollapse: "collapse",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  width: "10%",
                }}
              >
                Id
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  width: "50%",
                }}
              >
                Task
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid",
                  fontWeight: "bold",
                  width: "40%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? todos.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : todos
            ).map((todo) => (
              <TableRow
                key={todo.id}
                style={{
                  textDecoration: todo.finished ? "line-through" : "none",
                }}
              >
                <TableCell style={{ border: "1px solid" }}>{todo.id}</TableCell>
                <TableCell style={{ border: "1px solid" }}>
                  {todo.task}
                </TableCell>
                <TableCell style={{ border: "1px solid", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDescriptionClick(todo)}
                    style={{
                      margin: "3px",
                      width: "30%",
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color={todo.finished ? "warning" : "success"}
                    onClick={() => handleMarkFinished(todo.id)}
                    style={{
                      margin: "3px",
                      width: "30%",
                    }}
                  >
                    {todo.finished ? "Undone" : "Done"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      margin: "3px",
                      width: "30%",
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={todos.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]} // Disable row per page options
        page={page}
        onPageChange={handleChangePage}
        style={{ border: "1px solid", borderTop: "none" }}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid black",
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
          }}
        >
          <Typography id="modal-description" sx={{ m: 2 }}>
            {selectedTodo ? selectedTodo.description : ""}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default TodoList;
