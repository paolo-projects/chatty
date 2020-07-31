import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesSelector } from "../data/selectors/chat";
import { addChatEntry } from "../data/actions/chat";
import ChatService from "./chat-service";
import { ChatEntry } from "../data/state/chat";
import ConnectedClient from "./client/ConnectedClient";

export function useChatMessages(): ChatEntry[] {
    const chatMessages = useSelector(messagesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const addChat = (content: string, author: string) => {
            dispatch(addChatEntry(content, author));
        };

        ChatService.subscribe('message', addChat);

        return () => {
            ChatService.unsubscribe('message', addChat);
        }
    }, [dispatch]);

    return chatMessages;
}

export function useChatStatus(): boolean {
    const [status, setStatus] = useState(ChatService.connected);

    useEffect(() => {
        const setConnectionStatus = (status: boolean) => {
            setStatus(status);
        };

        ChatService.subscribe('connectionstatus', setConnectionStatus);

        return () => {
            ChatService.unsubscribe('connectionstatus', setConnectionStatus);
        }
    }, []);

    return status;
}

export function useConnectedClients() {
    const [clients, setClients] = useState([] as ConnectedClient[]);

    useEffect(() => {
        const updateClients = (clients: ConnectedClient[]) => {
            setClients(clients);
        };

        ChatService.subscribe('clients', updateClients);

        return () => {
            ChatService.unsubscribe('clients', updateClients);
        };
    }, []);

    return clients;
}

export function useSendMessage() {
    return async (message: string, author: string) => {
        if(ChatService) {
            ChatService.sendMessage(message, author);
        }
    }
}