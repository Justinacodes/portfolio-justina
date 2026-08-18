// components/Footer.tsx
"use client"
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ink text-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-cream/60">&copy; 2026 Justina Ominisan. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/justina-ominisan-1b5a72246" className="text-cream/60 hover:text-accent transition-colors duration-300" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="https://github.com/Justinacodes" className="text-cream/60 hover:text-accent transition-colors duration-300" aria-label="GitHub">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;