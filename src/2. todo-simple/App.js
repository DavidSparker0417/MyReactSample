import { useState, useRef } from "react";
import { nanoid } from "nanoid"
import "./styles.css";

export default function AppSimpleTodo() {
    const [todos, setTodos]  = useState([
        {id: 1, text: "Wash dishes", done: false},
        {id: 2, text: "Do laundry", done: false},
        {id: 3, text: "Take shower", done: false}
    ]);
    return(
        <div className="App">
            <h1>Todo List</h1>
            <TodoList todos={todos} setTodos={setTodos} />
            <AddTodo setTodos={setTodos}/>
        </div>
    );
}

function DeleteTodo({todo, setTodos}) {
    function handleDeleteTodo() {
        const confirmed = window.confirm("Do you want to delete this?");
        if (confirmed) {
          setTodos((prevTodos) => {
            return prevTodos.filter((t) => t.id !== todo.id);
          });
        }
    }
    return(
        <span 
            onClick = {() => handleDeleteTodo}
            role="button"
            style = {{
                color : 'red',
                fontWeight: "bold",
                marginLeft: 10
            }}>x</span>
    );
}

function TodoList({todos, setTodos}) {
    function handleToggleTodo(todo) {
        const updatedTodos = todos.map((t) => 
            t.id === todo.id 
            ? {
                ...t, done: !t.done
            }
            : t
        );
        setTodos(updatedTodos);
    }
    return(
        <ul>
            {todos.map(todo => (
                <li 
                    onClick = {() => handleToggleTodo(todo)}
                    style = {{
                        textDecoration: todo.done ? 'line-through' : ""
                    }}
                    key={todo.id}
                >
                    {todo.text}
                    <DeleteTodo todo={todo} setTodos={setTodos}/>
                </li>
            ))}
        </ul>
    )
}

function AddTodo({setTodos}) {
    const inputRef = useRef();
    function handleAddTodo(e) {
        e.preventDefault();
        const text = e.target.elements.addTodo.value;
        const todo = {
            id: nanoid(),
            text,
            done: false
        };
        setTodos(prevTodos => {
            return prevTodos.concat(todo)
        });
        inputRef.current.value = "";
    }
    return(
        <form onSubmit={handleAddTodo}>
            <input name="addTodo" placeholder="Add todo" ref={inputRef}/>
            <button type="submit">Submit</button>
        </form>
    );
}
