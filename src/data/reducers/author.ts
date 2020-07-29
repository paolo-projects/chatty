import AuthorState from "../state/author";
import { AuthorActionTypes, AUTHOR_SET } from "../actions/author";

const initialState = {
    name: ''
};

export default function authorReducer(previousState: AuthorState = initialState, action: AuthorActionTypes) {
    switch(action.type) {
        case AUTHOR_SET:
            return { name: action.author };
        default:
            return previousState;
    }
}