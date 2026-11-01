// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { socials } from '../data/content';

const linkClass = 'text-[0.8125rem] text-subtle transition-colors hover:text-fg';

const Footer: React.FC = () => {
  return (
    <footer className="overflow-hidden bg-canvas">
      <div className="shell pb-10">
        <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">&copy; 2026 Justina Ominisan</p>
          <div className="flex items-center gap-5">
            <Link href="/blog" className={linkClass}>
              Blog
            </Link>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            <a href={`mailto:${socials.email}`} className={linkClass}>
              Email
            </a>
          </div>
        </div>

        {/* Oversized sign-off wordmark. Decorative: the name is already above. */}
        <p
          aria-hidden="true"
          className="mt-10 select-none whitespace-nowrap font-display text-[11.5vw] font-bold leading-[0.85] tracking-[-0.05em] text-fg/[0.07] xl:text-[10.5rem]"
        >
          Justina{' '}
          <span className="font-serif font-normal italic tracking-normal text-accent/25">
            Ominisan.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
