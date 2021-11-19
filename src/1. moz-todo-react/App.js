import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from "nanoid"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
// import './index.css';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All : () => true,
  Active : task => !task.completed,
  completed : task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function Todo1(props) {
  const [filter, setFilter] = useState('All')
  const filterList = FILTER_NAMES.map(name => (
      <FilterButton 
        key={name} 
        name={name}
        isPressed = {name === filter}
        setFilter = {setFilter}
      />
  ));
  const [tasks, setTasks] = useState(props.tasks)

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo 
        id={task.id} 
        key={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask = {deleteTask}
        editTask = {editTask}
      />
    ));
  
  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed : false};
    setTasks([...tasks, newTask]);
  }
  
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  
  return (
    //<div className=" todoapp stack-large">
    <div className="stack-large w-75 mr-auto ml-auto">
      <h1 className='text-center'>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters style1-btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex = "-1" ref = {listHeadingRef}>{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
export default Todo1;
