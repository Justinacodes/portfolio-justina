// components/Hero.tsx
import React from 'react';

/**
 * Portrait hero. The source photo is 719x1080 (2:3), so on a wide viewport
 * `object-cover` would have to discard ~70% of its height and crop into a face
 * close-up. Instead the desktop layout contains the whole portrait on the right
 * and fills the rest of the canvas with a blurred copy of the same image — its
 * backdrop gradient then matches at every height, so the feathered edge blends
 * away rather than showing a seam. Mobile viewports are already portrait, so
 * there the photo simply goes full-bleed.
 *
 * Scrims are kept only as dark as the overlaid type needs, so the subject stays
 * clearly visible.
 */
const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* Desktop: blurred fill so the contained portrait has nothing to step against */}
      <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/justy.jpeg"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="h-full w-full scale-125 object-cover object-[70%_28%] blur-3xl"
        />
      </div>

      {/* Mobile / tablet: full-bleed portrait */}
      <div className="absolute inset-0 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/justy.jpeg"
          alt="Justina Ominisan"
          width={719}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[58%_18%] sm:object-[62%_14%]"
        />
      </div>

      {/* Desktop: the whole portrait, right-anchored, left edge feathered */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 24%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.85) 50%, #000 62%)',
          maskImage:
            'linear-gradient(to right, transparent 24%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.85) 50%, #000 62%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/justy.jpeg"
          alt="Justina Ominisan"
          width={719}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-contain object-right-bottom"
        />
      </div>

      {/* Scrims: bottom for the type, left wash so the headline holds contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(12,11,10,0.88) 0%, rgba(12,11,10,0.6) 22%, rgba(12,11,10,0.16) 48%, rgba(12,11,10,0.04) 70%, rgba(12,11,10,0.24) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(12,11,10,0.94) 0%, rgba(12,11,10,0.88) 20%, rgba(12,11,10,0.66) 34%, rgba(12,11,10,0.3) 48%, rgba(12,11,10,0.06) 62%, transparent 74%)',
        }}
      />

      <div className="shell relative w-full pb-20 pt-32 sm:pb-24">
        <h1 className="max-w-[15ch] font-display text-display-xl font-bold lg:max-w-[13ch]">
          <span className="fade-up block text-white" style={{ animationDelay: '100ms' }}>
            Justina Ominisan.
          </span>
          <span
            className="fade-up block text-white/45"
            style={{ animationDelay: '220ms' }}
          >
            Frontend &amp; AI engineer.
          </span>
        </h1>

        <p
          className="fade-up mt-7 max-w-measure text-base leading-relaxed text-white/70 sm:text-lg"
          style={{ animationDelay: '360ms' }}
        >
          I build web applications and AI-powered products — dashboards, RAG systems
          and real-time LLM interfaces. AWS Certified AI Practitioner, based in Nigeria.
        </p>

        <div
          className="fade-up mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '460ms' }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white/90"
          >
            View my work
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:translate-y-0.5"
            >
              &#8595;
            </span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
          >
            About me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
