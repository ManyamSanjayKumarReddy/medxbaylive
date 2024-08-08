// MessageInput.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './InboxMessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiClick = (emojiObject) => {
    if (emojiObject && emojiObject.emoji) {
      setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="chat-input-container">
      <div className="emoji-picker-container">
        <FontAwesomeIcon
          icon={faSmile}
          className="icon smile-icon"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />
        {showEmojiPicker && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="icon paper-plane-icon"
        onClick={handleSendMessage}
      />
    </div>
  );
};

export default MessageInput;
