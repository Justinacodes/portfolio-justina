import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Reveal from '@/app/components/Reveal'
import { work, type DetailBlock } from '@/app/data/content'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return work.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = work.find((p) => p.id === slug)
  if (!project) return {}

  const title = `${project.client} — ${project.title} · Justina Ominisan`
  return {
    title,
    description: project.blurb,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title,
      description: project.blurb,
      url: `/work/${project.id}`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title, description: project.blurb },
  }
}

/** Renders one detail block. */
function Block({ block }: { block: DetailBlock }) {
  switch (block.kind) {
    case 'heading':
      return (
        <Reveal>
          <h2 className="mt-16 border-t border-line pt-8 font-display text-display-md font-bold text-fg first:mt-0">
            {block.text}
          </h2>
        </Reveal>
      )

    case 'subheading':
      return (
        <Reveal>
          <h3 className="mt-12 font-display text-xl font-bold text-fg">{block.text}</h3>
        </Reveal>
      )

    case 'paragraph':
      return (
        <Reveal>
          <p className="mt-5 max-w-[68ch] text-[1.0625rem] leading-relaxed text-subtle">
            {block.text}
          </p>
        </Reveal>
      )

    case 'list':
      return (
        <Reveal>
          <div className="mt-7">
            {block.title && <p className="meta text-fg">{block.title}</p>}
            <ul className={`space-y-2.5 ${block.title ? 'mt-4' : ''}`}>
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[1.0625rem] leading-relaxed text-subtle"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-3 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )

    case 'flow':
      return (
        <Reveal>
          <ol className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-3">
            {block.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-line bg-surface px-4 py-2 text-[0.8125rem] text-fg">
                  {step}
                </span>
                {i < block.steps.length - 1 && (
                  <span aria-hidden="true" className="text-subtle">
                    &#8594;
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      )

    case 'groups':
      return (
        <Reveal>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {block.groups.map((g) => (
              <div key={g.label}>
                <dt className="meta border-b border-line pb-3 text-fg">{g.label}</dt>
                <dd className="mt-4">
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-[0.8125rem] text-subtle"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const project = work.find((p) => p.id === slug)
  if (!project) notFound()

  const index = work.findIndex((p) => p.id === slug)
  const next = work[(index + 1) % work.length]

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="bg-canvas pt-32 sm:pt-36">
        <article className="shell">
          {/* Back */}
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
            Back to work
          </Link>

          {/* Title block */}
          <header className="mt-10">
            <h1 className="max-w-[18ch] font-display text-display-lg font-bold text-fg">
              {project.client}
            </h1>
            {project.subtitle && (
              <p className="mt-4 max-w-[34ch] font-display text-display-md font-bold text-subtle">
                {project.subtitle}
              </p>
            )}
          </header>

          {project.role && (
            <p className="mt-8 max-w-[60ch] text-[0.9375rem] leading-relaxed text-accent">
              {project.role}
            </p>
          )}

          {/* Meta strip */}
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-y border-line py-6">
            {project.year && (
              <div>
                <dt className="meta">Year</dt>
                <dd className="mt-2 text-[0.9375rem] text-fg">{project.year}</dd>
              </div>
            )}
            {/* Client names are withheld, so the meta strip shows where the
                work was done rather than repeating the generic descriptor
                already used as the page title. */}
            <div>
              <dt className="meta">Engagement</dt>
              <dd className="mt-2 text-[0.9375rem] text-fg">{project.period}</dd>
            </div>
            <div>
              <dt className="meta">Focus</dt>
              <dd className="mt-2 text-[0.9375rem] text-fg">{project.tags}</dd>
            </div>
          </dl>

          {/* Body */}
          <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {(project.detail ?? []).map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {project.stack && project.stack.length > 0 && (
                  <>
                    <p className="meta border-b border-line pb-3 text-fg">Technologies</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-subtle"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {project.demoUrl && (
                  <div className="mt-10">
                    <p className="meta border-b border-line pb-3 text-fg">Project links</p>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 text-[0.9375rem] text-fg"
                    >
                      <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-accent">
                        Live site
                      </span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        &#8599;
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Next project */}
          <nav
            aria-label="Next project"
            className="mt-24 border-t border-line pt-10 sm:mt-32"
          >
            <p className="meta">Next project</p>
            <Link
              href={`/work/${next.id}`}
              className="group mt-4 flex flex-wrap items-baseline justify-between gap-4"
            >
              <span className="font-display text-display-md font-bold text-fg transition-colors duration-300 group-hover:text-accent">
                {next.client} — {next.title}
              </span>
              <span
                aria-hidden="true"
                className="text-subtle transition-transform duration-300 ease-editorial group-hover:translate-x-1"
              >
                &#8594;
              </span>
            </Link>
          </nav>
        </article>

        <div className="h-24 sm:h-32" />
      </main>

      <Footer />
    </div>
  )
}
