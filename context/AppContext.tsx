import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { AppContextType, Language, ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        ...message,
      },
    ]);
  }, []);

  const value: AppContextType = {
    selectedLanguage,
    setSelectedLanguage,
    messages,
    setMessages,
    addMessage,
    isLoading,
    setIsLoading,
    isRecording,
    setIsRecording,
    error,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
