import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Callers from './callers';
import MessagePanel from './components/messagePanel';
import { ColorButton } from "./components/colorButton";
import { TextInput, Button } from "./components/controls";
import { process } from "./functions/vigenere";
import { verHaspel } from "./functions/wvreek";
import { TextInput, Button } from './components/controls';
import InfoSvg from './info2.svg';

const App = () => {
    const [channelId, setChannelId] = useState(null);
    const [channelNameInput, setChannelNameInput] = useState("");
    const [colors, setColors] = useState(['rgb(11,11,11)', 'rgb(244,244,244)']);
    const [encryptFunction, setEncryptFunction] = useState({ name: "Vigenere", function: process });

    const openChannel = () => {
        setChannelId(null);
        Callers.getChannelId(channelNameInput.trim())
            .then((channelId) => {
                setChannelId(channelId);
                console.log("Changed to channel with id " + channelId);
            })
    }

    useEffect(() => {
        const callback = (event) => {
          // event.metaKey - pressed Command key on Macs
          // event.ctrlKey - pressed Control key on Linux or Windows
          if (event.shiftKey && event.code === 'KeyW') {
            setEncryptFunction({name: "WVR", function: verHaspel})
          }
          else if (event.shiftKey && event.code === 'KeyV') {
            setEncryptFunction({name: "Vigenere", function: process})
          }
        };
        document.addEventListener('keydown', callback);
        return () => {
          document.removeEventListener('keydown', callback);
        };
      }, []);

    return (<>
        <label htmlFor="chnlInput">Channel name: </label>
        <a href='https://github.com/helm100/VigenereForum' target='_blank'><img src={InfoSvg} className='about-link'></img></a>
        <ColorButton id={"colorBtn"} name="colors!" className="color-button" setColors={setColors} />
        <div className='channel-input'>
            <TextInput id="chnlInput" initStr={channelNameInput} setter={setChannelNameInput}></TextInput><br />
            <Button id="openChnl" name="open" onClickAction={openChannel} />
        </div>
        {channelId ? <><MessagePanel channelId={channelId} encryptFunction={encryptFunction} colors={colors} /></> : null}
    </>);
}


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);