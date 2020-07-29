import { combineReducers } from 'redux';
import chatReducer from './chat';
import authorReducer from './author';

export const rootReducer = combineReducers({
  chat: chatReducer,
  author: authorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
