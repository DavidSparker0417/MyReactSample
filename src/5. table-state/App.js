import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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
const availAges = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

class TableState extends React.Component {
    constructor () {
        super();
        this.state = {
            data : [
                {
                    "id": 0, 
                    "name" : "aggressive",
                    age : 22
                },
                {
                    "id": 1, 
                    "name" : "fancy",
                    age : 26
                },
                {
                    "id": 2, 
                    "name" : "delegate",
                    age : 33
                }
            ]
        };
        this.onAddTableRow = this.onAddTableRow.bind(this);
    }

    onAddTableRow (obj) {
        this.setState((prev) => {
            const data = {"id":this.state.data.length, "name":obj.name, age:obj.age};
            return {...prev, data:[...prev.data, data]};
        })
    }

    render () {
        return (
        <div>
            <TdInsert onAdd={this.onAddTableRow} />
            <table className="table table-hover text-center w-75 mr-auto ml-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope = "col">id</th>
                        <th scope = "col">name</th>
                        <th scope = "col">age</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map((person, id) => 
                        (<TableRow key={id} data={person}/>))
                }
                </tbody>
            </table>
        </div>)
    }
}

class TableRow extends React.Component {
    render() {
        return (
        <tr className={bstrapTblStyles[this.props.data.id % bstrapTblStyles.length]}>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
        </tr>)
    }
}

class TdInsert extends React.Component {
    constructor () {
        super();
        this.state = { 
            name : "",
            curAge : 25
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    onDropDownItem(age) {
        this.setState((prev) => ({...prev, curAge:age}));
    }

    onChangeUsername({target}) {
        this.setState((prev) => ({...prev, name:target.value}));
    }

    render () {
        return (
            <div className="input-group mb-2 mt-2 d-flex justify-content-center">
                <input type="text" placeholder="username" value={this.state.name} onChange={this.onChangeUsername}/>
                <div className="input-group-append">
                    <DropdownButton id="dropdown-basic-button" title={this.state.curAge}>
                    {
                        availAges.map((age, i) => (
                            <Dropdown.Item 
                                onClick={() => this.onDropDownItem(age)} key={i}>
                                {age}
                            </Dropdown.Item>
                        ))
                    }
                    </DropdownButton>
                    <button 
                        onClick = {() => this.props.onAdd({name:this.state.name, age:this.state.curAge})}
                        className="btn btn-outline-secondary">
                        Add
                    </button>
                </div>
            </div>
        )
    }
}

export default TableState;