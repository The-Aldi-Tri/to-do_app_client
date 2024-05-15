import "./App.css";
import BasicTable from "./components/Table";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <TodoForm />
    //   <TodoList />
    // </div>
    <BasicTable />
  );
};

export default App;
