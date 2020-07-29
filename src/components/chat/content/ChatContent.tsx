import React, { useEffect, useRef } from 'react';
import { useChatLayer } from '../../../services/hooks';
import ChatItem from './item/ChatItem';
import { useSelector } from 'react-redux';
import { authorSelector } from '../../../data/selectors/author';
import "./chatcontent.css";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function ChatContent() {
    const chats = useChatLayer();
    const author = useSelector(authorSelector);
    console.log(chats);
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
    }, [chats]);

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
                <div className="chatMessage__message">Inizia scrivendo qualcosa...</div>
            </div>
        }
        </div>
        );
}