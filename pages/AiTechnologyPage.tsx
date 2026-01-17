import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { FeatureCard } from '../components/FeatureCard';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for AI & Technology
const NLPLLMIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);
const VoiceRecognitionIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const DataIntegrationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-1m4 1v-1M20 5V3H4v2m16 0c0 1.5-4 4-8 4S4 6.5 4 5m16 0v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5" />
  </svg>
);
const ScalabilityIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 005-5V7a5 5 0 00-5-5H7a5 5 0 00-5 5v2m0 0l3 3m-3-3l-3 3m0 0l3 3m0 0h18" />
  </svg>
);

export const AiTechnologyPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.aiTechTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        {messages.aiTechIntro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<NLPLLMIcon />}
          title={messages.aiTechNLPLM}
          description={messages.aiTechNLPLMDesc}
        />
        <FeatureCard
          icon={<VoiceRecognitionIcon />}
          title={messages.aiTechVoiceRecognition}
          description={messages.aiTechVoiceRecognitionDesc}
        />
        <FeatureCard
          icon={<DataIntegrationIcon />}
          title={messages.aiTechDataIntegration}
          description={messages.aiTechDataIntegrationDesc}
        />
        <FeatureCard
          icon={<ScalabilityIcon />}
          title={messages.aiTechScalability}
          description={messages.aiTechScalabilityDesc}
        />
        {/* Placeholder for other tech aspects */}
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          title="Ethical AI & Bias Mitigation"
          description="Committed to fair and unbiased recommendations, continuously refining models to ensure equitable access for all."
        />
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4H20a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
          }
          title="Cloud-Native Infrastructure"
          description="Leveraging robust cloud infrastructure for high availability, security, and global reach, ensuring seamless service delivery."
        />
      </div>
    </PageContainer>
  );
};
