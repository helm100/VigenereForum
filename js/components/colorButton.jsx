import React from 'react';


export const ColorButton = ({ id, name, setColors }) => {

    const generateColors = () => {
        const r = Math.round(255 * Math.random());
        const g = Math.round(255 * Math.random());
        const b = Math.round(255 * Math.random());

        const color = 'rgb(' + [r, g, b].join(',') + ')';
        const bgColor = 'rgb(' + [255 - r, 255 - g, 255 - b].join(',') + ')';

        setColors([color, bgColor]);
    }

    return <button id={id} onClick={generateColors} className="color-button">{name}</button>;
}