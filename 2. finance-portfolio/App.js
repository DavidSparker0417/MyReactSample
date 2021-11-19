import './styles/main.scss';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import { 
    Route, 
    HashRouter, 
    useLocation,
    Redirect
 } from 'react-router-dom';
import { CurrencyContext, CURRENCY } from './context/CurrencyContext';
import StockPage from './Pages/StockPage';

const Main = () => {
    const locations = useLocation();
    return (
        <>
            <Route path={["/stocks/:symbol?"]}>
                <Header />
                <StockPage />
            </Route>
            {locations.pathname === '/' ? <Redirect to='/stocks'/> : null}
        </>
    )
}
export default function App () {
    const curDate = new Date();
    const [currency, setCurrency] = useState(CURRENCY.USD);
    const onCurrencyChange = value => setCurrency(value);
    return(
        <div className="App">
            <CurrencyContext.Provider value={{currency, onCurrencyChange}}>
                <HashRouter>
                    <Main />
                </HashRouter>
            </CurrencyContext.Provider>
        </div>
    )
}
