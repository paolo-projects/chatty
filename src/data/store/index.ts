import { createStore } from "redux";
import { rootReducer, RootState } from "../reducers";

const STORE_ITEM_KEY = "chatty__store";
const defaultState = {
    chat: {
        messages: []
    },
    author: {
        name: ''
    }
};

let previousState: RootState;

try {
    const stored = JSON.parse(localStorage.getItem(STORE_ITEM_KEY) || "{}");
    if(stored && 'chat' in stored && 'author' in stored) {
        previousState = stored as RootState;
    } else {
        previousState = defaultState;
    }
} catch {
    previousState = defaultState;
}

const Store = createStore(rootReducer, previousState);

Store.subscribe(() => {
    localStorage.setItem(STORE_ITEM_KEY, JSON.stringify(Store.getState()));
})

export default Store;