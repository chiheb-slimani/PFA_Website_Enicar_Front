import React from 'react';

const ChatHeader = ({ chat }) => {
  return (
    <div className="chat-header">
      <div className="chat-info">
        <div className="chat-icon">
          {chat?.role.includes("+") ? "👥" : "💬"}
        </div>
        <div>
          <h2>{chat?.name}</h2>
          <p className="chat-role">{chat?.role}</p>
        </div>
      </div>
      <div className="chat-actions">
        <button className="icon-button">
          <span className="icon">📞</span>
        </button>
        <button className="icon-button">
          <span className="icon">⋮</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;