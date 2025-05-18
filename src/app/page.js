'use client';
import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';
import './globals.css';

export default function Home() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userInput) => {
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
  };

  return (
    <main className="chat-container">
      <h1 className="header">AI Chatbot</h1>
      <ChatWindow messages={messages} />
      <InputBox onSend={sendMessage} />
    </main>
  );
}
