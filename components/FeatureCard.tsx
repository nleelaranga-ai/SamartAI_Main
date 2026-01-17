import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
      <div className="text-teal-400 mb-4 text-5xl flex justify-center items-center w-16 h-16 rounded-full bg-indigo-700/30 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};
