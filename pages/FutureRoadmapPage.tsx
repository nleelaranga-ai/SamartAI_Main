import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for Roadmap items
const WhatsAppIcon: React.FC = () => (
  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.832 17.618c-.469 0-.96-.134-1.396-.395l-.946-.576c-.435-.262-.96-.409-1.503-.409-.544 0-1.069.147-1.504.409l-.946.576c-.436.261-.927.395-1.396.395-1.043 0-1.896-.757-1.896-1.684 0-.926.853-1.684 1.896-1.684.469 0 .96.134 1.396.395l.946.576c.435.262.96.409 1.503.409.544 0 1.069-.147 1.504-.409l.946-.576c.436-.261.927-.395 1.396-.395 1.043 0 1.896.757 1.896 1.684 0 .926-.853 1.684-1.896 1.684zm-3.832-6.575c-1.55 0-2.916 1.265-2.916 2.815 0 1.55 1.366 2.815 2.916 2.815 1.55 0 2.916-1.265 2.916-2.815 0-1.55-1.366-2.815-2.916-2.815zm-2.148-1.594l.872.502c.319.184.704.288 1.106.288.402 0 .788-.104 1.106-.288l.872-.502c.287-.165.626-.067.79.22.164.287.067.626-.22.79l-.872.502c-.52.299-1.11.464-1.78.464-.67 0-1.26-.165-1.78-.464l-.872-.502c-.287-.165-.384-.504-.22-.79.164-.287.503-.384.79-.22z" />
    <path fillRule="evenodd" d="M12 21.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5zm.082-14.717c-1.571 0-2.848 1.277-2.848 2.848 0 1.571 1.277 2.848 2.848 2.848 1.571 0 2.848-1.277 2.848-2.848 0-1.571-1.277-2.848-2.848-2.848z" clipRule="evenodd" />
  </svg>
);
const OcrIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const VoiceOnlyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a7 7 0 01-7-7h14a7 7 0 01-7 7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const LowBandwidthIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v4m-7 4h14a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const MoreLanguagesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4H20a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L5.757 17.25c-.234.664.04 1.385.642 1.704l5.341 2.822c.381.202.83.202 1.211 0l5.341-2.822c.602-.319.876-1.04.642-1.704L12 2.25z" />
  </svg>
);


interface RoadmapItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ icon, title, description, isComingSoon = false }) => (
  <div className="flex items-start space-x-6">
    <div className="flex-shrink-0 text-teal-400 bg-indigo-700/30 rounded-full p-3 shadow-md">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
        {isComingSoon && <span className="ml-3 px-3 py-1 text-xs font-bold bg-purple-600 rounded-full">Coming Soon</span>}
      </h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

export const FutureRoadmapPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.roadmapTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        {messages.roadmapIntro}
      </p>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-700 h-full hidden lg:block"></div>

        <div className="space-y-12 lg:space-y-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
            <div className="lg:w-5/12">
              <RoadmapItem
                icon={<WhatsAppIcon />}
                title={messages.roadmapWhatsApp}
                description={messages.roadmapWhatsAppDesc}
                isComingSoon
              />
            </div>
            <div className="hidden lg:block lg:w-1/12 text-center">
              <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-indigo-700 mx-auto"></div>
            </div>
            <div className="lg:w-5/12 hidden lg:block"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
            <div className="lg:w-5/12 hidden lg:block"></div>
            <div className="hidden lg:block lg:w-1/12 text-center">
              <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-indigo-700 mx-auto"></div>
            </div>
            <div className="lg:w-5/12">
              <RoadmapItem
                icon={<OcrIcon />}
                title={messages.roadmapOCR}
                description={messages.roadmapOCRDesc}
                isComingSoon
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
            <div className="lg:w-5/12">
              <RoadmapItem
                icon={<VoiceOnlyIcon />}
                title={messages.roadmapVoiceOnly}
                description={messages.roadmapVoiceOnlyDesc}
                isComingSoon
              />
            </div>
            <div className="hidden lg:block lg:w-1/12 text-center">
              <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-indigo-700 mx-auto"></div>
            </div>
            <div className="lg:w-5/12 hidden lg:block"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
            <div className="lg:w-5/12 hidden lg:block"></div>
            <div className="hidden lg:block lg:w-1/12 text-center">
              <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-indigo-700 mx-auto"></div>
            </div>
            <div className="lg:w-5/12">
              <RoadmapItem
                icon={<LowBandwidthIcon />}
                title={messages.roadmapLowBandwidth}
                description={messages.roadmapLowBandwidthDesc}
                isComingSoon
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between">
            <div className="lg:w-5/12">
              <RoadmapItem
                icon={<MoreLanguagesIcon />}
                title={messages.roadmapMoreLanguages}
                description={messages.roadmapMoreLanguagesDesc}
                isComingSoon
              />
            </div>
            <div className="hidden lg:block lg:w-1/12 text-center">
              <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-indigo-700 mx-auto"></div>
            </div>
            <div className="lg:w-5/12 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
