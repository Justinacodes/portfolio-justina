// components/About.tsx
import React from 'react';
import Reveal from './Reveal';
import { Glow } from './SectionHeading';
import StreamText from './StreamText';

/** Figures already stated elsewhere on the site — don't add new claims here. */
const stats = [
  { figure: '4', unit: 'yrs', text: 'Shipping production frontends' },
  { figure: '12', unit: 'dashboards', text: 'Running AI Studio, which I designed and built' },
  { figure: 'AWS', unit: 'certified', text: 'AI Practitioner' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-canvas">
      <Glow className="-right-32 top-10 h-[30rem] w-[30rem]" />
      <div className="shell relative z-10 py-section">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">
            <span>04</span>
            <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
            <span className="text-subtle">About</span>
          </p>
        </Reveal>

        <div className="mt-5 grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-display-lg font-bold text-fg">
                I&apos;m Justina, frontend at heart, building{' '}
                <em className="font-serif text-[1.12em] font-normal italic tracking-normal text-accent">
                  <StreamText text="AI products." />
                </em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-subtle">
                I build the interfaces people actually use — and increasingly the APIs
                and AI systems behind them. Lately that&apos;s meant AI Studio across a
                dozen dashboards, a retrieval pipeline for a bank, and getting LLM
                streaming to behave in production.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="/Justina-Ominisan_CV.pdf"
                  download="justinaominisan.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-canvas transition-transform duration-300 ease-editorial hover:-translate-y-0.5"
                >
                  Download resume
                  <span aria-hidden="true">&#8595;</span>
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 text-sm text-fg"
                >
                  <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-accent">
                    Say hello
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                  >
                    &#8594;
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {stats.map((s, i) => (
              <Reveal
                as="li"
                key={s.text}
                delay={100 + i * 70}
                className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm"
              >
                <p className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl italic leading-none text-accent">
                    {s.figure}
                  </span>
                  <span className="meta">{s.unit}</span>
                </p>
                <p className="mt-3 text-[0.9375rem] text-fg">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
