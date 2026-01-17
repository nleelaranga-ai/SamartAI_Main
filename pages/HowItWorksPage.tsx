import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for How It Works steps
const Step1Icon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a7 7 0 01-7-7h14a7 7 0 01-7 7z" />
  </svg>
);
const Step2Icon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);
const Step3Icon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const HowItWorksPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.howItWorksTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        {messages.howItWorksIntro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12">
        {/* Step 1 */}
        <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-teal-400 mb-6 bg-indigo-700/30 rounded-full p-4">
            <Step1Icon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{messages.speakOrType}</h2>
          <p className="text-gray-300 text-center text-base">
            {messages.speakOrTypeDesc}
          </p>
          <div className="absolute -bottom-5 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-gray-900">
            1
          </div>
        </div>

        {/* Arrow for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center relative">
          <div className="absolute w-full h-1 bg-indigo-700 top-1/2 -translate-y-1/2"></div>
          <svg className="absolute w-8 h-8 text-indigo-700 top-1/2 -translate-y-1/2 right-0 -mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Arrow for Mobile (Rotated) */}
        <div className="md:hidden flex flex-col items-center justify-center relative mt-8">
          <div className="absolute h-full w-1 bg-indigo-700 left-1/2 -translate-x-1/2"></div>
          <svg className="absolute w-8 h-8 text-indigo-700 bottom-0 left-1/2 -translate-x-1/2 -mb-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-teal-400 mb-6 bg-indigo-700/30 rounded-full p-4">
            <Step2Icon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{messages.aiUnderstands}</h2>
          <p className="text-gray-300 text-center text-base">
            {messages.aiUnderstandsDesc}
          </p>
          <div className="absolute -bottom-5 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-gray-900">
            2
          </div>
        </div>

        {/* Arrow for Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center relative">
          <div className="absolute w-full h-1 bg-indigo-700 top-1/2 -translate-y-1/2"></div>
          <svg className="absolute w-8 h-8 text-indigo-700 top-1/2 -translate-y-1/2 right-0 -mr-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Arrow for Mobile (Rotated) */}
        <div className="md:hidden flex flex-col items-center justify-center relative mt-8">
          <div className="absolute h-full w-1 bg-indigo-700 left-1/2 -translate-x-1/2"></div>
          <svg className="absolute w-8 h-8 text-indigo-700 bottom-0 left-1/2 -translate-x-1/2 -mb-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-teal-400 mb-6 bg-indigo-700/30 rounded-full p-4">
            <Step3Icon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{messages.scholarshipsShownInstantly}</h2>
          <p className="text-gray-300 text-center text-base">
            {messages.scholarshipsShownInstantlyDesc}
          </p>
          <div className="absolute -bottom-5 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-gray-900">
            3
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
