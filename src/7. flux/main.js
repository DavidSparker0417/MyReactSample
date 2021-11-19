import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Flux from './App.jsx';
import todoApp from './reducers/reducers';

let store = createStore(todoApp);

// const FluxApp = <Provider store = {store}><Flux /></Provider>

function FluxApp() {
    return (
        <Provider store = {store}><Flux /></Provider>
    )
}

export default FluxApp;