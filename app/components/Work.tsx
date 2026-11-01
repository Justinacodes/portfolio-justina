// components/Work.tsx
import React from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import SectionHeading, { Glow } from './SectionHeading';
import { work, projects, type Project } from '../data/content';

/**
 * Two parts. Shipped projects lead: they have screenshots, so the section
 * opens visually. Card anatomy mirrors the reference: a large visual, then a
 * meta row (client · tags / period), a big title, and one short blurb.
 *
 * The Datamellon work follows as compact rows. It has no screenshots, and as
 * full cards it rendered as large empty panels; a row keeps the substance
 * (title, blurb, stack) and links to the case study at /work/[slug].
 */
const Card: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const priority = index < 2;
  const href = project.demoUrl;
  // Shown in the frame's address bar: the real live domain, so it reads as a
  // working site rather than a mock-up.
  const host = href ? new URL(href).hostname.replace(/^www\./, '') : project.client.toLowerCase();

  const body = (
    <>
      {/* Screenshot in a small browser window */}
      <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-[transform,box-shadow] duration-500 ease-editorial group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-24px_rgb(var(--fg)/0.35)]">
        <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-fg/15 transition-colors duration-300 group-hover:bg-[#E5715F]" />
            <span className="h-2 w-2 rounded-full bg-fg/15 transition-colors delay-75 duration-300 group-hover:bg-[#E8B04A]" />
            <span className="h-2 w-2 rounded-full bg-fg/15 transition-colors delay-150 duration-300 group-hover:bg-[#6FBF73]" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-canvas/80 px-3 py-1 text-center font-mono text-[0.625rem] text-subtle">
            {host}
          </span>
          <span className="w-[1.875rem]" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.client} — ${project.title}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={1024}
            height={640}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Meta row */}
      <p className="meta mt-4 min-w-0">
        <span className="text-fg">{project.client}</span>
        <span className="mx-2 text-subtle" aria-hidden="true">
          &middot;
        </span>
        {project.tags}
      </p>

      {/* Title */}
      <h3 className="mt-2 break-words font-display text-xl font-bold leading-snug text-fg sm:text-2xl">
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
      <p className="mt-2 text-[0.875rem] leading-relaxed text-subtle">
        {project.blurb}
      </p>
    </>
  );

  return (
    <Reveal as="li" className="group min-w-0">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {body}
        </a>
      ) : (
        <div className="block">{body}</div>
      )}

      {project.githubUrl && (
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

/** One Datamellon case study as a row: product and tags, title and blurb, stack. */
const CaseStudyRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <Reveal as="li" className="group min-w-0 border-t border-line last:border-b">
    <Link
      href={`/work/${project.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="-mx-4 grid grid-cols-[minmax(0,1fr)] gap-4 rounded-2xl px-4 py-8 transition-colors duration-500 ease-editorial hover:bg-surface/70 sm:-mx-6 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,17rem)] lg:gap-10"
    >
      <div className="flex flex-col gap-2">
        <span
          aria-hidden="true"
          className="mb-2 font-serif text-5xl italic leading-none text-accent/80 transition-colors duration-300 group-hover:text-accent"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="meta text-fg">{project.client}</p>
        <p className="meta">{project.tags}</p>
      </div>

      <div className="min-w-0">
        <h3 className="break-words font-display text-display-md font-bold text-fg transition-colors duration-300 group-hover:text-accent">
          {project.title}
          <span
            aria-hidden="true"
            className="ml-2 inline-block text-subtle transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          >
            &#8599;
          </span>
        </h3>
        <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-subtle">
          {project.blurb}
        </p>
        <p className="mt-4 text-[0.8125rem] text-accent">Read the case study</p>
      </div>

      <ul className="flex min-w-0 flex-wrap content-start gap-2">
        {(project.stack ?? []).map((t) => (
          <li
            key={t}
            className="rounded-full border border-line bg-canvas/60 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-subtle"
          >
            {t}
          </li>
        ))}
      </ul>
    </Link>
  </Reveal>
);

const Work: React.FC = () => {
  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden bg-canvas">
      <Glow className="-right-40 top-24 h-[34rem] w-[34rem]" />
      <Glow className="-left-48 top-[55%] h-[30rem] w-[30rem]" />
      <div className="shell relative z-10 py-section">
        {/* Shipped projects */}
        <SectionHeading
          index="01"
          label="Work"
          title="Things I've"
          accent="shipped"
          caption="Client builds and personal projects. All live."
        />

        <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} index={i} />
          ))}
        </ul>

        {/* Datamellon experience */}
        <div className="mt-28 sm:mt-36">
          <SectionHeading
            index="02"
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
    </section>
  );
};

export default Work;
