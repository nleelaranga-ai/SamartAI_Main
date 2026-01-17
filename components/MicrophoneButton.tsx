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

  const buttonText = isRecording
    ? messages.microphoneListen
    : isLoading
      ? messages.microphoneProcessing
      : messages.microphoneTapToSpeak;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={onToggleRecording}
        disabled={isLoading && !isRecording} // Disable if loading and not currently recording
        className={`relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 animate-pulse-light'
              : isLoading
                ? 'bg-indigo-700 opacity-70 cursor-not-allowed'
                : 'bg-indigo-700 hover:bg-indigo-600 focus:ring-indigo-500 shadow-xl shadow-indigo-500/40'
          }
          focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900
        `}
      >
        <svg
          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${isRecording ? 'text-white' : 'text-teal-400'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 1c3.866 0 7 3.134 7 7v4c0 3.866-3.134 7-7 7S5 16.866 5 13v-4c0-3.866 3.134-7 7-7zm-1 16.963V22h2v-4.037c3.314-.386 6-3.111 6-6.463h-2c0 2.485-2.015 4.5-4.5 4.5S7.5 13.515 7.5 11.037H5c0 3.352 2.686 6.077 6 6.463z" />
        </svg>
      </button>
      <p className="mt-4 text-gray-300 text-lg sm:text-xl font-medium">
        {buttonText}
      </p>

      {/* Listening Animation (subtle pulse ring) */}
      {isRecording && (
        <div className="absolute inset-0 rounded-full bg-red-600 opacity-20 animate-ping-slow"></div>
      )}
    </div>
  );
};

// Define a custom keyframe animation for a subtle pulse
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse-light {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.03); opacity: 0.9; }
  }
  @keyframes ping-slow {
    0% { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(1.3); opacity: 0; }
  }
`;
document.head.appendChild(style);
