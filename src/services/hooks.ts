import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesSelector } from "../data/selectors/chat";
import { addChatEntry } from "../data/actions/chat";
import ChatService, { Receiver } from "./chat-service";
import { ChatEntry } from "../data/state/chat";

let chatService: ChatService;

export function useChatLayer(name: string): [ChatEntry[], boolean] {
    const [connectionStatus, setConnectionStatus] = useState(false);
    const chatLayer = useSelector(messagesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!chatService) {
            chatService = new ChatService(name);
        } else {
            chatService.reset(name);
        }
    }, [name]);

    useEffect(() => {
        const update = {
            onMessage: (message: string, author: string) => {
                dispatch(addChatEntry(message, author));
            },
            onConnectionStatusChange: (connected: boolean) => {
                setConnectionStatus(connected);
            }
        } as Receiver;

        chatService.subscribe(update);
        return () => {
            chatService.unsubscribe(update);
        };
    }, [dispatch]);

    return [chatLayer, connectionStatus];
}

export function useSendMessage() {
    return async (message: string, author: string) => {
        if(chatService) {
            chatService.sendMessage(message, author);
        }
    }
}