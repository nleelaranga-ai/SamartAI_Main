import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useAppContext } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useAppContext(); // Not used directly in Navbar but available for consistency

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 shadow-lg py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src="https://picsum.photos/40/40" alt="SamartAI Logo" className="rounded-full" />
          <span className="text-2xl font-bold text-white tracking-wide">SamartAI</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 ${
                  isActive ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-300 hover:text-teal-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-950 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6">
          <button onClick={toggleMenu} className="absolute top-6 right-6 text-white focus:outline-none">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-3xl font-bold transition-colors duration-300 ${
                  isActive ? 'text-teal-400' : 'text-gray-300 hover:text-teal-300'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
