import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

export const AboutPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.aboutTitle}
      </h1>
      <div className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed space-y-6">
        <p>
          {messages.aboutContent}
        </p>
        <p className="font-semibold text-xl text-indigo-300">
          {messages.missionStatement}
        </p>
        <p>
          Our team is passionate about leveraging technology to create equitable opportunities. We believe that no student should be left behind due to lack of information or complex application processes. By focusing on voice-first and multilingual interactions, we aim to reach students in every corner of India, making the journey to higher education smoother and more accessible.
        </p>
        <p>
          SamartAI is not just a tool; it's a commitment to a brighter future for the next generation of learners.
        </p>
      </div>
    </PageContainer>
  );
};
