import React, { useEffect, useRef } from 'react';
import { ChatMessage, GroundingSource } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoadingAIResponse: boolean;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.type === 'user';
  const isSystem = message.type === 'system';

  const bubbleClass = isUser
    ? 'bg-indigo-700 self-end rounded-br-none'
    : isSystem
      ? 'bg-gray-700 text-gray-300 italic text-sm self-center text-center'
      : 'bg-gray-800 self-start rounded-bl-none';

  const textClass = isUser ? 'text-white' : 'text-gray-100';

  const renderGroundingSources = (sources: GroundingSource[]) => (
    <div className="mt-2 text-xs text-gray-400">
      <p className="font-semibold mb-1">Sources:</p>
      <ul className="list-disc list-inside space-y-1">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:underline"
            >
              {source.title || source.uri}
            </a>
            {source.reviewSnippets && source.reviewSnippets.length > 0 && (
              <ul className="list-disc list-inside ml-4 text-gray-500">
                {source.reviewSnippets.map((snippet, sIndex) => (
                  <li key={sIndex}>{snippet}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className={`max-w-[85%] p-3 rounded-xl shadow-md ${bubbleClass} mb-4 relative flex flex-col`}
      style={{ overflowWrap: 'break-word' }}
    >
      <p className={`${textClass} whitespace-pre-wrap`}>{message.text}</p>
      {message.groundingSources && message.groundingSources.length > 0 &&
        renderGroundingSources(message.groundingSources)}
      <span className="text-xs text-gray-400 mt-1 self-end">{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoadingAIResponse }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingAIResponse]);

  return (
    <div className="flex-grow flex flex-col bg-gray-900 rounded-xl p-4 shadow-inner border border-gray-700 overflow-hidden">
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {isLoadingAIResponse && (
          <div className="flex justify-center my-4">
            <LoadingSpinner />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
