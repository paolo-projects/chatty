import { RootState } from "../reducers";

export function authorSelector(state: RootState) {
    return state.author.name;
}