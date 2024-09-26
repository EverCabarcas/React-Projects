import { Counter } from "./components/counter";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import { TodoContextProvider } from "./store/todo-context";

function App() {
  return (
    <TodoContextProvider>
      <NewTodo />
      <Todos />
      <Counter />
    </TodoContextProvider>
  );
}

export default App;
