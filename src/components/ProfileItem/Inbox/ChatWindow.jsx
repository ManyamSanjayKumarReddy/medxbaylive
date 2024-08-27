import React from 'react';
import Header from './InboxHeader';
import MessageList from './InboxMessageList';
import MessageInput from './InboxMessageInput';
import './ChatWindow.css';

const ChatWindow = ({ chatId, doctorName, image, messages, error, patientId, onSendMessage }) => {
  const userId = sessionStorage.getItem('userId');

  const handleSendMessage = async (message) => {
    try {
      await onSendMessage(message);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`chat-window-container ${chatId ? 'active' : ''}`}>
      <Header doctorName={doctorName} image={image} />
      {chatId ? (
        <>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <>
        <div className="placeholder-message">
          <p className='btn btn-primary'>Select a chat to begin your consultation</p>
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;
