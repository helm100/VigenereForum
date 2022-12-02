import React, { useEffect } from 'react';

export const TextInput = ({id, initStr, setter, onEnter, className}) => {
    const onKeyDown = (key) => {
        if (key == 'Enter' && onEnter) {
            onEnter();
        }
    }

    useEffect(() => {
        document.getElementById(id).value = initStr;
    }, [initStr]);

    return <input type="text" id={id} defaultValue={initStr} onChange={(evt) => setter(evt.target.value)} onKeyDown={(evt) => onKeyDown(evt.key)} className={className}/>;
}

export const Button = ({id, name, onClickAction, className}) => {
    return <button id={id} onClick={() => onClickAction()} className={className}>{name}</button>;
}