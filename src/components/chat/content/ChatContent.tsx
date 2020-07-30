import React, { useEffect, useRef } from 'react';
import { useChatLayer } from '../../../services/hooks';
import ChatItem from './item/ChatItem';
import { useSelector } from 'react-redux';
import { authorSelector } from '../../../data/selectors/author';
import "./chatcontent.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function ChatContent() {
    const author = useSelector(authorSelector);
    const [chats, connectionStatus] = useChatLayer(author);
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
    }, [chats]);

    if(connectionStatus) {
        return (
            <div className="chatContent" ref={chatContainer}>
            {
            chats.length > 0 ?
                <div>
                    <TransitionGroup
                        className="chatMessages" >
                        {chats.map((item, i) => (
                            <CSSTransition
                                key={i}
                                timeout={100}
                                classNames="chatBaloon"
                                component={null} >
                                <ChatItem key={i} item={item} author={author}/>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            :
                <div className="chatContainer">
                    <div className="chatContainer__message">Inizia scrivendo qualcosa...</div>
                </div>
            }
            </div>
        );
    } else {
        return (
            <div className="chatContainer chatContainer--disconnected">
                <div className="chatContainer__message">Connessione in corso...</div>
            </div>
        );
    }
}