// app/data/content.ts
// Single source of truth for site content.

/** A block of detail rendered on a case-study page. */
export type DetailBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; title?: string; items: string[] }
  | { kind: 'flow'; steps: string[] }
  | { kind: 'groups'; groups: { label: string; items: string[] }[] }

export interface Project {
  id: string
  /** Client / product line, shown as the card's lead meta */
  client: string
  /** Comma-joined discipline tags */
  tags: string
  /** Period or year, right-aligned in the meta row */
  period: string
  /** Card title */
  title: string
  /** One or two sentences, max — kept deliberately short */
  blurb: string
  /** Screenshot path, when one exists */
  image?: string
  demoUrl?: string
  githubUrl?: string
  /** Key technologies, shown on cards that have no screenshot */
  stack?: string[]
  /** Featured items get the wide card treatment */
  featured?: boolean

  // ---- Case-study page fields (present on work entries) ----
  /** Subtitle under the title on the detail page */
  subtitle?: string
  /** Role line, e.g. "Frontend Engineer · UI/UX · E2E Testing" */
  role?: string
  /** Year shown in the detail page meta */
  year?: string
  /** Long-form detail body */
  detail?: DetailBlock[]
}

/**
 * Professional work. Content supplied directly by Justina — no invented
 * metrics or dates. Client names are deliberately withheld; each entry is
 * described by what the product does rather than who it belongs to.
 */
export const work: Project[] = [
  {
    id: 'compliance-platform',
    client: 'Compliance Platform',
    tags: 'AI, Dashboards, Testing',
    period: 'Datamellon',
    title: 'KYC, Administration & AI Platform',
    blurb:
      'Redesigned complex compliance dashboards, shipped AI Studio across 12 dashboards, and added automated E2E coverage to critical KYC workflows.',
    stack: ['React', 'TypeScript', 'API development', 'E2E testing', 'AWS'],
    featured: true,
    subtitle: 'KYC, Administration & AI Platform',
    role: 'Frontend Engineer · UI/UX · API Integration · E2E Testing',
    year: '2026',
    detail: [
      {
        kind: 'paragraph',
        text: 'An enterprise compliance platform built around KYC, administration, analytics, and AI-powered workflows. I contributed across multiple areas of the product, from redesigning complex dashboards to integrating AI capabilities and strengthening automated testing.',
      },
      { kind: 'heading', text: 'My Contributions' },

      { kind: 'subheading', text: 'KYC Dashboard Redesign' },
      {
        kind: 'paragraph',
        text: 'Led the frontend redesign of the KYC dashboard, transforming complex identity-verification workflows into a cleaner and more intuitive interface.',
      },
      {
        kind: 'paragraph',
        text: 'I worked within the existing application architecture, preserving business logic, API integrations, routing, permissions, and validation while modernizing the user experience.',
      },
      {
        kind: 'list',
        title: 'Key contributions',
        items: [
          'Redesigned critical KYC workflows and interfaces',
          'Implemented responsive and reusable UI components',
          'Integrated existing APIs into the redesigned experience',
          'Preserved existing business logic and permissions',
          'Improved information hierarchy across data-heavy screens',
        ],
      },

      { kind: 'subheading', text: 'End-to-End Testing' },
      {
        kind: 'paragraph',
        text: 'Implemented automated E2E testing for critical KYC dashboard workflows.',
      },
      {
        kind: 'paragraph',
        text: 'The goal was to ensure that important verification journeys continued to work reliably as the frontend evolved, providing stronger regression protection for future releases.',
      },
      {
        kind: 'list',
        title: 'Focus areas',
        items: [
          'Critical KYC user journeys',
          'Navigation and workflow behaviour',
          'Form interactions and validation',
          'Regression coverage for redesigned functionality',
        ],
      },

      { kind: 'subheading', text: 'Admin Dashboard Redesign' },
      {
        kind: 'paragraph',
        text: 'Contributed to the redesign of the administrative dashboard, improving the presentation and usability of core management workflows while maintaining the underlying functionality.',
      },

      { kind: 'subheading', text: 'AI Studio — 12 Dashboards' },
      {
        kind: 'paragraph',
        text: 'Designed and implemented the AI Studio experience across the platform ecosystem.',
      },
      {
        kind: 'paragraph',
        text: 'I worked on both the user interface and backend API integration, making AI functionality available consistently across 12 different dashboards.',
      },
      {
        kind: 'list',
        title: 'Key contributions',
        items: [
          'Designed the AI Studio interface',
          'Implemented frontend integrations with AI APIs',
          'Developed supporting backend API endpoints',
          'Created reusable patterns for AI interactions',
          'Maintained a consistent experience across multiple dashboards',
        ],
      },

      { kind: 'heading', text: 'Engineering Highlights' },
      {
        kind: 'groups',
        groups: [
          {
            label: 'Frontend',
            items: ['React', 'TypeScript', 'API Integration', 'Component Architecture'],
          },
          { label: 'Backend', items: ['API Development', 'AI Service Integration'] },
          { label: 'Testing', items: ['End-to-End Testing', 'Regression Coverage'] },
          { label: 'AI & Cloud', items: ['AWS', 'LLM Integration', 'Streaming'] },
        ],
      },

      { kind: 'heading', text: 'What I Learned' },
      {
        kind: 'paragraph',
        text: 'Working across multiple areas of the platform strengthened my ability to work on complex enterprise applications where UI changes cannot be treated independently from existing business logic.',
      },
      {
        kind: 'paragraph',
        text: 'The project also expanded my experience beyond interface development into API implementation, automated testing, AI integrations, and maintaining reliability across large multi-dashboard applications.',
      },
    ],
  },
  {
    id: 'journey-map-generator',
    client: 'Banking AI POC',
    tags: 'AI, RAG, Backend',
    period: 'Datamellon',
    title: 'SOP → Automated Journey Map Generator',
    blurb:
      'An AI proof of concept that turns SOP documents into branded, production-ready journey maps — document parsing, retrieval, LLM reasoning and image rendering in one workflow.',
    stack: ['FastAPI', 'Python', 'AWS Bedrock', 'Amazon Nova Pro', 'Vector + BM25', 'Pillow'],
    featured: true,
    subtitle: 'SOP → Automated Journey Map Generator',
    role: 'AI / Full-stack Engineering · FastAPI · AWS Bedrock · RAG',
    year: '2026',
    detail: [
      {
        kind: 'paragraph',
        text: 'I built an AI-powered proof of concept that transforms standard operating procedure (SOP) documents into branded, production-ready journey maps.',
      },
      {
        kind: 'paragraph',
        text: 'The system combines document processing, retrieval-augmented generation, LLM reasoning, and programmatic image rendering into a single automated workflow.',
      },

      { kind: 'heading', text: 'What I Built' },
      {
        kind: 'paragraph',
        text: 'The application accepts SOP documents and processes their contents to generate structured journey-map information before rendering the result as a branded PNG.',
      },

      { kind: 'heading', text: 'Workflow' },
      {
        kind: 'flow',
        steps: [
          'SOP Document',
          'Document Parsing',
          'Knowledge Retrieval',
          'LLM Processing',
          'Journey Map Structure',
          'Branded PNG Output',
        ],
      },

      { kind: 'heading', text: 'Technical Implementation' },
      {
        kind: 'paragraph',
        text: 'I developed the service using FastAPI and Uvicorn, with AWS services powering the AI and retrieval layer.',
      },
      {
        kind: 'list',
        title: 'AI & Retrieval',
        items: [
          'Amazon Nova Pro through AWS Bedrock',
          'AWS Bedrock Knowledge Base',
          'Hybrid retrieval combining vector and BM25 search',
        ],
      },
      {
        kind: 'list',
        title: 'Document Processing',
        items: ['pypdf for PDF processing', 'python-docx for Word documents'],
      },
      {
        kind: 'list',
        title: 'Rendering',
        items: [
          'Pillow for programmatic journey-map generation',
          'Custom rendering logic for structured layouts',
          'Client branding incorporated directly into the generated output',
        ],
      },

      { kind: 'heading', text: 'The Problem I Solved' },
      {
        kind: 'paragraph',
        text: 'Creating journey maps from SOP documents can involve manually reading, interpreting, structuring, and visually representing large amounts of information.',
      },
      {
        kind: 'paragraph',
        text: 'I built the POC to demonstrate how this process could be automated using AI while still producing a structured and visually consistent output.',
      },

      { kind: 'heading', text: 'Engineering Highlights' },
      {
        kind: 'paragraph',
        text: 'This project gave me hands-on experience combining traditional backend development with modern AI infrastructure — particularly document processing, RAG, LLM integration, and programmatic visual generation.',
      },
    ],
  },
  {
    id: 'analytics-dashboards',
    client: 'Analytics Platform',
    tags: 'Dashboards, Data',
    period: 'Datamellon',
    title: 'Analytics & Timeline Dashboards',
    blurb:
      'Analytics dashboard UI including a Gantt-style timeline, turning raw API data into something stakeholders can read at a glance.',
    stack: ['React', 'Next.js', 'TypeScript', 'Data viz'],
    subtitle: 'Analytics & Timeline Dashboards',
    role: 'Frontend Engineer · Data Visualization · API Integration',
    year: '2026',
    detail: [
      {
        kind: 'paragraph',
        text: 'I implemented frontend interfaces for the analytics dashboards on an AI analytics platform, including a complex Gantt-style timeline for visualizing project and workflow data.',
      },
      { kind: 'heading', text: 'My Contributions' },

      { kind: 'subheading', text: 'Analytics Dashboards' },
      {
        kind: 'paragraph',
        text: 'Built interfaces that consume analytics APIs and transform backend data into structured, interactive dashboard experiences.',
      },

      { kind: 'subheading', text: 'Gantt Timeline' },
      {
        kind: 'paragraph',
        text: 'Implemented the frontend experience for a complex timeline dashboard, translating raw backend arrays into an intuitive visual representation of activities and their relationships over time.',
      },

      { kind: 'heading', text: 'Technical Work' },
      {
        kind: 'list',
        items: [
          'Implemented dashboard UI components',
          'Integrated analytics APIs',
          'Transformed backend data for visualization',
          'Managed frontend state and interactions',
          'Built timeline and Gantt-style interfaces',
          'Handled complex data-driven UI states',
        ],
      },

      { kind: 'heading', text: 'The Challenge' },
      {
        kind: 'paragraph',
        text: 'The backend provided structured data, but raw arrays are difficult for stakeholders to interpret quickly.',
      },
      {
        kind: 'paragraph',
        text: 'My role was to bridge that gap by transforming the data into visual interfaces that made timelines, activities, and progress easier to understand.',
      },

      { kind: 'heading', text: 'Result' },
      {
        kind: 'paragraph',
        text: 'The dashboards provided stakeholders with a more intuitive way to explore analytics and monitor complex workflows without having to interpret raw backend data.',
      },
    ],
  },
  {
    id: 'llm-streaming-platform',
    client: 'AI Assistant Platform',
    tags: 'AI, Streaming',
    period: 'Datamellon',
    title: 'RAG & Real-Time LLM Platform',
    blurb:
      'Client-side SSE integration for a RAG platform — responses render progressively as they stream. Also debugged and restored it in production behind CloudFront.',
    stack: ['React', 'TypeScript', 'Server-Sent Events', 'RAG', 'AWS Amplify'],
    subtitle: 'RAG & Real-Time LLM Platform',
    role: 'Frontend Engineer · API Integration · Real-Time Streaming',
    year: '2026',
    detail: [
      {
        kind: 'paragraph',
        text: 'An AI assistant platform powered by RAG and LLM technologies. I worked on the client-side integration layer, connecting the frontend to streaming AI endpoints to create a real-time conversational experience.',
      },

      { kind: 'heading', text: 'My Contribution' },
      {
        kind: 'paragraph',
        text: 'I integrated RAG and LLM streaming APIs into the frontend, handling incoming streamed responses and presenting them progressively within the interface.',
      },
      {
        kind: 'paragraph',
        text: 'Instead of waiting for an entire response before displaying it, the interface could provide feedback as the model generated its response.',
      },

      { kind: 'heading', text: 'Technical Highlights' },
      {
        kind: 'list',
        items: [
          'Client-side API integration',
          'LLM streaming',
          'Server-Sent Events (SSE)',
          'RAG-powered responses',
          'Real-time UI updates',
          'Production debugging',
          'AWS environment troubleshooting',
        ],
      },

      { kind: 'heading', text: 'Production Challenge' },
      {
        kind: 'paragraph',
        text: 'During production deployment, LLM streaming encountered issues that did not appear in the development environment.',
      },
      {
        kind: 'paragraph',
        text: 'The problem involved differences between the local and production environments, including HTTP/HTTPS protocol requirements and infrastructure timeout behaviour.',
      },

      { kind: 'heading', text: 'How I Contributed' },
      {
        kind: 'paragraph',
        text: 'I worked alongside the Tech Lead and backend team to investigate the issue and update the client-side streaming implementation.',
      },
      {
        kind: 'list',
        title: 'I helped',
        items: [
          'Transition the client integration to secure HTTPS endpoints',
          'Update timeout handling',
          'Clean up legacy SSE proxy logic',
          'Validate the streaming behaviour in the production environment',
        ],
      },

      { kind: 'heading', text: 'What This Taught Me' },
      {
        kind: 'paragraph',
        text: 'The experience strengthened my understanding of real-time frontend systems and demonstrated how frontend behaviour can be affected by infrastructure, networking, and cloud deployment configuration.',
      },
    ],
  },
]

/** Personal and client projects that ship with screenshots. */
export const projects: Project[] = [
  {
    id: 'allwecure',
    client: 'Allwecure',
    tags: 'Next.js, TypeScript, Tailwind',
    period: 'Live',
    title: 'Pharmaceutical marketplace',
    blurb:
      'A procurement network connecting licensed healthcare providers with verified pharmaceutical suppliers.',
    image: '/images/allwecure.png',
    demoUrl: 'https://allwecure.com',
    githubUrl: 'https://github.com/Justinacodes',
    featured: true,
  },
  {
    id: 'jobtracker',
    client: 'AI Job Tracker',
    tags: 'Next.js, TypeScript, Appwrite',
    period: 'Live',
    title: 'AI assistant for the job hunt',
    blurb:
      'Track applications, analyse resumes, generate cover letters and prepare for interviews in one place.',
    image: '/images/jobtracker.png',
    demoUrl: 'https://jobtrackerapp-nu.vercel.app',
    githubUrl: 'https://github.com/Justinacodes',
    featured: true,
  },
  {
    id: 'stuvo',
    client: 'Stuvo',
    tags: 'Next.js, TypeScript, Tailwind',
    period: 'Live',
    title: 'Gamified exam prep',
    blurb: 'Study modes that let students learn smarter and compete with friends.',
    image: '/images/stuvo.png',
    demoUrl: 'https://stuvo-staging.jetprepapp.com/',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'ride-geng',
    client: 'Ride-Geng',
    tags: 'Next.js, TypeScript, Appwrite',
    period: 'Live',
    title: 'Ride-sharing platform',
    blurb:
      'Full-stack ride sharing with authentication, real-time messaging, Google Maps and ride matching.',
    image: '/images/ride-geng.png',
    demoUrl: 'https://ride-geng.vercel.app',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'tee-essentials',
    client: 'Tee-essentials',
    tags: 'React, Redux, Stripe',
    period: 'Live',
    title: 'E-commerce storefront',
    blurb: 'Dynamic cart with advanced filtering, wishlist and a seamless checkout.',
    image: '/images/tee-essentials.png',
    demoUrl: 'https://tee-essentials.vercel.app',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'highklazz',
    client: 'Highklazz',
    tags: 'WordPress, Elementor, Paystack',
    period: 'Live',
    title: 'Menswear store',
    blurb:
      'Cart and checkout, payment integration, live chat and authentication for a clothing and accessory store.',
    image: '/images/highklazz.png',
    demoUrl: 'https://highklazz.com.ng',
  },
  {
    id: 'emmaplus',
    client: 'Emmaplus',
    tags: 'WordPress, WooCommerce, Paystack',
    period: 'Live',
    title: 'Online storefront',
    blurb: 'Shopping cart with filtering, wishlist and checkout on WooCommerce.',
    image: '/images/emmaplus.png',
    demoUrl: 'https://emmaplus.com.ng',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'yieldup',
    client: 'Yield-up',
    tags: 'Next.js, TypeScript, Tailwind',
    period: 'Live',
    title: 'Soil & crop assessment tool',
    blurb: 'A lightweight, interactive tool for quick agricultural assessment.',
    image: '/images/yieldup.png',
    demoUrl: 'https://yieldup.vercel.app',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'movrev',
    client: 'Mov-Rev',
    tags: 'React, JavaScript, CSS',
    period: 'Live',
    title: 'Movie reviews app',
    blurb: 'Browse reviews and ratings for the latest movies.',
    image: '/images/movrev.png',
    demoUrl: 'https://movie-rev-psi.vercel.app',
    githubUrl: 'https://github.com/Justinacodes',
  },
  {
    id: 'revocube',
    client: 'Revocube',
    tags: 'HTML, CSS, JavaScript',
    period: 'Live',
    title: 'Media agency website',
    blurb:
      'Built from the ground up with JavaScript toggle effects, CSS animations and an image slider.',
    image: '/images/revocube.png',
    demoUrl: 'https://revocube.vercel.app/',
    githubUrl: 'https://github.com/Justinacodes',
  },
]

/** Tech stack, grouped by where it sits in the system. */
export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'CSS / SCSS',
      'React Query',
      'Redux',
    ],
  },
  {
    group: 'Backend & APIs',
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'Server-Sent Events', 'MongoDB'],
  },
  {
    group: 'AI',
    items: [
      'AWS Bedrock',
      'Amazon Nova Pro',
      'RAG',
      'LLM integrations',
      'Knowledge Bases',
      'Hybrid search',
    ],
  },
  {
    group: 'Cloud',
    items: ['AWS', 'AWS Amplify', 'CloudFront', 'Vercel', 'Render'],
  },
]

/**
 * Certifications. Dates and credential IDs are deliberately omitted —
 * do not add them unless they are supplied.
 */
export const certifications: { name: string; issuer: string }[] = [
  { name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services' },
  { name: 'Meta Front-End Developer', issuer: 'Meta' },
  { name: 'Programming with JavaScript', issuer: 'Meta' },
  { name: 'Version Control', issuer: 'Meta' },
]

export const socials = {
  email: 'justinaominisan@gmail.com',
  phone: '+2347058635593',
  location: 'Nigeria',
  github: 'https://github.com/Justinacodes',
  linkedin: 'https://www.linkedin.com/in/justina-ominisan-1b5a72246',
}
