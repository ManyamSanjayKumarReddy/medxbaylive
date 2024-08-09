import React, { useEffect, useState } from 'react';
import Header from './InboxHeader';
import MessageList from './InboxMessageList';
import MessageInput from './InboxMessageInput';
import './ChatWindow.css';
import { fetchFromServer } from '../../../actions/api';

const ChatWindow = ({ chatId, doctorName ,image}) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const role = sessionStorage.getItem('role');
        const response = await fetchFromServer(role, `/chat/${chatId}`);
        console.log('Fetched messages:', response);
        setMessages(response.chat.messages);
        setPatientId(response.chat.patientId);
      } catch (error) {
        setError(error.message);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const userId = sessionStorage.getItem('userId');

  const handleSendMessage = async (message) => {
    try {
      const role = sessionStorage.getItem('role');
      await fetchFromServer(role, `/chats/${chatId}/send-message`, { message }, 'POST');
      setMessages([...messages, { text: message, timestamp: new Date(), senderId: userId }]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chat-window-container">
      <Header doctorName={doctorName} image={image} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
