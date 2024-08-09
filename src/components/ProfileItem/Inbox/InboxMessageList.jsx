import React from 'react';
import './InboxMessageList.css';

const MessageList = ({ messages }) => {
  const userId=sessionStorage.getItem('userId')
  return (
    <div className="message-list-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-item ${msg.senderId === userId ? 'user-message' : 'doctor-message'}`}
        >
          <div
            className={`message-bubble ${msg.senderId == userId ? 'user-bubble' : 'doctor-bubble'}`}
          >
            {msg.text}
            {msg.file && <img src={URL.createObjectURL(msg.file)} alt="attachment" />}
          </div>
          <div className="message-timestamp">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
