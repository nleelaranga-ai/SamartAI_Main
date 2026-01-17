import React from 'react';
import { Scholarship } from '../types';
import { Button } from './Button';
import { useAppContext } from '../context/AppContext';
import { USER_MESSAGES } from '../constants';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const { selectedLanguage } = useAppContext();
  const messages = USER_MESSAGES[selectedLanguage];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <h3 className="text-xl font-bold text-teal-400 mb-3">{scholarship.name}</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-gray-300 text-sm">
        <span className="flex items-center">
          <span className="font-semibold text-white mr-1">{messages.category}:</span>
          {scholarship.category}
        </span>
        <span className="flex items-center">
          <span className="font-semibold text-white mr-1">{messages.incomeLimit}:</span>
          ₹{scholarship.incomeLimit.toLocaleString('en-IN')}
        </span>
      </div>
      <p className="text-gray-300 text-base mb-6 flex-grow">
        {scholarship.description}
      </p>
      <div className="mt-auto">
        <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="w-full">
            {messages.applyNow}
          </Button>
        </a>
      </div>
    </div>
  );
};
