// app/components/Resume.tsx
"use client"
import { Briefcase, GraduationCap } from 'lucide-react';
import React from 'react';

interface ResumeItem {
  id: number;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  type: 'education' | 'experience';
}

interface Skill {
  name: string;
  image: string;
}

const Resume: React.FC = () => {
  const resumeData: ResumeItem[] = [
    {
      id: 1,
      title: "Bachelor's Degree in Computer Science",
      organization: "Elizade University",
      location: "Ilara-Mokin, Ondo State, Nigeria",
      period: "2021 - 2025",
      description: [
        "Graduated with strong foundation in computer science fundamentals",
        "Focused on software engineering and web development technologies",
        "Completed capstone project in full-stack web application development"
      ],
      type: 'education'
    },
    {
      id: 2,
      title: "Front-End Developer",
      organization: "Integrated Software Services Limited",
      location: "Lagos, Nigeria",
      period: "2024",
      description: [
        "Gained hands-on experience building interactive web applications",
        "Deepened my expertise in React, Next.js, TypeScript, and other cutting-edge technologies.",
      ],
      type: "experience"
    }, 
    {
      id: 3,
      title: "Backend Development Fellow",
      organization: "Women Techsters Fellowship",
      location: "Remote",
      period: "2023",
      description: [
        "Intensive program focused on backend technologies and server-side development",
        "Learned Node.js, Express.js, MongoDB, and SQL database management",
        "Developed full-stack applications with RESTful API integration",
        "Collaborated on team projects with agile development methodologies"
      ],
      type: 'experience'
    },
    {
      id: 4,
      title: "Front-End Developer Intern",
      organization: "Revocube Technologies",
      location: "Nigeria",
      period: "2022-2023",
      description: [
        "Gained hands-on experience building interactive web applications",
        "Worked with modern JavaScript frameworks and responsive design principles",
        "Collaborated with senior developers on client projects",
        "Implemented user interface components using React and modern CSS"
      ],
      type: 'experience'
    },
  ];

  const skills: Skill[] = [
    {
      name: "Next.js",
      image: "/images/next.png"
    },
    {
      name: "React",
      image: "/images/react-icon.png"
    },
    {
      name: "TypeScript",
      image: "/images/typescript.png"
    },
    {
      name: "JavaScript",
      image: "/images/js.png"
    },
    {
      name: "HTML5",
      image: "/images/html.png"
    },
    {
      name: "CSS",
      image: "/images/css3.png"
    },
    {
      name: "Express.js",
      image: "/images/express.png"
    },
    {
      name: "MongoDB",
      image: "/images/mongodb.svg"
    },
    {
      name: "Git & Version Control",
      image: "/images/git.png"
    },
    {
      name: "WordPress",
      image: "/images/wordpress.png"
    },
  ];

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Resume</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A comprehensive overview of my educational background, professional experience, and technical expertise in front-end development.
          </p>
          
          {/* Download CV Button */}
          <a 
            href="/justina-ominisan-cv.pdf" 
            download="justina-ominisan-cv.pdf"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Education & Experience Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-lg sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  ⚡
                </div>
                Core Skills
              </h3>
              
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 mr-3 flex-shrink-0">
                      <img 
                        src={skill.image} 
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          e.currentTarget.src = "/images/skills/default.png";
                        }}
                      />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Available For</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Full-time positions</li>
                  <li>• Freelance projects</li>
                  <li>• Remote collaboration</li>
                  <li>• Contract work</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            {/* Experience Section */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <Briefcase />
                  </div>
                  Professional Experience
                </h3>
                {resumeData.filter((item: { type: string; }) => item.type === 'experience').map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-purple-600">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <h5 className="text-purple-600 font-medium mb-1">{item.organization}</h5>
                        <p className="text-gray-500 text-sm">{item.location}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-600 text-sm font-semibold rounded-full mt-2 md:mt-0">
                        {item.period}
                      </span>
                    </div>
                    <ul className="text-gray-600 space-y-1">
                      {item.description.map((desc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2 mt-1">•</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            <div className="space-y-8">
              {/* Education Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap />
                  </div>
                  Education
                </h3>
                {resumeData.filter(item => item.type === 'education').map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-indigo-600">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <h5 className="text-indigo-600 font-medium mb-1">{item.organization}</h5>
                        <p className="text-gray-500 text-sm">{item.location}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-600 text-sm font-semibold rounded-full mt-2 md:mt-0">
                        {item.period}
                      </span>
                    </div>
                    <ul className="text-gray-600 space-y-1">
                      {item.description.map((desc, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-600 mr-2 mt-1">•</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Sidebar with SVG Icons */}
      
        </div>
      </div>
    </section>
  );
};

export default Resume;