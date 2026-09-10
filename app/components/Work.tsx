// components/Work.tsx
import React from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { work, projects, type Project } from '../data/content';

/**
 * Card anatomy mirrors the reference: a large visual, then a meta row
 * (client · tags / period), a big title, and one short blurb.
 *
 * Work entries link to their case-study page at /work/[slug] (opened in a new
 * tab); personal projects link straight to the live site. The Datamellon work
 * has no screenshots, so those cards get a typographic panel rather than a
 * fabricated image.
 */
const Card: React.FC<{ project: Project; priority?: boolean; caseStudy?: boolean }> = ({
  project,
  priority,
  caseStudy = false,
}) => {
  const href = caseStudy ? `/work/${project.id}` : project.demoUrl;

  const visual = (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
      {project.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
        />
      ) : (
        /* Typographic panel for work without a screenshot: the stack carries
           the card instead of a placeholder graphic. */
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-fg p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-20 blur-2xl"
            style={{ background: 'rgb(var(--accent))' }}
          />
          <p className="relative font-mono text-meta uppercase text-canvas/50">
            {project.client}
          </p>
          <ul className="relative flex min-w-0 flex-wrap gap-x-2 gap-y-2">
            {(project.stack ?? []).map((t) => (
              <li
                key={t}
                className="rounded-full border border-canvas/20 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-canvas/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const body = (
    <>
      {/* Meta row */}
      <div className="mt-5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="meta min-w-0 sm:truncate">
          <span className="text-fg">{project.client}</span>
          <span className="mx-2 text-subtle" aria-hidden="true">
            &middot;
          </span>
          {project.tags}
        </p>
        <p className="meta shrink-0">{project.period}</p>
      </div>

      {/* Title */}
      <h3 className="mt-3 break-words font-display text-display-md font-bold text-fg">
        {project.title}
        {href && (
          <span
            aria-hidden="true"
            className="ml-2 inline-block text-subtle transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          >
            &#8599;
          </span>
        )}
      </h3>

      {/* Blurb */}
      <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-subtle">
        {project.blurb}
      </p>

      {caseStudy && (
        <p className="mt-4 text-[0.8125rem] text-accent">Read the case study</p>
      )}
    </>
  );

  return (
    <Reveal as="li" className="group min-w-0">
      {caseStudy ? (
        <Link href={href!} target="_blank" rel="noopener noreferrer" className="block">
          {visual}
          {body}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {visual}
          {body}
        </a>
      ) : (
        <div className="block">
          {visual}
          {body}
        </div>
      )}

      {!caseStudy && project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[0.8125rem] text-subtle underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-fg"
        >
          Source
        </a>
      )}
    </Reveal>
  );
};

const Work: React.FC = () => {
  return (
    <section id="work" className="scroll-mt-24 bg-canvas">
      <div className="shell py-section">
        {/* Selected work */}
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-lg font-bold text-fg">
              Selected work
            </h2>
            <p className="max-w-measure text-[0.9375rem] leading-relaxed text-subtle sm:text-right">
              Production frontends and AI systems built at Datamellon. Open any project
              for the full case study.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-14 sm:mt-16 sm:gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {work.map((p, i) => (
            <Card key={p.id} project={p} priority={i < 2} caseStudy />
          ))}
        </ul>

        {/* Projects */}
        <Reveal className="mt-28 sm:mt-36">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-lg font-bold text-fg">
              Things I&apos;ve shipped
            </h2>
            <p className="max-w-measure text-[0.9375rem] leading-relaxed text-subtle sm:text-right">
              Client builds and personal projects. All live.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-14 sm:mt-16 sm:gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {projects.map((p) => (
            <Card key={p.id} project={p} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Work;
