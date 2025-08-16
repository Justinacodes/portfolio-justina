// components/About.tsx
"use client"
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg text-gray-600 mb-8">
              <p className="mb-6">
                A passionate front-end developer with a strong foundation in modern web technologies. 
                My journey began with reading books on web development, which gave me a solid theoretical 
                understanding of HTML. However, my real growth started in 2022 when I interned as a 
                front-end developer at Revocube Technologies, where I gained hands-on experience and 
                practical insights into building interactive web applications.
              </p>
              
              <p className="mb-6">
                My experience spans across crafting interactive shopping carts, sophisticated dashboards, 
                and robust search features, always with a focus on clean, modular code that's easy to 
                maintain and scale.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-3xl font-bold text-indigo-600 mb-2">3+</h3>
              <p className="text-gray-700 font-semibold">Years of Experience</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-3xl font-bold text-indigo-600 mb-2">100%</h3>
              <p className="text-gray-700 font-semibold">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;