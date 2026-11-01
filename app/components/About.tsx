// components/About.tsx
import React from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { Glow } from './SectionHeading';
import StreamText from './StreamText';

/** Figures already stated elsewhere on the site — don't add new claims here. */
export const stats = [
  { figure: '4', unit: 'yrs', text: 'Shipping production frontends' },
  { figure: 'Live', unit: 'projects', text: 'Websites, online stores, apps and AI products' },
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
                I&apos;m Justina, a software engineer with an eye for{' '}
                <em className="font-serif text-[1.12em] font-normal italic tracking-normal text-accent">
                  <StreamText text="detail." />
                </em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-subtle">
                From my first interfaces to production AI software, with freelance
                work for clients along the way, I build things that are polished,
                reliable and genuinely useful.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-canvas transition-transform duration-300 ease-editorial hover:-translate-y-0.5"
                >
                  Read my story
                  <span aria-hidden="true">&#8594;</span>
                </Link>
                <a
                  href="/Justina-Ominisan_CV.pdf"
                  download="justinaominisan.pdf"
                  className="group inline-flex items-center gap-2 text-sm text-fg"
                >
                  <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-accent">
                    Download resume
                  </span>
                  <span aria-hidden="true">&#8595;</span>
                </a>
              </div>
            </Reveal>
          </div>

          <ul className="grid content-start gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
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
