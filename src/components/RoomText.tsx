import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authorSelector } from '../data/selectors/author';
import './roomtext.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { clearChatEntries } from '../data/actions/chat';
import { setAuthor } from '../data/actions/author';

export default function RoomText() {
  const author = useSelector(authorSelector);
  const dispatch = useDispatch();

  const resetClick = () => {
    dispatch(clearChatEntries());
    dispatch(setAuthor(''));
  };

  return (
    <div className="welcomeText">
      <div>Ciao, <b>{author}</b>!</div>
      <IconButton className="welcomeText__destroyBtn" onClick={() => resetClick()}>
        Logout <DeleteIcon />
      </IconButton>
    </div>
  );
}