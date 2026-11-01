// components/SectionHeading.tsx
import React from 'react';
import Reveal from './Reveal';
import StreamText from './StreamText';

type Props = {
  /** Section number shown in the eyebrow, e.g. "01" */
  index: string;
  /** Eyebrow label, e.g. "Work" */
  label: string;
  /** Heading text before the accent word */
  title: string;
  /** One word set in the serif italic accent */
  accent: string;
  /** Optional trailing text after the accent word (e.g. ".") */
  after?: string;
  caption?: string;
};

/**
 * Shared section header: a numbered eyebrow, a heading whose key word is set
 * in the italic serif and streams in like an LLM reply, and a short caption.
 */
const SectionHeading: React.FC<Props> = ({ index, label, title, accent, after = '', caption }) => (
  <Reveal>
    <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">
      <span>{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
      <span className="text-subtle">{label}</span>
    </p>
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-display text-display-lg font-bold text-fg">
        {title}{' '}
        <em className="font-serif text-[1.12em] font-normal italic tracking-normal text-accent">
          <StreamText text={accent} />
        </em>
        {after}
      </h2>
      {caption && (
        <p className="max-w-measure text-[0.9375rem] leading-relaxed text-subtle sm:text-right">
          {caption}
        </p>
      )}
    </div>
  </Reveal>
);

/** Soft, blurred colour wash placed behind a section's content. Decorative. */
export const Glow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute z-0 rounded-full bg-glow/25 blur-[110px] dark:bg-glow/15 ${className}`}
  />
);

export default SectionHeading;
