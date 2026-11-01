import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Contact from '@/app/components/Contact'
import ChatBot from '@/app/components/ChatBot'
import Reveal from '@/app/components/Reveal'
import StreamText from '@/app/components/StreamText'
import SectionHeading, { Glow } from '@/app/components/SectionHeading'
import { ProjectGrid, CaseStudyRow } from '@/app/components/Work'
import { projects, work } from '@/app/data/content'

const TITLE = 'Work · Justina Ominisan'
const DESCRIPTION =
  'Websites, online stores, web apps and AI products built by Justina Ominisan, plus case studies from her work at Datamellon.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/work' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/work', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** Every shipped project, then the Datamellon case studies. */
export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="relative overflow-hidden bg-canvas">
        <Glow className="-right-40 top-24 h-[34rem] w-[34rem]" />
        <Glow className="-left-48 top-[45%] h-[30rem] w-[30rem]" />

        <div className="shell relative z-10 pb-section pt-28 sm:pt-36">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[0.9375rem] text-subtle transition-colors duration-300 hover:text-fg"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:-translate-x-1"
            >
              &#8592;
            </span>
            Back home
          </Link>

          <Reveal className="mt-10">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent">
              <span>Work</span>
              <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
              <span className="text-subtle">{projects.length} projects, all live</span>
            </p>
            <h1 className="mt-5 max-w-[18ch] font-display text-display-lg font-bold text-fg sm:text-[clamp(2.75rem,5vw,4.5rem)] sm:leading-[1.02]">
              Projects I&apos;ve{' '}
              <em className="font-serif text-[1.08em] font-normal italic tracking-normal text-accent">
                <StreamText text="shipped." />
              </em>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-subtle">
              Websites, online stores, web apps and AI products, for clients and for
              myself. Each one opens the live site.
            </p>
          </Reveal>

          <div className="mt-14 sm:mt-20">
            <ProjectGrid items={projects} />
          </div>

          <div className="mt-28 sm:mt-36">
            <SectionHeading
              index="01"
              label="Experience"
              title="Building at"
              accent="Datamellon"
              caption="Production frontends and AI systems. Open any project for the full case study."
            />
          </div>

          <ul className="mt-10 sm:mt-14">
            {work.map((p, i) => (
              <CaseStudyRow key={p.id} project={p} index={i} />
            ))}
          </ul>
        </div>

        <Contact index="02" />
      </main>

      <Footer />
      <ChatBot />
    </div>
  )
}
