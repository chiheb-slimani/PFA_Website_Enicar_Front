import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ChatSidebar from '../components/ChatSideBar';
import '../Css/MessageriePage.css';

const MessageriePage = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Dr. Sami Kallel",
      role: "Encadrant",
      unread: 0,
      lastMessage: "Revue de progression demain à 10h"
    },
    {
      id: 2,
      name: "Amina Ben Ahmed",
      role: "Binôme",
      unread: 2,
      lastMessage: "J'ai mis à jour le document partagé"
    },
    {
      id: 3,
      name: "Groupe PFA",
      role: "Encadrant + Binôme",
      unread: 1,
      lastMessage: "Amina: Voici les dernières modifications"
    }
  ]);

  const [activeChat, setActiveChat] = useState(3); // Default to group chat
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const sampleMessages = {
      1: [
        { id: 1, sender: "Dr. Sami Kallel", text: "Votre analyse préliminaire est très prometteuse", time: "09:30", isMe: false },
        { id: 2, sender: "Moi", text: "Merci, je travaille sur les recommandations", time: "09:35", isMe: true }
      ],
      2: [
        { id: 1, sender: "Amina Ben Ahmed", text: "Peux-tu vérifier la section 3.2?", time: "14:15", isMe: false },
        { id: 2, sender: "Moi", text: "Je la revois ce soir", time: "14:20", isMe: true }
      ],
      3: [
        { id: 1, sender: "Dr. Sami Kallel", text: "Bonjour à tous, où en êtes-vous?", time: "10:00", isMe: false },
        { id: 2, sender: "Amina Ben Ahmed", text: "Je viens de terminer l'analyse des données", time: "10:05", isMe: false },
        { id: 3, sender: "Moi", text: "Je travaille sur la documentation", time: "10:10", isMe: true }
      ]
    };
    setMessages(sampleMessages[activeChat] || []);
    setChats(chats.map(chat => 
      chat.id === activeChat ? { ...chat, unread: 0 } : chat
    ));
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "Moi",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="messagerie-container">
      <ChatSidebar 
        chats={chats} 
        activeChat={activeChat} 
        onChatSelect={setActiveChat} 
      />
      
      <div className="chat-main">
        <ChatHeader 
          chat={chats.find(chat => chat.id === activeChat)} 
        />
        
        <MessageList 
          messages={messages} 
          messagesEndRef={messagesEndRef} 
          isGroupChat={activeChat === 3}
        />
        
        <MessageInput 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSendMessage}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />
      </div>
    </div>
  );
};

export default MessageriePage;