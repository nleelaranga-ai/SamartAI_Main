import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

// Icons for Impact points
const StudentIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M12 20.005H12M12 11.293c1.373 0 2.652.27 3.864.832 2.766 1.343 4.542 3.824 4.542 6.55S18.636 21.6 12 21.6c-1.373 0-2.652-.27-3.864-.832-2.766-1.343-4.542-3.824-4.542-6.55S5.364 11.293 12 11.293z" />
  </svg>
);
const CommunityIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-4M7 20h4M12 15V4M5 13H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2h-1M5 13V4m0 9a2 2 0 012-2h10a2 2 0 012 2m-8-3V4m-4 9a2 2 0 002-2h4a2 2 0 002 2" />
  </svg>
);
const CaseStudyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.795 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.795 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.205 18 16.5 18s-3.332.477-4.5 1.253" />
  </svg>
);

export const ImpactPage: React.FC = () => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <PageContainer>
      <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-8 text-center">
        {messages.impactTitle}
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        {messages.impactIntro}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="flex items-center justify-center text-indigo-400 bg-indigo-700/30 rounded-full w-20 h-20 mx-auto mb-6">
            <StudentIcon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{messages.impactRuralStudents}</h2>
          <p className="text-gray-300 text-base text-center">
            {messages.impactRuralStudentsDesc}
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
          <div className="flex items-center justify-center text-indigo-400 bg-indigo-700/30 rounded-full w-20 h-20 mx-auto mb-6">
            <CommunityIcon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 text-center">{messages.impactParentsVolunteers}</h2>
          <p className="text-gray-300 text-base text-center">
            {messages.impactParentsVolunteersDesc}
          </p>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-xl shadow-xl border border-indigo-700">
        <div className="flex items-center justify-center text-teal-400 bg-indigo-700/50 rounded-full w-24 h-24 mx-auto mb-6">
          <CaseStudyIcon />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">{messages.impactCaseStudy1Title}</h2>
        <p className="text-gray-200 text-lg leading-relaxed text-center">
          {messages.impactCaseStudy1Desc}
        </p>
      </div>

    </PageContainer>
  );
};
