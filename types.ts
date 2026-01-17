// types.ts
import React from 'react'; // Fix: Import React for React.Dispatch type

export type Language = 'en' | 'te' | 'hi'; // English, Telugu, Hindi

export interface Scholarship {
  id: string;
  name: string;
  category: string; // e.g., SC/ST/BC/Minority
  incomeLimit: number; // in INR
  description: string;
  applyLink: string;
  eligibilityCriteria?: string[];
  documentsRequired?: string[];
  deadline?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  isStreaming?: boolean; // For AI responses that are being streamed
  spokenAudioUrl?: string; // URL for playing back AI's spoken response
  functionCall?: any; // For AI function calls
  groundingSources?: GroundingSource[];
}

export interface GroundingSource {
  type: 'web' | 'maps';
  uri: string;
  title?: string;
  reviewSnippets?: string[]; // For maps grounding reviews
}

export interface AppContextType {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}