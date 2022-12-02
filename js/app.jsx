import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Callers from './callers';
import MessagePanel from './components/messagePanel';
import { ColorButton } from "./components/colorButton";
import { TextInput, Button } from './components/controls'

const App = () => {
    const [channelId, setChannelId] = useState(null);
    const [channelNameInput, setChannelNameInput] = useState("");
    const [colors, setColors] = useState(['rgb(11,11,11)', 'rgb(244,244,244)']);

    const openChannel = () => {
        setChannelId(null);
        Callers.getChannelId(channelNameInput.trim())
            .then((channelId) => {
                setChannelId(channelId);
                console.log("Changed to channel with id " + channelId);
            })
    }

    return (<>
        <label htmlFor="chnlInput">Channel name: </label>
        <ColorButton id={"colorBtn"} name="colors!" className="color-button" setColors={setColors} />
        <div className='channel-input'>
            <TextInput id="chnlInput" initStr={channelNameInput} setter={setChannelNameInput}></TextInput><br />
            <Button id="openChnl" name="open" onClickAction={openChannel} />
        </div>
        {channelId ? <><MessagePanel channelId={channelId} colors={colors} /></> : null}
    </>);


}


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);