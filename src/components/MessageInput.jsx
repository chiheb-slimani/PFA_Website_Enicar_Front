import React from 'react';

const MessageInput = ({ value, onChange, onSend, onKeyPress }) => {
  return (
    <div className="message-input">
      <div className="input-wrapper">
        <textarea
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder="Écrivez votre message..."
          rows="1"
        />
        <button 
          className="send-button" 
          onClick={onSend}
          disabled={!value.trim()}
          title="Envoyer"
        >
          <i className="icon-send">📨</i>
        </button>
      </div>
      <div className="input-actions">
        <button className="attachment-button">
          <i className="icon-attach">📎</i> Fichier
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
