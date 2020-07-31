import React from 'react';
import RoomText from '../components/RoomText';
import ChatContent from '../components/chat/content/ChatContent';
import ChatInput from '../components/chat/ChatInput';
import "./mainlayout.css";
import { useSelector } from 'react-redux';
import { authorSelector } from '../data/selectors/author';
import NameSelection from '../components/name/name';
import Clients from '../components/clients/Clients';
import { useChatStatus } from '../services/hooks';

export default function MainLayout() {
  const connected = useChatStatus();
  const name = useSelector(authorSelector);

  return (
    <div className="mainLayout">
      { (name && connected) ? 
        <div className="mainContent">
          <div className="mainContent__chatContent">
            <RoomText />
            <ChatContent/>
            <ChatInput/>
          </div>
          <div className="clientsContainer">
            <Clients/>
          </div>
        </div>
        :
        <NameSelection />
      }
    </div>
  );
}