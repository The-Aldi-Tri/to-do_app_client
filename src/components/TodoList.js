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
} from "@mui/material";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Task 1", description: "Description 1", finished: false },
    { id: 2, task: "Task 2", description: "Description 2", finished: false },
    { id: 3, task: "Task 3", description: "Description 3", finished: false },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

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

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <TableContainer>
        <Table style={{ borderCollapse: "collapse", textAlign: "left" }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                  width: "60%",
                }}
              >
                Task
              </TableCell>
              <TableCell
                style={{
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                  width: "40%",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow
                key={todo.id}
                style={{
                  textDecoration: todo.finished ? "line-through" : "none",
                }}
              >
                <TableCell style={{ border: "1px solid #ddd" }}>
                  {todo.task}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid #ddd", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDescriptionClick(todo)}
                    style={{
                      margin: "4px",
                      width: "30%",
                    }}
                  >
                    View Description
                  </Button>
                  <Button
                    variant="contained"
                    color={todo.finished ? "warning" : "success"}
                    onClick={() => handleMarkFinished(todo.id)}
                    style={{
                      margin: "4px",
                      width: "30%",
                    }}
                  >
                    {todo.finished ? "Unmark Finished" : "Mark Finished"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      margin: "4px",
                      width: "30%",
                    }}
                  >
                    Delete Task
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
            maxWidth: 400,
          }}
        >
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {selectedTodo ? selectedTodo.description : ""}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default TodoList;
