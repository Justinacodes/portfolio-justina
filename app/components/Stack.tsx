// components/Stack.tsx
import React from 'react';
import Reveal from './Reveal';
import SectionHeading, { Glow } from './SectionHeading';
import { stack, certifications } from '../data/content';

/** The stack as chip cards, with certifications set apart in a dark card. */
const Stack: React.FC = () => {
  return (
    <section id="stack" className="relative scroll-mt-24 overflow-hidden bg-canvas">
      <Glow className="-left-40 top-1/3 h-[32rem] w-[32rem]" />

      <div className="shell relative z-10 py-section">
        <SectionHeading
          index="03"
          label="Stack"
          title="What I"
          accent="build with"
          caption="From the interface down to the services behind it."
        />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i * 60}
              className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm sm:p-7"
            >
              <p className="meta text-fg">{group.group}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-[0.875rem] text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal
            delay={stack.length * 60}
            className="relative isolate overflow-hidden rounded-3xl bg-[#211812] p-6 text-[#F7F1E8] sm:col-span-2 sm:p-7 lg:col-span-2"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#DE9652]/30 blur-3xl" />
            </div>
            <p className="meta relative text-[#F7F1E8]/60">Certifications</p>
            <ul className="relative mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {certifications.map((cert, i) => (
                <li key={cert.name} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${i === 0 ? 'bg-[#E8964A]' : 'bg-[#F7F1E8]/30'}`}
                  />
                  <div>
                    <p className={i === 0 ? 'font-display text-lg font-bold' : 'text-[0.9375rem]'}>
                      {cert.name}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-[#F7F1E8]/55">{cert.issuer}</p>
                  </div>
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
