import React, { useContext } from 'react';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';
import TodoContext from '../store/todo-context';

const Todos: React.FC = () => {
  const {items, deleteTodo} = useContext(TodoContext)

  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem key={item.id} text={item.text} onDeleteTodo={deleteTodo.bind(null, item.id)} />
      ))}
    </ul>
  );
};

export default Todos;