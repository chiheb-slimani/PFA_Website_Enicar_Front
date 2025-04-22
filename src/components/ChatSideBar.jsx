import React from 'react';

const ChatSidebar = ({ chats, activeChat, onChatSelect }) => {
  return (
    <div className="chat-sidebar">
      <h2>Conversations</h2>
      <div className="chat-list">
        {chats.map(chat => (
          <div 
            key={chat.id}
            className={`chat-item ${chat.id === activeChat ? 'active' : ''}`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="chat-icon-small">
              {chat.role.includes("+") ? "👥" : "💬"}
            </div>
            <div className="chat-details">
              <h3>{chat.name}</h3>
              <p className="chat-preview">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="unread-badge">{chat.unread}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;