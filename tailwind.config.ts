// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        // Retained: ChatBot relies on animate-fade-in
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-roboto)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Theme-aware tokens driven by CSS variables, so light/dark swap
        // without duplicating utilities on every element.
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        subtle: 'rgb(var(--subtle) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',

        // Fixed brand values retained (ChatBot + dark hero overlay)
        ink: '#14110F',
        cream: '#F4EFE6',
        paper: '#FAF8F4',
        peach: '#E8B67E',
      },
      fontSize: {
        // Fluid display scale — clamps keep large type readable on mobile.
        'display-xl': ['clamp(2.5rem, 7.4vw, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.4vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 2.4vw, 1.75rem)', { lineHeight: '1.22', letterSpacing: '-0.01em' }],
        meta: ['0.625rem', { lineHeight: '1', letterSpacing: '0.24em' }],
      },
      maxWidth: {
        shell: '87.5rem',
        measure: '34rem',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8rem)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
