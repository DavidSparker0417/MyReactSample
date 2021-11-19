import React, { useContext } from 'react';
import headerBg from './header-bg.svg';
import userImg from './user.svg'
import { classNames } from '@progress/kendo-react-common';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { CURRENCY, CurrencyContext } from '../../context/CurrencyContext';
import styles from './header.module.scss';

const customValueRender = (el, value) => (
    <el.type
        {...el.props}
        className = {classNames(el.props.className, "text-left pl-0")}
    >
        <span className="text-left"> Currency in {value.name} </span>
    </el.type>
);

export default function Header() {
    const {currency, onCurrencyChange} = useContext(CurrencyContext);
    const currencyData = [
        {name: 'USD', value: CURRENCY.USD},
        {name: 'BGN', value: CURRENCY.BGN},
        {name: 'GBP', value: CURRENCY.GBP}
    ];
    const handleChange = e => {
        if (onCurrencyChange) {
            onCurrencyChange.call(undefined, e.target.value.value);
        }
    }
    return(
        <header 
            className = {classNames(styles.header, styles['currency-input'], 'py-3')}
            style = {{background: `url(${headerBg})`}}
        >
            <div className="container pt-4 pb-2">
                <div className="row">
                    <div className="col-9">
                        <h1 className="mb-0 header-title">My Stocks Portfolio</h1>
                        <DropDownList
                            popupSettings={{
                                animate: {
                                    closeDuration: 300,
                                    openDuration: 300,
                                }
                            }}
                            data={currencyData}
                            style={{ width: 200 }}
                            value={currencyData.find(c => c.value === currency)}
                            onChange = {handleChange}
                            valueRender={customValueRender}
                            textField = "name"
                        />
                    </div>
                    <div className="col-3">
                        <div className="text-rigth">
                            <img src={userImg} alt="user"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}