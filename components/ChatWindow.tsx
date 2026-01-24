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
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-[85%] sm:max-w-[75%] px-5 py-4 rounded-2xl shadow-lg relative
        ${isUser 
          ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-br-none' 
          : 'bg-gray-800/90 text-gray-100 border border-gray-700/50 rounded-bl-none backdrop-blur-sm'
        }
      `}>
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-light">
           {message.text} 
        </div>
        <div className={`text-[10px] mt-2 opacity-60 ${isUser ? 'text-indigo-100' : 'text-gray-400'} text-right`}>
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
    <div className="flex flex-col space-y-2">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}
      
      {isLoadingAIResponse && (
        <div className="flex justify-start animate-pulse">
          <div className="bg-gray-800/50 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-700/30 flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
