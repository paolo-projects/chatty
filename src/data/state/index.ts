import { ChatState } from "./chat";
import AuthorState from "./author";

export interface RootState {
    chat: ChatState,
    author: AuthorState
}