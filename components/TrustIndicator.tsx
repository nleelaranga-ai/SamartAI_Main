import React from 'react';

interface TrustIndicatorProps {
  icon: React.ReactNode;
  text: string;
}

export const TrustIndicator: React.FC<TrustIndicatorProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl shadow-md border border-gray-700 hover:shadow-indigo-500/20 transition-shadow duration-300">
      <div className="text-teal-400 text-4xl mb-3">
        {icon}
      </div>
      <p className="text-lg font-medium text-white text-center">{text}</p>
    </div>
  );
};
