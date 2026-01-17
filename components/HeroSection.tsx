import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { TELEGRAM_BOT_URL, USER_MESSAGES } from '../constants';
import { useAppContext } from '../context/AppContext';

// Telegram Icon SVG for the button
const TelegramIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.547 8.356l-3.212 10.457c-.222.72-.601.89-.98.508l-2.65-2.551-1.284 1.245c-.172.169-.304.298-.601.298l.211-2.613 4.88-4.43c.216-.197-.04-.308-.328-.109L8.27 12.825l-2.628-.806c-.702-.216-.714-.72-.14-.95L17.72 6.911c.563-.227 1.05.158.627.845z" />
  </svg>
);

export const HeroSection: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950 py-16 md:py-24 lg:py-32 text-white">
      {/* Abstract AI waves/grid pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 L 0 80" fill="none" stroke="#4F46E5" strokeWidth="1" opacity="0.1" />
            </pattern>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "rgba(79, 70, 229, 0.2)" }} /> {/* Indigo */}
              <stop offset="50%" style={{ stopColor: "rgba(139, 92, 246, 0.2)" }} /> {/* Violet */}
              <stop offset="100%" style={{ stopColor: "rgba(34, 197, 94, 0.2)" }} /> {/* Green */}
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M0,200 C150,100 350,300 600,200 S950,100 1200,200 V600 H0 Z" fill="url(#waveGradient)" />
          <path d="M0,250 C180,150 400,350 700,250 S1000,150 1200,250 V600 H0 Z" fill="url(#waveGradient)" opacity="0.6" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
        {/* Left Side: Headline and CTAs */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300">
            {messages.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            {messages.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <NavLink to="/discover">
              <Button size="lg" variant="accent">
                {messages.discoverScholarships}
              </Button>
            </NavLink>
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" icon={<TelegramIcon />}>
                {messages.tryOnTelegram}
              </Button>
            </a>
          </div>
        </div>

        {/* Right Side: Product Mockup / AI Illustration */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <img
            src="https://picsum.photos/600/400" // Placeholder for an AI illustration or product mockup
            alt="SamartAI Product Illustration"
            className="w-full max-w-md lg:max-w-xl rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border border-indigo-700/50"
          />
        </div>
      </div>
    </section>
  );
};
