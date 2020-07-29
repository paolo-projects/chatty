export const AUTHOR_SET = "AUTHOR_SET";

interface SetAction {
    type: typeof AUTHOR_SET;
    author: string;
}

export function setAuthor(name: string): AuthorActionTypes {
    return {
        type: AUTHOR_SET,
        author: name
    };
}

export type AuthorActionTypes = SetAction;