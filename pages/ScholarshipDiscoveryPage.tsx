import React, { useEffect, useState, useRef, useCallback } from 'react';
import { LanguageSelector } from '../components/LanguageSelector';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { SearchBar } from '../components/SearchBar';
import { ChatWindow } from '../components/ChatWindow';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAppContext } from '../context/AppContext';
import { ChatMessage, Scholarship } from '../types';
import { geminiService } from '../services/geminiService';
import { scholarshipService } from '../services/scholarshipService';
import { USER_MESSAGES, GEMINI_API_KEY_WARNING } from '../constants';
import { v4 as uuidv4 } from 'uuid';

export const ScholarshipDiscoveryPage: React.FC = () => {
  const {
    selectedLanguage,
    setSelectedLanguage,
    messages,
    addMessage,
    setMessages,
    isLoading,
    setIsLoading,
    isRecording,
    setIsRecording,
    setError,
  } = useAppContext();
  const messagesText = USER_MESSAGES[selectedLanguage];

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoadingScholarships, setIsLoadingScholarships] = useState(false);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false); // New state for streaming AI responses

  // Refs for tracking streaming messages
  const streamingMessageRef = useRef<ChatMessage | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  const updateStreamingMessage = useCallback((partialText: string) => {
    setMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.type === 'ai' && lastMessage.isStreaming) {
        return prevMessages.map(msg =>
          msg.id === lastMessage.id ? { ...msg, text: partialText } : msg
        );
      } else {
        const newMessage: ChatMessage = {
          id: uuidv4(),
          type: 'ai',
          text: partialText,
          timestamp: new Date().toISOString(),
          isStreaming: true,
        };
        streamingMessageRef.current = newMessage;
        return [...prevMessages, newMessage];
      }
    });
  }, [setMessages]);

  const handleGeminiServiceMessage = useCallback(
    (messageText: string, isFinal: boolean, functionCall?: any, groundingSources?: any[], audioBlob?: string) => {
      // If it's a streaming message and not final, update existing one
      if (!isFinal && streamingMessageRef.current) {
        updateStreamingMessage(messageText);
        return;
      }

      // Finalize the streaming message if it exists
      if (streamingMessageRef.current) {
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === streamingMessageRef.current?.id
              ? { ...msg, text: messageText, isStreaming: false, groundingSources: groundingSources }
              : msg
          )
        );
        streamingMessageRef.current = null;
      } else {
        // Add as a new message if it's a direct response or first chunk
        addMessage({
          type: 'ai',
          text: messageText,
          isStreaming: !isFinal,
          groundingSources: groundingSources,
        });
      }

      // Handle function calls
      if (functionCall) {
        if (functionCall.name === 'searchScholarships') {
          handleScholarshipSearch(functionCall.args);
        }
      }

      setIsLoadingAIResponse(false); // AI response processing is done
      setIsLoading(false);
    },
    [addMessage, setMessages, updateStreamingMessage, setIsLoading, setIsLoadingAIResponse]
  );

  const handleGeminiServiceTranscription = useCallback((text: string, type: 'input' | 'output') => {
    // Optionally display raw transcription in console or a debug area
    // console.log(`Transcription (${type}): ${text}`);
    // For now, we only update chat window with full message
  }, []);

  const handleGeminiServiceError = useCallback((error: Error) => {
    console.error("Gemini Service Error:", error);
    setError(messagesText.errorOccurred);
    setIsLoading(false);
    setIsRecording(false);
    setIsLoadingAIResponse(false);
    // Remove any incomplete streaming message
    setMessages(prevMessages => prevMessages.filter(msg => !(msg.type === 'ai' && msg.isStreaming)));
    streamingMessageRef.current = null;
  }, [setError, setIsLoading, setIsRecording, setIsLoadingAIResponse, setMessages, messagesText.errorOccurred]);


  // Initialize and clean up Gemini Service
  useEffect(() => {
    geminiService.setCallbacks({
      onMessage: handleGeminiServiceMessage,
      onPartialMessage: updateStreamingMessage,
      onScholarshipRequest: handleScholarshipSearch,
      onOpen: () => { console.log('Gemini session ready!'); setError(null); },
      onClose: (code, reason) => { console.log(`Gemini session closed: ${code} - ${reason}`); },
      onError: handleGeminiServiceError,
      onTranscription: handleGeminiServiceTranscription,
    });

    geminiService.connect(selectedLanguage);

    return () => {
      geminiService.close();
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.pause();
        audioPlaybackRef.current = null;
      }
    };
  }, [selectedLanguage, handleGeminiServiceMessage, updateStreamingMessage, handleGeminiServiceError, handleGeminiServiceTranscription]); // Reconnect if language changes


  // Toggle recording for microphone input
  const handleToggleRecording = () => {
    if (isLoadingAIResponse) return; // Prevent starting new recording while AI is processing

    if (isRecording) {
      geminiService.stopRecording();
      setIsRecording(false);
      setIsLoading(true); // Show loading while waiting for final AI response
      setIsLoadingAIResponse(true); // Indicate AI is processing
      addMessage({ type: 'user', text: messagesText.microphoneProcessing }); // Placeholder until actual transcription comes
    } else {
      setIsRecording(true);
      setError(null);
      geminiService.startRecording().catch((e) => {
        handleGeminiServiceError(new Error(messagesText.speechRecognitionError));
        setIsRecording(false);
      });
      // A message about listening will be added via transcription callback if enabled
    }
  };

  // Handle sending text message
  const handleSendMessage = (text: string) => {
    if (isLoading || isRecording || isLoadingAIResponse) return;
    addMessage({ type: 'user', text: text });
    setIsLoading(true);
    setIsLoadingAIResponse(true);
    setError(null);
    geminiService.sendTextMessage(text);
  };

  const handleScholarshipSearch = useCallback(async (searchArgs: any) => {
    setIsLoadingScholarships(true);
    setError(null);
    try {
      const foundScholarships = await scholarshipService.searchScholarships(searchArgs);
      setScholarships(foundScholarships);
      if (foundScholarships.length === 0) {
        addMessage({ type: 'system', text: messagesText.noScholarshipsFound });
      } else {
        addMessage({ type: 'system', text: `Found ${foundScholarships.length} scholarships matching your criteria.` });
      }
    } catch (e: any) {
      console.error("Scholarship search failed:", e);
      setError(messagesText.errorOccurred);
      addMessage({ type: 'system', text: messagesText.errorOccurred });
    } finally {
      setIsLoadingScholarships(false);
    }
  }, [addMessage, setError, messagesText.noScholarshipsFound, messagesText.errorOccurred]);

  const canInteract = !isLoadingAIResponse && !isLoadingScholarships;
  const isInputDisabled = isLoading || isRecording || isLoadingAIResponse;

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-100px)] py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white">
      {/* Left Column: Chat and Controls */}
      <div className="flex flex-col lg:w-2/5 xl:w-1/3 p-4 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-400">SamartAI Chat</h2>
          <LanguageSelector />
        </div>

        <ChatWindow messages={messages} isLoadingAIResponse={isLoadingAIResponse} />

        {error && (
          <div className="mt-4 p-3 bg-red-800 text-red-100 rounded-md text-sm text-center">
            {error}
            {(window as any).aistudio && typeof (window as any).aistudio.openSelectKey === 'function' && (
              <button
                onClick={() => (window as any).aistudio.openSelectKey()}
                className="ml-2 underline hover:text-red-500"
              >
                Select API Key
              </button>
            )}
            {!process.env.API_KEY && (
              <p className="mt-2 text-xs font-mono">{GEMINI_API_KEY_WARNING}</p>
            )}
          </div>
        )}

        <div className="flex flex-col items-center mt-6">
          <MicrophoneButton onToggleRecording={handleToggleRecording} isLoading={isLoadingAIResponse} />
          <SearchBar onSendMessage={handleSendMessage} isDisabled={isInputDisabled} />
        </div>
      </div>

      {/* Right Column: Scholarship Results */}
      <div className="flex-grow p-4 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-teal-400 mb-6 text-center lg:text-left">
          Scholarship Results
        </h2>

        {isLoadingScholarships ? (
          <div className="flex flex-col items-center justify-center h-48">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-300">{messagesText.loadingScholarships}</p>
          </div>
        ) : scholarships.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-16 h-16 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>{messagesText.noScholarshipsFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
