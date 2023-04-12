import React, { useEffect, useState } from "react";

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

var currentKey = "";

export default function Message({ message, vKey, encryptFunction, id, color, bgColor }) {

    let procMsg = message + ""; //Vigenere.process(message, vKey, false);

    const updateMessage = async () => {
        const el = document.getElementById(id);
        const keyWhileUpdate = currentKey + "";
        const strLength = message.length;
        const procMsg = encryptFunction.function(message, vKey, false);
        const indices = [...Array(strLength).keys()];

        for (let i = 1; i < 5 * strLength; i++) {
            const randInd1 = Math.floor(Math.random() * (strLength - 1));
            const randInd2 = Math.floor(Math.random() * (strLength - 1));
            const randVal1 = indices[randInd1];
            indices[randInd1] = indices[randInd2];
            indices[randInd2] = randVal1;
        }

        //console.log(indices);

        for (let i = 0; i < indices.length; i++) {
            if (keyWhileUpdate != currentKey) {
                return;
            }
            await sleep(20);            
            el.innerText = setCharAt(el.innerText, indices[i], procMsg.charAt(indices[i]));
        }
        el.innerText = procMsg;
    }

    useEffect(() => {
        currentKey = vKey;
        window.setTimeout(() => updateMessage(), 100);
    }, [vKey, encryptFunction]);


    return <div id={id} className="message" style={{ backgroundColor: bgColor, color: color }} >{procMsg}</div>
}