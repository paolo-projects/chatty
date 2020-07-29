import React from 'react';
import RoomText from '../components/RoomText';
import ChatContent from '../components/chat/content/ChatContent';
import ChatInput from '../components/chat/ChatInput';
import "./mainlayout.css";
import { useSelector } from 'react-redux';
import { authorSelector } from '../data/selectors/author';
import NameSelection from '../components/name/name';

export default function MainLayout() {
  const name = useSelector(authorSelector);

  return (
    <div className="mainLayout">
      { name ? 
        <>
          <RoomText />
          <ChatContent/>
          <ChatInput/>
        </>
        :
        <NameSelection />
      }
    </div>
  );
}