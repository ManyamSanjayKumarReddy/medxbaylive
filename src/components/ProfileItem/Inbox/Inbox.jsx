import React, { useState, useEffect } from 'react';
import Sidebar from './InboxSidebar';
import ChatWindow from './ChatWindow';
import './Inbox.css';
import { fetchFromServer } from '../../../actions/api';

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    setError(null); // Clear any previous errors

    try {
      const role = sessionStorage.getItem('role');
      const response = await fetchFromServer(role, `/chat/${chat.id}`);
      console.log('Fetched messages:', response);
      setMessages(response.chat.messages);
      setPatientId(response.chat.patientId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const role = sessionStorage.getItem('role');
      await fetchFromServer(role, `/chats/${selectedChat.id}/send-message`, { message }, 'POST');
      setMessages([...messages, { text: message, timestamp: new Date(), senderId: sessionStorage.getItem('userId') }]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="inbox-container">
      <Sidebar onSelectChat={handleSelectChat} />
      <ChatWindow
        chatId={selectedChat?.id}
        doctorName={selectedChat?.name || "Name"}
        image={selectedChat?.img}
        messages={messages}
        error={error}
        patientId={patientId}
        onSendMessage={handleSendMessage} // Correctly pass the handleSendMessage function
      />
    </div>
  );
};

export default Inbox;
