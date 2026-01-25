import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoadingAIResponse: boolean;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[85%] px-5 py-3 rounded-2xl relative text-sm sm:text-base font-light leading-relaxed
        ${isUser 
          ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-500/20' 
          : 'bg-white/5 text-gray-200 border border-white/5 rounded-bl-none backdrop-blur-md'
        }
      `}>
        {message.text}
        <div className={`text-[10px] mt-1 opacity-50 ${isUser ? 'text-indigo-100' : 'text-gray-400'} text-right`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoadingAIResponse }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingAIResponse]);

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      
      {isLoadingAIResponse && (
        <div className="flex justify-start">
           <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
           </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
