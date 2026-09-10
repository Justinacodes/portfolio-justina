// components/About.tsx
import React from 'react';
import Reveal from './Reveal';

const facts = [
  { emoji: '\u2601\uFE0F', text: 'AWS Certified AI Practitioner' },
  { emoji: '\u26A1', text: '4 years shipping production frontends' },
  { emoji: '\u{1F9E9}', text: 'Frontend, APIs & AI systems' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line bg-canvas">
      <div className="shell py-section">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="max-w-[24ch] font-display text-display-lg font-bold text-fg">
                I&apos;m Justina, a frontend engineer working on AI products.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-subtle">
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
                  className="inline-flex items-center rounded-full bg-fg/10 px-5 py-2.5 text-sm text-fg transition-colors duration-300 hover:bg-fg hover:text-canvas"
                >
                  Download resume
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

          <div className="lg:col-span-4">
            <Reveal delay={100}>
              <ul className="space-y-4">
                {facts.map((fact) => (
                  <li
                    key={fact.text}
                    className="flex items-start gap-3 text-[0.9375rem] text-subtle"
                  >
                    <span aria-hidden="true" className="shrink-0">
                      {fact.emoji}
                    </span>
                    <span>{fact.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
