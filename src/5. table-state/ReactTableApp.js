import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import namor from 'namor';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      :last-child {
        border-right: 0;
      }
    }
  }
`
function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generatePerson() {
    return {
        firstname: namor.generate({ words: 1, numbers: 0 }),
        lastname: namor.generate({ words: 1, numbers: 1 }),
        gender: Math.floor(Math.random() * 100) % 2 ? "Male" : "Female",
        age: Math.floor(getRandomArbitrary(15, 45)),
        address: namor.generate({ words: 2, numbers: 0 }),
        tall: getRandomArbitrary(150, 200).toFixed(1) + "cm",
        detail: 'Visit the site on which friend sounds most appealing to you',
    };
}

function Table ({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data});

    return (
        <table className="table-hover" {...getTableProps()}>
            <thead>
            {
                headerGroups.map(headerGroup => (
                    <tr className="thead-dark" {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))
                    }
                    </tr>
                ))
            }
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr className="table-success" {...row.getRowProps()}>
                        {
                            row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))
                        }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

function ReactTableApp() {
    const columns = React.useMemo(
        () => [
            {
                Header:'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstname',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastname',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Gender',
                        accessor: 'gender',
                    },
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Address',
                        accessor: 'address',
                    },
                    {
                        Header: 'Tall',
                        accessor: 'tall',
                    },
                    {
                        Header: 'Detail',
                        accessor: 'detail',
                    },
                ],
            },
        ],
        []
    );
    
    const data = React.useMemo(
        () => range(0, 20).map(d => generatePerson()), []);
    return (
        <Styles>
            <Table columns={columns} data={data}/>
        </Styles>
    )
}

export default ReactTableApp;