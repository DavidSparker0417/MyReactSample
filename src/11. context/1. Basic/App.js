import React from 'react';
import { createContext, useContext } from 'react';

const MyContext = createContext('Intentional');

function UsingContext() {
    const context = useContext(MyContext);
    return(
        <div>{context}</div>
    )
}

function UsingCtxConsumber() {
    return (
        <MyContext.Consumer>
        {
            (value) => <div>{value}</div>
        }
        </MyContext.Consumer>
    )
}

function App() {
    return(
        <div>
            <MyContext.Provider value='Convention'>
                <UsingContext />
            </MyContext.Provider>
            <UsingCtxConsumber />
        </div>
    )
}

export default App;