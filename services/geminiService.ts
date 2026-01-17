// services/geminiService.ts
import { GoogleGenAI, LiveServerMessage, Modality, Blob, GenerateContentResponse, FunctionDeclaration, Type } from '@google/genai';
import { GEMINI_API_KEY_WARNING } from '../constants';
import { GroundingSource } from '../types';

interface GeminiServiceCallbacks {
  onMessage: (message: string, isStreaming: boolean, functionCall?: any, groundingSources?: GroundingSource[], audioBlob?: string) => void;
  onPartialMessage: (partialText: string) => void;
  onScholarshipRequest: (query: string) => void; // Callback when AI requests scholarships
  onOpen: () => void;
  onClose: (code: number, reason: string) => void;
  onError: (error: Error) => void;
  onTranscription: (text: string, type: 'input' | 'output') => void;
}

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private sessionPromise: Promise<any> | null = null;
  private callbacks: GeminiServiceCallbacks | null = null;
  private isConnected = false;

  // Audio Contexts and Nodes for microphone input and speaker output
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private outputGainNode: GainNode | null = null;
  private inputMediaStream: MediaStream | null = null;
  private scriptProcessorNode: ScriptProcessorNode | null = null;
  private mediaStreamSource: MediaStreamAudioSourceNode | null = null;

  // Audio playback queue management
  private nextStartTime = 0;
  private audioSources = new Set<AudioBufferSourceNode>();

  private currentInputTranscription = '';
  private currentOutputTranscription = '';

  constructor() {
    this.initializeGenAI();
  }

  private initializeGenAI() {
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
      console.warn('API_KEY is not defined in process.env. Using dummy client. Full AI functionality may be limited.');
      // Optionally, you can throw an error or handle this state in your UI
      // For now, we'll allow an empty API_KEY for basic UI rendering.
      // A more robust app might gate functionality until a key is available.
      // A dummy GoogleGenAI instance won't work, so we rely on the host platform
      // to inject process.env.API_KEY as per guidelines.
      // If `window.aistudio` exists, check and prompt for API key selection.
      if ((window as any).aistudio && typeof (window as any).aistudio.hasSelectedApiKey === 'function') {
        (window as any).aistudio.hasSelectedApiKey().then((hasKey: boolean) => {
          if (!hasKey) {
            console.warn(GEMINI_API_KEY_WARNING);
          }
        });
      }
    }

    // Always create a new instance before making an API call to ensure the latest API_KEY
    // is used, especially after `openSelectKey()`.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public setCallbacks(callbacks: GeminiServiceCallbacks) {
    this.callbacks = callbacks;
  }

  // Helper functions for audio encoding/decoding
  private encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private async decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  private createPcmBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: this.encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  // Function to define tools for the Gemini model
  private getTools(): FunctionDeclaration[] {
    return [
      {
        name: 'searchScholarships',
        parameters: {
          type: Type.OBJECT,
          description: 'Search for scholarships based on various criteria like category, income, study field, location, etc.',
          properties: {
            query: {
              type: Type.STRING,
              description: 'The user\'s query or intent for scholarship search, e.g., "scholarships for engineering students from low-income families in Hyderabad". This should be a comprehensive summary of the user\'s needs.',
            },
            category: {
              type: Type.STRING,
              description: 'Optional. Filter by social category (e.g., SC, ST, BC, Minority, General).',
            },
            incomeLimit: {
              type: Type.NUMBER,
              description: 'Optional. Filter by annual family income limit (e.g., 200000 for ₹2 Lakhs).',
            },
            studyField: {
              type: Type.STRING,
              description: 'Optional. Filter by field of study (e.g., Engineering, Medicine, Arts, Science).',
            },
            location: {
              type: Type.STRING,
              description: 'Optional. Filter by state or city (e.g., "Andhra Pradesh", "Hyderabad").',
            },
            gender: {
              type: Type.STRING,
              description: 'Optional. Filter by gender (e.g., "male", "female", "other").',
            },
            educationLevel: {
              type: Type.STRING,
              description: 'Optional. Filter by education level (e.g., "undergraduate", "postgraduate", "diploma").',
            },
          },
          required: ['query'],
        },
      },
      // You can add other tools here if needed, e.g., for general web search or maps
      // { googleSearch: {} },
      // {
      //   googleMaps: {},
      //   // For maps, you might also want to include user's current location if available
      //   // toolConfig: {
      //   //   retrievalConfig: {
      //   //     latLng: {
      //   //       latitude: 37.78193,
      //   //       longitude: -122.40476
      //   //     }
      //   //   }
      //   // }
      // }
    ];
  }


  public async connect(language: string) {
    if (!this.ai) {
      this.initializeGenAI(); // Re-initialize in case API_KEY becomes available
      if (!this.ai || !this.ai.apiKey) {
        this.callbacks?.onError(new Error("API Key is missing or invalid. Please ensure it's configured."));
        return;
      }
    }

    if (this.isConnected) {
      console.warn("Gemini Live session is already connected. Closing existing session before re-connecting.");
      this.close(); // Ensure previous session is closed
    }

    try {
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      this.outputGainNode = this.outputAudioContext.createGain();
      this.outputGainNode.connect(this.outputAudioContext.destination);

      const systemInstruction = `You are SamartAI, a friendly and knowledgeable AI assistant specializing in government scholarships for students in India, especially from rural and semi-urban areas. Your primary goal is to help users discover relevant scholarships by understanding their needs through conversational queries, including voice input.
      Always respond in a friendly, guiding, and encouraging tone.
      When asked for scholarships, utilize the 'searchScholarships' tool. Provide clear and concise answers.
      Support English, Telugu, and Hindi. When responding, use the user's preferred language if possible.
      Maintain a helpful, non-bureaucratic demeanor.
      Current preferred language for response is ${language}.`;

      this.sessionPromise = this.ai!.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.debug('Gemini Live session opened');
            this.isConnected = true;
            this.callbacks?.onOpen();
            // Reset transcription
            this.currentInputTranscription = '';
            this.currentOutputTranscription = '';
          },
          onmessage: async (message: LiveServerMessage) => {
            console.debug('Gemini Live message:', message);

            // Handle function calls first
            if (message.toolCall && message.toolCall.functionCalls && message.toolCall.functionCalls.length > 0) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'searchScholarships' && fc.args) {
                  console.log('Function call: searchScholarships with args:', fc.args);
                  this.callbacks?.onScholarshipRequest(fc.args.query || ''); // Pass the query for now
                  // Acknowledge function call to the model
                  this.sessionPromise?.then((session) => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: "Scholarship search initiated based on your criteria." },
                      },
                    });
                  });
                } else if ((message as any).toolCall.googleSearch) {
                  // Handle Google Search if enabled
                  console.log('Google Search tool called.');
                  this.sessionPromise?.then((session) => {
                    session.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { result: "Google Search executed." },
                      },
                    });
                  });
                }
                // Pass function call info to UI
                this.callbacks?.onMessage(`Function called: ${fc.name} with args: ${JSON.stringify(fc.args)}`, false, fc);
              }
            }

            // Handle text transcription
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              this.currentOutputTranscription += text;
              this.callbacks?.onTranscription(text, 'output');
              this.callbacks?.onPartialMessage(this.currentOutputTranscription);
            }
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              this.currentInputTranscription += text;
              this.callbacks?.onTranscription(text, 'input');
            }

            // If a turn is complete, finalize the messages
            if (message.serverContent?.turnComplete) {
              if (this.currentInputTranscription) {
                // If the user's turn was transcribed, ensure it's added to history
                this.callbacks?.onMessage(this.currentInputTranscription, false, undefined, undefined, undefined);
                this.currentInputTranscription = '';
              }
              if (this.currentOutputTranscription) {
                // Finalize AI's spoken/text response
                const groundingSources: GroundingSource[] = [];
                if (message.serverContent?.groundingMetadata?.groundingChunks) {
                  for (const chunk of message.serverContent.groundingMetadata.groundingChunks) {
                    if (chunk.web) groundingSources.push({ type: 'web', uri: chunk.web.uri, title: chunk.web.title });
                    if (chunk.maps) groundingSources.push({ type: 'maps', uri: chunk.maps.uri, title: chunk.maps.title, reviewSnippets: chunk.maps.placeAnswerSources?.reviewSnippets });
                  }
                }
                this.callbacks?.onMessage(this.currentOutputTranscription, false, undefined, groundingSources);
                this.currentOutputTranscription = '';
              }
            }


            // Handle audio output
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64EncodedAudioString && this.outputAudioContext && this.outputGainNode) {
              this.nextStartTime = Math.max(
                this.nextStartTime,
                this.outputAudioContext.currentTime,
              );
              try {
                const audioBuffer = await this.decodeAudioData(
                  this.decode(base64EncodedAudioString),
                  this.outputAudioContext,
                  24000, // Sample rate for output audio
                  1,     // Mono channel
                );
                const source = this.outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.outputGainNode);
                source.addEventListener('ended', () => {
                  this.audioSources.delete(source);
                });

                source.start(this.nextStartTime);
                this.nextStartTime = this.nextStartTime + audioBuffer.duration;
                this.audioSources.add(source);
              } catch (audioError) {
                console.error("Error decoding or playing audio:", audioError);
              }
            }

            // Handle interruption (stop current playback)
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of this.audioSources.values()) {
                source.stop();
                this.audioSources.delete(source);
              }
              this.nextStartTime = 0;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Gemini Live error:', e.error);
            this.callbacks?.onError(e.error as Error);
            this.isConnected = false;
            // Handle API key specific errors
            if (e.error?.message?.includes("Requested entity was not found.")) {
                this.callbacks?.onError(new Error("API Key might be invalid or not selected for the model. Please check billing or select a key."));
                // Trigger API key selection if window.aistudio exists
                if ((window as any).aistudio && typeof (window as any).aistudio.openSelectKey === 'function') {
                  (window as any).aistudio.openSelectKey();
                }
            }
          },
          onclose: (e: CloseEvent) => {
            console.debug('Gemini Live session closed', e.code, e.reason);
            this.isConnected = false;
            this.callbacks?.onClose(e.code, e.reason);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO], // Must be an array with a single `Modality.AUDIO` element.
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }, // Zephyr, Puck, Charon, Kore, Fenrir
          },
          systemInstruction: systemInstruction,
          inputAudioTranscription: {}, // Enable transcription for user input audio.
          outputAudioTranscription: {}, // Enable transcription for model output audio.
          tools: [{ functionDeclarations: this.getTools() }], // Include function declarations
          // Add googleSearch or googleMaps if needed:
          // tools: [{ googleSearch: {} }],
          // tools: [{ googleMaps: {}, googleSearch: {} }],
        },
      });

      await this.sessionPromise; // Wait for session to connect
    } catch (e: any) {
      console.error("Failed to connect to Gemini Live:", e);
      this.callbacks?.onError(e);
      this.isConnected = false;
    }
  }

  public async startRecording() {
    if (!this.isConnected || !this.inputAudioContext) {
      console.error("Gemini Live not connected or audio context not initialized.");
      this.callbacks?.onError(new Error("AI connection not ready."));
      return;
    }

    try {
      this.inputMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStreamSource = this.inputAudioContext.createMediaStreamSource(this.inputMediaStream);
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

      this.scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
        const pcmBlob = this.createPcmBlob(inputData);
        this.sessionPromise?.then((session) => {
          session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      this.mediaStreamSource.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.inputAudioContext.destination);
      console.log("Recording started.");
    } catch (e: any) {
      console.error("Failed to start recording:", e);
      this.callbacks?.onError(new Error(`Microphone access denied or error: ${e.message}`));
    }
  }

  public stopRecording() {
    if (this.inputMediaStream) {
      this.inputMediaStream.getTracks().forEach(track => track.stop());
      this.inputMediaStream = null;
    }
    if (this.mediaStreamSource) {
      this.mediaStreamSource.disconnect();
      this.mediaStreamSource = null;
    }
    if (this.scriptProcessorNode) {
      this.scriptProcessorNode.disconnect();
      this.scriptProcessorNode.onaudioprocess = null;
      this.scriptProcessorNode = null;
    }
    console.log("Recording stopped.");
  }

  public async sendTextMessage(text: string) {
    if (!this.isConnected) {
      this.callbacks?.onError(new Error("Gemini Live session not connected."));
      return;
    }
    this.currentInputTranscription = text; // Set input transcription for text messages
    this.sessionPromise?.then((session) => {
      session.sendRealtimeInput({ message: text });
    });
  }

  public close() {
    if (this.isConnected) {
      this.sessionPromise?.then((session) => {
        session.close();
      });
    }
    this.stopRecording();
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
    this.inputAudioContext = null;
    this.outputAudioContext = null;
    this.outputGainNode = null;
    this.isConnected = false;
    this.sessionPromise = null;
  }
}

export const geminiService = new GeminiService();
