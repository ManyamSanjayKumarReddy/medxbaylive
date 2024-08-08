import React, { useEffect, useState } from 'react';
import Header from './InboxHeader';
import MessageList from './InboxMessageList';
import MessageInput from './InboxMessageInput';
import { fetchFromPatient } from '../../../actions/api.js';
import './ChatWindow.css';

const ChatWindow = ({ chatId, doctorName }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchFromPatient(`/chat/${chatId}`);
        console.log('Fetched messages:', response); // Debug output
        setMessages(response.chat.messages);
        setPatientId(response.patientId); // Assuming the response includes patientId
      } catch (error) {
        setError(error.message);
      }
    };

    if (chatId) { // Ensure chatId is valid
      fetchMessages();
    }
  }, [chatId]);

  const handleSendMessage = async (message) => {
    try {
      await fetchFromPatient(`/chats/${chatId}/send-message`, { message },'POST');
      setMessages([...messages, { text: message, timestamp: new Date(), senderId: patientId }]);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="chat-window-container">
      <Header doctorName={doctorName} />
      <MessageList messages={messages} userId={patientId} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
