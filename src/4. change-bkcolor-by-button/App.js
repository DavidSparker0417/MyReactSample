import React, { useState } from 'react';
// import "./styles.css"

const colorNames = ["aliceblue", "aqua", "beige", "blueviolet", "brown", "cadetblue", 
    "chartreuse", "coral", "cornflowerblue", "cornsilk", "cyan", "darkkhaki", "darkorange", 
    "deepskyblue", "floralwhite", "gold", "greenyellow", "honeydew"];

export default function ChangeBkColor() {
    const [color, setColor] = useState('Yellow');
    const [customColor, setCustomColor] = useState('');
    const [customColorList, setCustomColorList] = useState([]);
    const containerStyle = {backgroundColor: color,
                            alignItems: 'center',
                            height:'100%' }
    const handleChangeColor = ({target}) => setCustomColor(target.value);
    const onAddColor = () => setCustomColorList((prev) => {return [...prev, customColor]});
    const delClrList = (delIdx) => {
        console.log(delIdx);
        setCustomColorList((list, index) => {
            return list.filter((t, index) => index !== delIdx);
        })
    };
    return (
        <div style={containerStyle}>
            <h1 className="text-center">Setup background color by buttons!</h1>
            <h2 className="text-center">Background color is {color}</h2>
            <div className="text-center">
                {
                    colorNames.map((color) => (
                        <button 
                        className="btn btn-dark mr-1 mb-1"
                        onClick={() => {setColor(color)}} 
                        key={color}>
                            {color}
                        </button>
                    ))
                }
            </div>
            <div className="text-center" id="add-color-div">
                <label className = "mr-2" htmlFor="color-input">Custom Color</label>
                <input 
                    id="color-input" 
                    value={customColor}
                    onChange = {handleChangeColor}
                />
                <button 
                    onClick = {onAddColor}>
                    Add
                </button>
            </div>
            <div className="text-center">
                <ul>
                {
                    customColorList.map((item, index) => (
                        <li key={index} onClick={() => delClrList(index)}>
                            {item}
                        </li>
                    ))
                }</ul>
            </div>
        </div>
    );
}