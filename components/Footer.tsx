import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS, TELEGRAM_BOT_URL } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-gray-300 py-8 px-4 md:px-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="https://picsum.photos/30/30" alt="SamartAI Logo" className="rounded-full" />
            <span className="text-xl font-bold text-white tracking-wide">SamartAI</span>
          </NavLink>
          <p className="text-sm text-center md:text-left max-w-xs">
            Empowering students with AI-driven scholarship discovery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect with Us */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* LinkedIn Icon */}
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* Telegram Icon */}
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.547 8.356l-3.212 10.457c-.222.72-.601.89-.98.508l-2.65-2.551-1.284 1.245c-.172.169-.304.298-.601.298l.211-2.613 4.88-4.43c.216-.197-.04-.308-.328-.109L8.27 12.825l-2.628-.806c-.702-.216-.714-.72-.14-.95L17.72 6.911c.563-.227 1.05.158.627.845z" />
              </svg>
            </a>
            {/* Add more social media icons as needed */}
          </div>
          <p className="text-sm">Email: contact@samartai.com</p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
        &copy; {currentYear} SamartAI. All rights reserved.
      </div>
    </footer>
  );
};
