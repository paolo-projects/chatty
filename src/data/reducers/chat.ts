import { ChatState } from "../state/chat";
import { ChatActionTypes, CHAT_DELETE, CHAT_CLEAR, CHAT_ADD } from "../actions/chat";

const initialState: ChatState = { messages: [] };

export default function chatReducer(previousState = initialState, action: ChatActionTypes): ChatState {
    switch (action.type) {
        case CHAT_ADD:
            return { 
                messages: [
                    ...previousState.messages, {
                        message: action.content, 
                        author: action.author,
                        timestamp: new Date()
                    }
                ]
            };
        case CHAT_DELETE:
            const newState = { messages: [...previousState.messages]};
            newState.messages.splice(action.index, 1);
            return newState;
        case CHAT_CLEAR:
            return { messages: [] };
        default:
            return previousState;
    };
}