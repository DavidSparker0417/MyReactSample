import React, {useState} from 'react';
import {DropdownButton} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const bstrapTblStyles = [
    "table-primary", 
    "table-secondary", 
    "table-success", 
    "table-danger",
    "table-warning",
    "table-info",
    "table-light",
    "table-dark"
];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
const availAges = range(19, 34);

function TableStateFunc() {
    const [tableContents, setTableContents] = useState([
        {id:0, name:"cumbersome", age:27},
        {id:1, name:"sluggish", age:31},
        {id:2, name:"deprecate", age:19}
    ]);

    function onAddTableRow(obj) {
        const data = {id:tableContents.length, name:obj.name, age:obj.age};
        setTableContents((prev) => [...prev, data]);
    }

    return (
        <div className="w-75 ml-auto mr-auto">
            <TableInsComp onAdd={onAddTableRow}/>
            <table className="table table-hover">
                <thead>
                    <tr className="thead-dark">
                    {
                        Object.keys(tableContents[0]).map((key, id) =>
                            <th key={id}>{key}</th>
                        )
                    }
                    </tr>
                </thead>
                <tbody>
                {
                    tableContents.map((t, i) => 
                        <TableRow key={i} data={t} />
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

function TableRow(props) {
    return (
        <tr className={bstrapTblStyles[props.data.id % bstrapTblStyles.length]}>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
            <td>{props.data.age}</td>
        </tr>
    );
}

function TableInsComp({onAdd}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(19);

    function onNameChange({target}) {
        setName(target.value);
    }

    return(
        <div className="input-group d-flex justify-content-center">
            <input type="text" value={name} onChange={onNameChange} />
            <DropdownButton id="dropdown-basic-button" title={age}>
            {
                availAges.map((age, id) => (
                    <DropdownItem key={id} onClick={() => setAge(age)}>
                        {age} </DropdownItem>
                ))
            }
            </DropdownButton>
            <button className="btn btn-outline-secondary" onClick={() => onAdd({name:name, age:age})}>
                Add
            </button>
        </div>
    );
}
export default TableStateFunc;