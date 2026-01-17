import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeatureCard } from '../components/FeatureCard';
import { TrustIndicator } from '../components/TrustIndicator';
import { Button } from '../components/Button';
import { NavLink } from 'react-router-dom';
import { TELEGRAM_BOT_URL, USER_MESSAGES } from '../constants';
import { useAppContext } from '../context/AppContext';

// Icons (simple SVGs for demonstration)
const LightbulbIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17H5.25a2.25 2.25 0 01-2.25-2.25V9.375c0-1.036.84-1.875 1.875-1.875h1.263V5.25a2.25 2.25 0 012.25-2.25s1.12.872 1.974 2.684l.743 1.503a4.5 4.5 0 004.572 2.01l.147-.073A.75.75 0 0121 9.426v5.35c0 1.036-.84 1.875-1.875 1.875H15.68a2.25 2.25 0 01-2.244 2.025.75.75 0 00-1.465.175L9.663 17z" />
  </svg>
);
const MicrophoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a7 7 0 01-7-7h14a7 7 0 01-7 7z" />
  </svg>
);
const VerifiedIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const WebIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4H20a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);
const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);
const SpeakIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const AiBrainIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);
const StarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
    <path d="M12 .587l3.64 7.553L24 9.712l-6 5.823 1.42 8.272L12 18.897l-7.42 3.01L6 15.535l-6-5.823 8.36-1.572L12 .587z"/>
  </svg>
);
const ShieldIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c2.978.535 5.956 2.576 8.051 5.626 1.572 2.38 2.378 5.068 2.378 7.726 0 2.705-.886 5.372-2.618 7.327-2.164 2.456-4.99 3.864-7.85 4.135-2.86-.271-5.686-1.679-7.85-4.135C2.108 20.088 1.222 17.421 1.222 14.716c0-2.658.806-5.346 2.378-7.726C5.044 5.52 8.022 3.479 11 2.944c.54-.097 1.09-.16 1.643-.16.553 0 1.103.063 1.643.16z" />
  </svg>
);
const NoAdsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);


export const HomePage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white">
      <HeroSection />

      {/* What SamartAI Does Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-400">
          {messages.whatSamartAIDoes}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<LightbulbIcon />}
            title={messages.aiScholarshipDiscovery}
            description={messages.aiScholarshipDiscoveryDesc}
          />
          <FeatureCard
            icon={<MicrophoneIcon />}
            title={messages.voiceVernacularSearch}
            description={messages.voiceVernacularSearchDesc}
          />
          <FeatureCard
            icon={<VerifiedIcon />}
            title={messages.verifiedGovernmentSchemes}
            description={messages.verifiedGovernmentSchemesDesc}
          />
        </div>
      </section>

      {/* Dual Performance Highlight Section */}
      <section className="bg-gradient-to-br from-gray-900 to-indigo-900 px-4 py-16 md:py-24 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-400">
            {messages.dualPerformanceHighlight}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<WebIcon />}
              title={messages.useOnWeb}
              description={messages.useOnWebDesc}
            />
            <FeatureCard
              icon={<ChatIcon />}
              title={messages.useOnTelegram}
              description={messages.useOnTelegramDesc}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-400">
          {messages.howItWorks}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-teal-400 mb-4 text-5xl flex justify-center items-center w-16 h-16 rounded-full bg-indigo-700/30 mx-auto">
              <SpeakIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{messages.speakOrType}</h3>
            <p className="text-gray-300">{messages.speakOrTypeDesc}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-teal-400 mb-4 text-5xl flex justify-center items-center w-16 h-16 rounded-full bg-indigo-700/30 mx-auto">
              <AiBrainIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{messages.aiUnderstands}</h3>
            <p className="text-gray-300">{messages.aiUnderstandsDesc}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-teal-400 mb-4 text-5xl flex justify-center items-center w-16 h-16 rounded-full bg-indigo-700/30 mx-auto">
              <StarIcon />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{messages.scholarshipsShownInstantly}</h3>
            <p className="text-gray-300">{messages.scholarshipsShownInstantlyDesc}</p>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-16 md:py-24 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-400">
            {messages.trustIndicators}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TrustIndicator
              icon={<AiBrainIcon />}
              text={messages.poweredByAI}
            />
            <TrustIndicator
              icon={<ShieldIcon />}
              text={messages.verifiedData}
            />
            <TrustIndicator
              icon={<NoAdsIcon />}
              text={messages.noAds}
            />
          </div>
        </div>
      </section>

      {/* Call to Action for Scholarship Discovery */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Ready to find your perfect scholarship?
        </h2>
        <NavLink to="/discover">
          <Button size="lg" variant="accent">
            {messages.discoverScholarships}
          </Button>
        </NavLink>
      </section>
    </div>
  );
};
