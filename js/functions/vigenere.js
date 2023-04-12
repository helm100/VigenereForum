export function process(message, key, encrypt) {
    if (!message) return "";
    if (key === "") {
        return message;
    }

    let processedMsg = "";
    const messageLength = message.length;

    for (i = 0; i < messageLength; i++) {
        let charCode = message.charCodeAt(i);
        let keyCharCode = key.charCodeAt(i % key.length) - 32;
        keyCharCode *= (encrypt ? 1 : -1);

        // Only considering Unicode characters in the 'Basic Latin' range
        newCharCode = shiftCharCode(charCode, keyCharCode, 32, 126)

        processedMsg += String.fromCharCode(newCharCode);
    }

    return processedMsg;
}

function shiftCharCode(charCode, keyCharCode, leftBound, rightBound) {
    if (charCode >= leftBound && charCode <= rightBound) {
        charCode -= leftBound;
        return mod(charCode + keyCharCode, rightBound - leftBound - 1) + leftBound;
    }

    return charCode;
}

function mod(val, m) {
    let mVal = val % m;
    if (mVal < 0) {
        mVal += m;
    }
    return mVal;
}