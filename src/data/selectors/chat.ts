import { RootState } from "../reducers";
import { ChatEntry } from "../state/chat";

export function messagesSelector(state: RootState): Array<ChatEntry> {
    return state.chat.messages;
}

export function messagesCountSelector(state: RootState): number {
    return state.chat.messages.length;
}