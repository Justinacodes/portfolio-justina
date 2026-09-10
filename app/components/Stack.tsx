// components/Stack.tsx
import React from 'react';
import Reveal from './Reveal';
import { stack, certifications } from '../data/content';

/**
 * Tech stack as grouped columns rather than a logo wall, with certifications
 * sharing the same grid rhythm.
 */
const Stack: React.FC = () => {
  return (
    <section id="stack" className="scroll-mt-24 border-t border-line bg-canvas">
      <div className="shell py-section">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-lg font-bold text-fg">Stack</h2>
            <p className="max-w-measure text-[0.9375rem] leading-relaxed text-subtle sm:text-right">
              What I build with, from the interface down to the services behind it.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-16 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal key={group.group} delay={i * 60}>
              <p className="meta border-b border-line pb-3 text-fg">{group.group}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[0.9375rem] text-subtle">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={stack.length * 60}>
            <p className="meta border-b border-line pb-3 text-fg">Certifications</p>
            <ul className="mt-4 space-y-3">
              {certifications.map((cert, i) => (
                <li key={cert.name}>
                  <p
                    className={`text-[0.9375rem] ${
                      i === 0 ? 'font-medium text-fg' : 'text-subtle'
                    }`}
                  >
                    {cert.name}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-subtle/70">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Stack;
