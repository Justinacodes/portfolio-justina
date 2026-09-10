// components/Header.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';
  // Hash links only resolve on the home page; elsewhere send them there first.
  const resolve = (href: string) =>
    href.startsWith('#') && !isHome ? `/${href}` : href;
  // Only the home page has a dark hero behind the nav; on every other route the
  // canvas is light, so the nav uses theme colours immediately.
  const onDark = isHome && !scrolled && !isMenuOpen;
  const solid = !onDark;

  // The nav pill only gains its surface once the hero is behind us.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section is currently in view.
  useEffect(() => {
    if (!isHome) return;
    const ids = links.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive('#' + visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock scroll and support Escape while the mobile sheet is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.body.dataset.menuOpen = 'true';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = overflow;
      delete document.body.dataset.menuOpen;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell px-4 sm:px-6">
        <div
          className={`mt-4 flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial sm:px-5 ${
            solid
              ? 'border-line bg-canvas/80 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a
            href={resolve('#home')}
            className={`group flex shrink-0 items-center gap-2 whitespace-nowrap font-display text-base font-bold tracking-tight transition-colors duration-500 ${
              solid ? 'text-fg' : 'text-white'
            }`}
          >
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-500 ease-editorial group-hover:rotate-90"
            >
              &#10022;
            </span>
            Justina<span className="text-accent">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={resolve(link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-block rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                        isActive
                          ? solid
                            ? 'bg-fg text-canvas'
                            : 'bg-white text-ink'
                          : solid
                            ? 'text-subtle hover:bg-fg/5 hover:text-fg'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle onDark={onDark} />
            <a
              href={resolve('#contact')}
              className={`hidden whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors duration-300 sm:inline-block ${
                solid
                  ? 'bg-fg/10 text-fg hover:bg-fg hover:text-canvas'
                  : 'bg-white/15 text-white hover:bg-white hover:text-ink'
              }`}
            >
              Say hi <span aria-hidden="true">&#128075;</span>
            </a>

            <button
              type="button"
              className="relative z-50 flex size-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-fg/10 md:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" className="flex w-4 flex-col items-end gap-[4px]">
                <span
                  className={`h-[1.5px] transition-all duration-300 ease-editorial ${
                    solid ? 'bg-fg' : 'bg-white'
                  } ${isMenuOpen ? 'w-4 translate-y-[5.5px] rotate-45' : 'w-4'}`}
                />
                <span
                  className={`h-[1.5px] transition-all duration-300 ease-editorial ${
                    solid ? 'bg-fg' : 'bg-white'
                  } ${isMenuOpen ? 'w-4 -translate-y-[5.5px] -rotate-45' : 'w-2.5'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 bg-canvas transition-opacity duration-500 ease-editorial md:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile" className="shell flex h-full flex-col pt-28 pb-12">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={resolve(link.href)}
                  onClick={() => setIsMenuOpen(false)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="flex items-baseline justify-between py-5 transition-colors duration-300 hover:text-accent"
                  style={{
                    transitionDelay: isMenuOpen ? `${i * 50 + 100}ms` : '0ms',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'none' : 'translateY(10px)',
                    transitionProperty: 'opacity, transform, color',
                  }}
                >
                  <span className="font-display text-display-lg font-bold">{link.label}</span>
                  <span className="meta" aria-hidden="true">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <a
              href={resolve('#contact')}
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-4 text-sm font-medium text-canvas"
            >
              Say hi <span aria-hidden="true">&#128075;</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
