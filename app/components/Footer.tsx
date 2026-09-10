// components/Footer.tsx
import React from 'react';
import { socials } from '../data/content';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">&copy; 2026 Justina Ominisan</p>
          <div className="flex items-center gap-5">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-subtle transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-subtle transition-colors hover:text-fg"
            >
              GitHub
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="text-[0.8125rem] text-subtle transition-colors hover:text-fg"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
