import type { Metadata } from 'next'
import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Contact from '@/app/components/Contact'
import ChatBot from '@/app/components/ChatBot'
import Reveal from '@/app/components/Reveal'
import StreamText from '@/app/components/StreamText'
import SectionHeading, { Glow } from '@/app/components/SectionHeading'
import { stats } from '@/app/components/About'

const TITLE = 'About · Justina Ominisan'
const DESCRIPTION =
  'Software engineer building polished interfaces, websites, online stores, business applications and AI-powered products, from first interfaces to production software and AI engineering.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/about', type: 'profile' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** Company names sit inside the sentences, lightly emphasised, never as headings. */
const Co = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium text-fg">{children}</strong>
)

/**
 * Career story as short paragraphs, oldest first. `pull` marks the turning
 * point, set larger in the serif. Keep to what Justina has written about herself.
 */
const story: { pull?: boolean; text: React.ReactNode }[] = [
  {
    text: (
      <>
        I started by reading books on programming, then I interned at <Co>Revocube</Co> in 2022, where I got my first hands-on experience
        building for the web, turning what I was learning into real interfaces.
      </>
    ),
  },
  {
    text: (
      <>
        At <Co>ISSL</Co>, I grew as a frontend developer, working on real-world
        projects and learning how software gets built inside a team.
      </>
    ),
  },
  {
    text: (
      <>
        Alongside that, I took on freelance work: websites, online stores and
        business applications for clients of my own.
      </>
    ),
  },
  {
    text: (
      <>
        That led me to <Co>Datamellon</Co>, where I work on production software
        across business applications and dashboards, from frontend architecture
        and authentication to testing and improving products without breaking the
        systems behind them.
      </>
    ),
  },
  { pull: true, text: 'Then I got curious about what happens beyond the interface.' },
  {
    text: (
      <>
        That took me into AI engineering: APIs, retrieval-augmented generation,
        vector databases and cloud AI services, and making AI part of products
        that solve real business problems, not just demos.
      </>
    ),
  },
  {
    text: (
      <>
        The interface is still where I start. It&apos;s just not where I stop
        anymore.
      </>
    ),
  },
]

/* ---- Interest tiles. Small, decorative visuals; labels carry the meaning. ---- */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6',
  'aria-hidden': true,
}

/** Equalizer bars that bounce gently (.eq in globals.css). */
const Equalizer = () => (
  <span aria-hidden="true" className="eq flex h-6 items-end gap-[3px]">
    {[0, 1, 2, 3].map((i) => (
      <span key={i} className="w-[3px] rounded-full bg-current" style={{ animationDelay: `${i * 0.18}s` }} />
    ))}
  </span>
)

const interests: { label: string; visual: React.ReactNode }[] = [
  { label: 'Music', visual: <Equalizer /> },
  {
    label: 'Books',
    visual: (
      <svg {...iconProps}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15z" />
        <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
      </svg>
    ),
  },
  {
    label: 'Fashion',
    visual: (
      <svg {...iconProps}>
        {/* Clothes hanger */}
        <path d="M12 7.5a2 2 0 1 1 2-2" />
        <path d="M12 7.5v1.5L3 16.5a1 1 0 0 0 .6 1.8h16.8a1 1 0 0 0 .6-1.8L12 9" />
      </svg>
    ),
  },
  {
    label: 'New tech trends',
    visual: (
      <span aria-hidden="true" className="font-mono text-sm font-medium">
        new<span className="ai-caret">_</span>
      </span>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="bg-canvas">
        {/* Intro */}
        <section className="relative overflow-hidden">
          <Glow className="-right-40 top-20 h-[34rem] w-[34rem]" />
          <div className="shell relative z-10 grid items-center gap-x-16 gap-y-12 pb-section pt-32 sm:pt-40 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">
                  <span>About</span>
                  <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
                  <span className="text-subtle">Justina Ominisan</span>
                </p>
                <h1 className="mt-5 max-w-[16ch] font-display text-display-lg font-bold text-fg sm:text-[clamp(2.75rem,5vw,4.5rem)] sm:leading-[1.02]">
                  I&apos;m Justina, a software engineer with an eye for{' '}
                  <em className="font-serif text-[1.08em] font-normal italic tracking-normal text-accent">
                    <StreamText text="detail." />
                  </em>
                </h1>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-subtle">
                  I build polished interfaces, websites, online stores and business
                  applications, as well as AI-powered products that people can actually
                  use. I enjoy taking an idea, understanding the problem behind it, and
                  turning it into something functional, polished and genuinely useful.
                </p>
              </Reveal>
            </div>

            <Reveal delay={150} className="lg:col-span-5">
              <figure className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="overflow-hidden rounded-[2rem] bg-surface ring-1 ring-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/justy.jpeg"
                    alt="Justina Ominisan"
                    width={719}
                    height={1080}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Career path */}
        <section className="relative">
          <div className="shell pb-section">
            <SectionHeading index="01" label="Experience" title="The path" accent="so far" />

            <div className="mt-12 max-w-[64ch] space-y-6 sm:mt-16">
              {story.map((p, i) =>
                p.pull ? (
                  <Reveal key={i}>
                    <p className="border-l-2 border-accent py-1 pl-5 font-serif text-[1.75rem] italic leading-snug text-fg sm:text-[2.125rem]">
                      {p.text}
                    </p>
                  </Reveal>
                ) : (
                  <Reveal key={i}>
                    <p className="text-lg leading-relaxed text-subtle">{p.text}</p>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="shell pb-section">
          <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-[#211812] px-6 py-10 text-[#F7F1E8] dark:bg-[#2A1F18] dark:ring-1 dark:ring-[#F7F1E8]/10 sm:px-12 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-[#DE9652]/30 blur-[90px]" />
            <p className="max-w-[40ch] font-display text-2xl font-bold leading-snug sm:text-3xl">
              Today I&apos;m a frontend-focused software engineer with a growing focus on{' '}
              <em className="font-serif text-[1.1em] font-normal italic text-[#E8964A]">AI.</em>
            </p>
            <ul className="mt-10 grid gap-8 border-t border-[#F7F1E8]/15 pt-8 sm:grid-cols-3">
              {stats.map((s) => (
                <li key={s.text}>
                  <p className="flex items-baseline gap-2">
                    <span className="font-serif text-5xl italic leading-none text-[#E8964A]">{s.figure}</span>
                    <span className="font-mono text-meta uppercase text-[#F7F1E8]/55">{s.unit}</span>
                  </p>
                  <p className="mt-3 text-[0.9375rem] text-[#F7F1E8]/80">{s.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Beyond the code */}
        <section className="relative overflow-hidden">
          <Glow className="-left-40 top-10 h-[30rem] w-[30rem]" />
          <div className="shell relative z-10 pb-section">
            <SectionHeading index="02" label="Off the clock" title="Beyond the" accent="code" />

            <div className="mt-12 grid gap-x-16 gap-y-10 sm:mt-16 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="text-lg leading-relaxed text-subtle">
                  Outside the code, I&apos;m into music, books, fashion, and keeping up
                  with new tech trends.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-subtle">
                  I&apos;m also constantly learning, whether that means picking up a new
                  technology or exploring an unfamiliar idea.
                </p>
              </Reveal>

              <ul className="grid grid-cols-2 gap-4 lg:col-span-7">
                {interests.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.label}
                    delay={i * 60}
                    className="group flex min-h-[9.5rem] flex-col justify-between rounded-3xl border border-line bg-surface/60 p-5 backdrop-blur-sm transition-[transform,border-color] duration-500 ease-editorial hover:-translate-y-1 hover:border-accent/60 sm:p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-canvas">
                      {item.visual}
                    </span>
                    <span className="mt-6 font-display text-base font-bold leading-snug text-fg sm:text-lg">
                      {item.label}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Contact index="03" />
      </main>

      <Footer />
      <ChatBot />
    </div>
  )
}
