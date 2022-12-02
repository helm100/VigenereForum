import React, { useEffect, useState } from "react";
import * as Callers from "../callers"
import { TextInput, Button } from './controls'
import Message from "./message";
import * as Vigenere from "../functions/vigenere"

export default function MessagePanel({ channelId, colors }) {
    [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [vKey, setVKey] = useState("");

    useEffect(() => {
        if (channelId && channelId > 0) {
            Callers.getMessages(channelId)
                .then((messages) => {
                    setMessages(messages);
                    const box = document.getElementById("msgBox");
                    window.setTimeout(() => { box.scrollTop = box.scrollHeight });
                });
        }
    }, [channelId]);

    const sendMessage = () => {
        const encrMsg = Vigenere.process(messageInput, vKey, true);
        Callers.sendMessage(channelId, encrMsg)
            .then(() => {
                setMessageInput("");
                refresh();
            });
    }

    const refresh = async () => {
        let newMessages = await Callers.getMessages(channelId);
        setMessages(newMessages);
        const box = document.getElementById("msgBox");
        window.setTimeout(() => { box.scrollTop = box.scrollHeight });
    }

    return (<div className="message-panel">
        <div className="key-control-cont">
            <label htmlFor="vKeyInput">Vigenere key: </label>
            <TextInput id="vKeyInput" initStr={vKey} setter={setVKey} />
            <Button id="refreshBtn" name="refresh" onClickAction={refresh} className="refresh-button" />
        </div>
        <div id="msgBox" className="message-box" style={{ backgroundColor: colors[0], border: "2px solid " + colors[1] }}>
            {messages.map(msg => {
                return <Message key={msg[0]} vKey={vKey} id={msg[0]} message={msg[1]} color={colors[0]} bgColor={colors[1]} />
            })}
        </div>
        <div className="message-input">
            <TextInput id="msgInput" initStr={messageInput} setter={setMessageInput} onEnter={sendMessage} className="message-textbox"></TextInput><br />
            <Button id="sendMsg" name="send" onClickAction={sendMessage} />
        </div>
    </div>
    );
}