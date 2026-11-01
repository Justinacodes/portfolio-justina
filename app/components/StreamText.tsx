// components/StreamText.tsx
import React from 'react';

/**
 * Types a word in character by character with a blinking caret, the way a
 * streamed LLM reply arrives. Starts when an enclosing <Reveal> becomes
 * visible (see .stream-* in globals.css). Screen readers get the plain word.
 */
const StreamText: React.FC<{ text: string }> = ({ text }) => (
  <>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="stream-char" style={{ '--i': i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
      <span className="stream-caret" style={{ '--n': text.length } as React.CSSProperties} />
    </span>
  </>
);

export default StreamText;
