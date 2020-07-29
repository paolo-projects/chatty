import React, { useState, FormEvent } from 'react';
import PropTypes from 'prop-types';
import { useSendMessage } from '../../services/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { authorSelector } from '../../data/selectors/author';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import "./chatinput.css";
import { messagesCountSelector } from '../../data/selectors/chat';
import { addChatEntry } from '../../data/actions/chat';

export type MessageCallback = (message :string) => void;

export default function ChatInput() {
    const [chatMessage, setChatMessage] = useState("");
    const author = useSelector(authorSelector);
    const messagesCount = useSelector(messagesCountSelector);
    const dispatch = useDispatch();

    const sendMessage = useSendMessage();

    const messageSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(chatMessage);
        if(chatMessage) {
            let joke = false;
            if(messagesCount === 0 && chatMessage.toLowerCase().trim() === 'qualcosa') {
                joke = true;
            }
            sendMessage(chatMessage, author).then(() => {
                if(joke) {
                    dispatch(addChatEntry("Non credi sia troppo scontato? 😅", "Qualcuno"));
                }
            });
            setChatMessage('');
        }
    };

    return (
        <form onSubmit={e => messageSubmit(e)}>
            <Paper className="chatInput">
                <InputBase
                    className="chatInput__input"
                    placeholder="Scrivi qualcosa..."
                    aria-label="scrivi messaggio"
                    value={chatMessage}
                    onChange={e => setChatMessage(e.target.value)} />
                <IconButton 
                    type="submit" 
                    className="chatInput__sendBtn">
                        <SendIcon />
                </IconButton>
            </Paper>
        </form>
    );
}

ChatInput.propTypes = {
    author: PropTypes.string
};