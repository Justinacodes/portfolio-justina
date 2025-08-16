// components/Hero.tsx
"use client"
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Hi! I am <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Justina Ominisan</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 font-semibold mb-6">Front-End Developer</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A front-end developer dedicated to creating intuitive, user-centered web experiences. 
              With a strong foundation in NextJs, React, JavaScript and TypeScript, I specialize in 
              building responsive, performant interfaces that make complex functionalities feel simple.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Get In Touch
              </a>
              <a href="#about" className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300">
                About Me
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-1 shadow-2xl">
              <img 
                src={'/justy.jpeg'} 
                alt='Justina Ominisan' 
                className='w-full h-full rounded-full object-cover' 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;