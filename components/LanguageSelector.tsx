import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LANGUAGES } from '../constants';
import { Language } from '../types';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  const currentLangLabel = LANGUAGES.find(l => l.value === selectedLanguage)?.label;

  return (
    <div className="relative inline-block text-left z-30">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentLangLabel}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`${
                  lang.value === selectedLanguage
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700'
                } block w-full text-left px-4 py-2 text-sm transition-colors duration-200`}
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${lang.value}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
