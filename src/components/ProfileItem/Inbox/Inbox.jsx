import React, { useState } from 'react';
import Sidebar from './InboxSidebar';
import ChatWindow from './ChatWindow';
import './Inbox.css';
// import LoginCard from '../Inbox/login'

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    console.log(chat);
    
    setSelectedChat(chat);
  };

  return (
    <div className="inbox-container">
      {/* <LoginCard /> */}
      <Sidebar onSelectChat={handleSelectChat} />
      {selectedChat ? (
        <ChatWindow
          chatId={selectedChat.id}
          doctorName={selectedChat.name}
        />
      ) : (
        <div className="no-chat-selected">Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default Inbox;
