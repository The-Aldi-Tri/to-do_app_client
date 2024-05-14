import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "30%", padding: "10px" }}>
        <TodoForm />
      </div>
      <div style={{ flex: "70%", padding: "10px" }}>
        <TodoList />
      </div>
    </div>
  );
};

export default App;
