import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesSelector } from "../data/selectors/chat";
import ChatServiceInstance from "./chat-service";
import { addChatEntry } from "../data/actions/chat";

export function useChatLayer() {
    const chatLayer = useSelector(messagesSelector);
    const dispatch = useDispatch();

    const Service = ChatServiceInstance;

    const update = (message: string, author: string) => {
        dispatch(addChatEntry(message, author));
    };

    useEffect(() => {
        Service.subscribe(update);
        return () => {
            Service.unsubscribe(update);
        };
    }, []);

    return chatLayer;
}

export function useSendMessage() {
    return async (message: string, author: string) => {
        ChatServiceInstance.sendMessage(message, author);
    }
}