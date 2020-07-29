export interface ChatEntry {
    message: string;
    author: string;
    timestamp: Date;
}

export interface ChatState {
    messages: Array<ChatEntry>;
}
