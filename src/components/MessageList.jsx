import React from 'react';

const MessageList = ({ messages, messagesEndRef, isGroupChat }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`message ${message.isMe ? 'me' : 'other'}`}
        >
          {(isGroupChat && !message.isMe) && (
            <div className="message-sender">{message.sender}</div>
          )}
          <div className="message-bubble">
            <div className="message-text">{message.text}</div>
            <div className="message-time">{message.time}</div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;