import React from 'react';
import Todo1 from './App';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

const MozTodo = () => {
  return (
    <Todo1 tasks={DATA} />
  );
}

export default MozTodo;

