import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { FeatureCard } from '../components/FeatureCard';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for Features
const MicLangIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a7 7 0 01-7-7h14a7 7 0 01-7 7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.25 4.5L3 17" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8l-7.25 4.5L21 17" />
  </svg>
);
const BrainIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);
const ShieldCheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c2.978.535 5.956 2.576 8.051 5.626 1.572 2.38 2.378 5.068 2.378 7.726 0 2.705-.886 5.372-2.618 7.327-2.164 2.456-4.99 3.864-7.85 4.135-2.86-.271-5.686-1.679-7.85-4.135C2.108 20.088 1.222 17.421 1.222 14.716c0-2.658.806-5.346 2.378-7.726C5.044 5.52 8.022 3.479 11 2.944c.54-.097 1.09-.16 1.643-.16.553 0 1.103.063 1.643.16z" />
  </svg>
);
const ChatBubblesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);
const DevicesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-0.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const FeaturesPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.featureSectionTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        SamartAI is packed with innovative features designed to make scholarship discovery simple, accessible, and highly effective for every student.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<MicLangIcon />}
          title={messages.featureVoiceInput}
          description={messages.featureVoiceInputDesc}
        />
        <FeatureCard
          icon={<BrainIcon />}
          title={messages.featureIntentUnderstanding}
          description={messages.featureIntentUnderstandingDesc}
        />
        <FeatureCard
          icon={<ShieldCheckIcon />}
          title={messages.featureVerifiedData}
          description={messages.featureVerifiedDataDesc}
        />
        <FeatureCard
          icon={<ChatBubblesIcon />}
          title={messages.featureSimpleConversation}
          description={messages.featureSimpleConversationDesc}
        />
        <FeatureCard
          icon={<DevicesIcon />}
          title={messages.featureDualPlatform}
          description={messages.featureDualPlatformDesc}
        />
        {/* Placeholder for future features */}
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="Personalized Notifications (Coming Soon)"
          description="Receive alerts for new scholarships matching your profile and upcoming deadlines directly."
        />
      </div>
    </PageContainer>
  );
};
