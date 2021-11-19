import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        if (name !== "")
        {
            props.addTask(name);
            setName("");
        }
    }    
    function handleChange(e) {
        setName(e.target.value)
    }
    return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center">
        <label htmlFor="new-todo-input">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="d-block w-100"
        name="text"
        autoComplete="off"
        value = {name}
        onChange = {handleChange}
      />
      <button type="submit" className="btn btn-dark ml-1">
        Add
      </button>
    </form>
  );
}

export default Form;