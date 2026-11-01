// components/StreamText.tsx
import React from 'react';

/**
 * Types a word in character by character with a blinking caret, the way a
 * streamed LLM reply arrives. Starts when an enclosing <Reveal> becomes
 * visible (see .stream-* in globals.css). Screen readers get the plain word.
 */
const StreamText: React.FC<{ text: string }> = ({ text }) => {
  const chars = Array.from(text);
  return (
  <>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {chars.slice(0, -1).map((ch, i) => (
        <span key={i} className="stream-char" style={{ '--i': i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
      {/* Last character and caret stay together, so the caret never wraps
          onto a line of its own. */}
      <span className="whitespace-nowrap">
        <span className="stream-char" style={{ '--i': chars.length - 1 } as React.CSSProperties}>
          {chars[chars.length - 1]}
        </span>
        <span className="stream-caret" />
      </span>
    </span>
  </>
  );
};

export default StreamText;
