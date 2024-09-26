import { createContext, useState } from "react";
import Todo from "../models/todo";

const TodoContext = createContext<{items: Todo[], addTodo: (text: string) => void, deleteTodo: (id: string)=> void}>({
    items: [],
    addTodo: (text: string) => {},
    deleteTodo: (id: string) => {}
});

export default TodoContext;

export const TodoContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const deleteTodoHandler = (id: string) => {
    const newTodos = todos.filter((todo)=> todo.id !== id);
    setTodos(()=> newTodos);
  }

  const todoCtx = {
    items: todos,
    addTodo: addTodoHandler,
    deleteTodo: deleteTodoHandler
  }
    return <TodoContext.Provider value={todoCtx} >{children}</TodoContext.Provider>
}