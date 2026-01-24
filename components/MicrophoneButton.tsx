import React from 'react';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

interface MicrophoneButtonProps {
  onToggleRecording: () => void;
  isLoading: boolean;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ onToggleRecording, isLoading }) => {
  const { isRecording, selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={onToggleRecording}
        disabled={isLoading && !isRecording}
        className={`
          relative flex items-center justify-center
          w-10 h-10 rounded-full transition-all duration-300 ease-in-out
          ${isRecording 
            ? 'bg-red-500/20 text-red-500 ring-2 ring-red-500 animate-pulse' 
            : 'bg-gray-800 text-teal-400 hover:bg-gray-700 hover:text-teal-300 hover:scale-105 border border-gray-700'
          }
        `}
        title={isRecording ? messages.microphoneListen : messages.microphoneTapToSpeak}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1c3.866 0 7 3.134 7 7v4c0 3.866-3.134 7-7 7S5 16.866 5 13v-4c0-3.866 3.134-7 7-7zm-1 16.963V22h2v-4.037c3.314-.386 6-3.111 6-6.463h-2c0 2.485-2.015 4.5-4.5 4.5S7.5 13.515 7.5 11.037H5c0 3.352 2.686 6.077 6 6.463z" />
        </svg>
        
        {/* Futuristic Glow Effect */}
        {isRecording && (
          <span className="absolute inset-0 rounded-full bg-red-500 blur-md opacity-40 animate-ping"></span>
        )}
      </button>
    </div>
  );
};
