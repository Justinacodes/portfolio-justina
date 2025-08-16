// components/Header.tsx
"use client"
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-indigo-600">Justina Ominisan</h2>
          </div>
          
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full md:top-auto left-0 md:left-auto right-0 md:right-auto bg-white md:bg-transparent shadow-lg md:shadow-none`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 p-4 md:p-0">
              <li><a href="#home" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">About</a></li>
              <li><a href="#resume" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Resume</a></li>
              <li><a href="#portfolio" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Portfolio</a></li>
              <li><a href="#contact" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300">Contact</a></li>
            </ul>
          </nav>
          
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;