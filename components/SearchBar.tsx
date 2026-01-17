import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

interface SearchBarProps {
  onSendMessage: (message: string) => void;
  isDisabled: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSendMessage, isDisabled }) => {
  const [query, setQuery] = useState('');
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isDisabled) {
      onSendMessage(query.trim());
      setQuery('');
    }
  };

  const handleExampleClick = (example: string) => {
    if (!isDisabled) {
      setQuery(example);
      onSendMessage(example);
      setQuery('');
    }
  };

  const exampleQueries = [
    messages.exampleQuery1,
    messages.exampleQuery2,
    messages.exampleQuery3,
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="flex rounded-full bg-gray-800 shadow-lg shadow-indigo-500/20 border border-gray-700 overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={messages.chatPlaceholder}
          className="flex-grow p-4 text-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-0"
          disabled={isDisabled}
        />
        <button
          type="submit"
          className={`px-6 py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition-colors duration-200
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={isDisabled}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm mb-2">{messages.exampleQueries}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className={`px-4 py-2 text-sm rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors duration-200
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              disabled={isDisabled}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
