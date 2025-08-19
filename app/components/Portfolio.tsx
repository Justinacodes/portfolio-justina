'use client'

import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "Ride-Sharing Platform",
      description: "Full-stack ride sharing application with user authentication, real-time messaging, google map integration and ride matching features",
      category: "dashboard",
      technologies: ["NextJs", "TypeScript", "TailwindCSS", "Appwrite"],
      image: "ride-placeholder",
      demoUrl: "https://ride-geng.vercel.app",
      githubUrl: "https://github.com/Justinacodes"
    },
    {
      id: 2,
      title: "Tee-essentials",
      description: "Dynamic shopping cart with advanced filtering, wishlist functionality, and seamless checkout experience.",
      category: "ecommerce",
      technologies: ["React", "Redux", "Stripe API"],
      image: "shopping-cart-placeholder",
      demoUrl: "https://tee-essentials.vercel.app",
      githubUrl: "https://github.com/Justinacodes"
    },
    {
      id: 3,
      title: "Highklazz",
      description: "Highklazz is an e-commerce store where users can get all of their male clothing and accessory needs attended to. Features: Cart and checkout functionality, payment integration, live chat, login/sign-up authentication.",
      category: "ecommerce",
      technologies: ["WordPress", "Elementor"],
      image: "shopping-placeholder",
      demoUrl: "https://highklazz.com.ng",
    },
    {
      id: 4,
      title: "Revocube Website",
      description: "Revocube Meida website was built from the ground up using CSS, JavaScript, HTML. It offers a unique combination of JavaScript toggle effects, CSS animations, Google fonts, Font Awesome icons and an image slider.",
      category: "website",
      technologies: ["HTML", "CSS", "JavaScript"],
      image: "revocube-placeholder",
      demoUrl: "https://revocube.vercel.app/",
      githubUrl: "https://github.com/Justinacodes"
    },
   
    {
      id: 5,
      title: "Movie App",
      description: "Built using React, JavaScript and CSS, Mov-Rev is an app where users can check out movie reviews and ratings of latest movies.",
      category: "web-app",
      technologies: ["React", "Javascript", "CSS"],
      image: "task-app-placeholder",
      demoUrl: "https://movie-rev-psi.vercel.app",
      githubUrl: "https://github.com/Justinacodes"
    },
    {
        id: 6,
        title: "Yield-up",
        description: "A lightweight, interactive agricultural tool for quick soil and crop assessment.",
        category: "website",
        technologies: ["NextJs", "TypeScript", "TailwindCSS"],
        image: "yield-placeholder",
        demoUrl: "https://yieldup.vercel.app",
        githubUrl: "https://github.com/Justinacodes"
      }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'dashboard', label: 'Dashboards' },
    { key: 'ecommerce', label: 'E-commerce' },
    { key: 'web-app', label: 'Web Apps' },
    { key: 'website', label: 'Websites' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
    
  const getPlaceholderContent = (image: string) => {
    const placeholderMap: { [key: string]: string } = {
      'dashboard-placeholder': '/images/dashboard.png',
      'shopping-cart-placeholder': '/images/tee-essentials.png',
      'shopping-placeholder': '/images/highklazz.png',
      'task-app-placeholder': '/images/movrev.png',
      'revocube-placeholder': '/images/revocube.png',
      'ride-placeholder': '/images/ride-geng.png',
      'yield-placeholder': '/images/yieldup.png'
    };
    return placeholderMap[image] || '/images/default-project.png';
  };
    
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Works</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in front-end development, 
            from interactive dashboards to comprehensive e-commerce solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category.key
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getPlaceholderContent(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA5VjEzTTEyIDE3SDE2TTE2IDlIMTJNMTYgMTNIMTJNMTYgMTdIMTJNOCA5SDEyTTggMTNIMTJNOCAxN0gxMiIgc3Ryb2tlPSIjOUI5Qjk2IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (optional) */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300">
            View More Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;