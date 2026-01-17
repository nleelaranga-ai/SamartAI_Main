import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for Contact options
const EmailIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.25 4.5L3 17V8zm0-3h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zm18 0L12 12 3 5" />
  </svg>
);
const PartnershipIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4L4 8l7 4 7-4-7-4zm0 8l-7 4m7-4l7 4m-7 4L4 16l7 4 7-4-7-4zm0 0l-7 4m7-4l7 4" />
  </svg>
);
const FeedbackIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
  </svg>
);
const JoinUsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.5V7.25c0-.69-.56-1.25-1.25-1.25H4.25c-.69 0-1.25.56-1.25 1.25v9.5c0 .69.56 1.25 1.25 1.25H10.5M15 13.5a3 3 0 11-6 0 3 3 0 016 0zm3 0a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ContactPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.contactTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        {messages.contactIntro}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Email Us */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center text-center hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-indigo-400 bg-indigo-700/30 rounded-full p-4 mb-4">
            <EmailIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{messages.contactEmail}</h2>
          <p className="text-gray-300 mb-4">
            For general inquiries and information.
          </p>
          <a href="mailto:contact@samartai.com">
            <Button variant="accent" size="sm">
              Send Email
            </Button>
          </a>
        </div>

        {/* Partnerships */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center text-center hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-indigo-400 bg-indigo-700/30 rounded-full p-4 mb-4">
            <PartnershipIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{messages.contactPartnerships}</h2>
          <p className="text-gray-300 mb-4">
            Explore collaboration opportunities to amplify our impact.
          </p>
          <a href="mailto:partnerships@samartai.com">
            <Button variant="accent" size="sm">
              Partner with Us
            </Button>
          </a>
        </div>

        {/* Feedback & Support */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center text-center hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-indigo-400 bg-indigo-700/30 rounded-full p-4 mb-4">
            <FeedbackIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{messages.contactFeedback}</h2>
          <p className="text-gray-300 mb-4">
            Share your thoughts or seek assistance with the platform.
          </p>
          <a href="mailto:support@samartai.com">
            <Button variant="accent" size="sm">
              Provide Feedback
            </Button>
          </a>
        </div>

        {/* Join Our Mission */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center text-center hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="text-indigo-400 bg-indigo-700/30 rounded-full p-4 mb-4">
            <JoinUsIcon />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{messages.contactJoinUs}</h2>
          <p className="text-gray-300 mb-4">
            {messages.contactJoinUsDesc}
          </p>
          <a href="mailto:careers@samartai.com">
            <Button variant="accent" size="sm">
              Join Our Team
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-400 text-sm">
        <p>We typically respond within 1-2 business days.</p>
        <p>Thank you for your interest in SamartAI!</p>
      </div>
    </PageContainer>
  );
};
