// components/ThemeToggle.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'theme';

/**
 * Light/dark toggle. The initial class is applied by an inline script in
 * layout.tsx (before paint) so there is no flash; this component only syncs
 * its own icon state and handles clicks.
 */
const ThemeToggle: React.FC<{ className?: string; onDark?: boolean }> = ({
  className = '',
  onDark = false,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  // Follow the OS while the user hasn't made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      document.documentElement.classList.toggle('dark', e.matches);
      setIsDark(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      // Private-mode storage failures shouldn't break the toggle.
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
        onDark
          ? 'text-white/80 hover:bg-white/15 hover:text-white'
          : 'text-fg/80 hover:bg-fg/10 hover:text-fg'
      } ${className}`}
    >
      {/* Render nothing until mounted so SSR markup matches the client */}
      {mounted ? (
        isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />
      ) : (
        <span className="size-4" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
