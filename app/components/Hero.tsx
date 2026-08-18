// components/Hero.tsx
"use client"
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-cream min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Front-End Developer
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink leading-[1.1] mb-6">
              Hi, I&apos;m <span className="text-accent">Justina</span> — I build web experiences people actually enjoy using
            </h1>
            <p className="text-lg text-ink/60 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A front-end developer dedicated to creating intuitive, user-centered web experiences.
              With a strong foundation in Next.js, React, JavaScript and TypeScript, I specialize in
              building responsive, performant interfaces that make complex functionalities feel simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-14">
              <a href="#contact" className="px-8 py-3 bg-ink text-cream font-semibold rounded-full hover:bg-accent hover:text-ink transition-colors duration-300 text-center">
                Get In Touch
              </a>
              <a href="#about" className="px-8 py-3 border border-ink/20 text-ink font-semibold rounded-full hover:border-ink hover:bg-ink hover:text-cream transition-colors duration-300 text-center">
                About Me
              </a>
            </div>

            <div className="flex justify-center lg:justify-start divide-x divide-ink/15">
              <div className="pr-6">
                <p className="text-3xl font-display font-bold text-ink">3+</p>
                <p className="text-sm text-ink/50 uppercase tracking-wide">Years Experience</p>
              </div>
              <div className="px-6">
                <p className="text-3xl font-display font-bold text-ink">10+</p>
                <p className="text-sm text-ink/50 uppercase tracking-wide">Projects Shipped</p>
              </div>
              <div className="pl-6">
                <p className="text-3xl font-display font-bold text-ink">100%</p>
                <p className="text-sm text-ink/50 uppercase tracking-wide">Client Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-peach"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={'/justy.jpeg'}
                alt='Justina Ominisan'
                className='relative w-full h-full rounded-3xl object-cover border border-ink/10 shadow-sm'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
