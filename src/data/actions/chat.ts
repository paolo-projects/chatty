export const CHAT_ADD = 'CHAT_ADD';
export const CHAT_DELETE = 'CHAT_DELETE';
export const CHAT_CLEAR = 'CHAT_CLEAR';

interface AddAction {
    type: typeof CHAT_ADD;
    content: string;
    author: string;
}

interface DeleteAction {
    type: typeof CHAT_DELETE;
    index: number;
}

interface ClearAction {
    type: typeof CHAT_CLEAR;
}

export function addChatEntry(content: string, author: string): ChatActionTypes {
    return {
        type: CHAT_ADD,
        content,
        author
    };
}

export function deleteChatEntry(index: number): ChatActionTypes {
    return {
        type: CHAT_DELETE,
        index
    };
}

export function clearChatEntries(): ChatActionTypes {
    return {
        type: CHAT_CLEAR
    };
}

export type ChatActionTypes = AddAction | DeleteAction | ClearAction;