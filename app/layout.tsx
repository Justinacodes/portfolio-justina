import type { Metadata, Viewport } from 'next'
import { Roboto, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})
const TITLE = "Justina Ominisan - Software Engineer, Frontend & AI"
const DESCRIPTION =
  "Frontend-focused software engineer building polished interfaces, websites and online stores for businesses, and AI-powered products with React, Next.js, TypeScript and AWS."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justinaominisan.com.ng"),

  title: TITLE,

  description: DESCRIPTION,

  keywords: [
    "Software Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "AI Engineer",
    "Web Developer",
    "Website for business",
    "React",
    "Next.js",
    "TypeScript",
    "AWS Bedrock",
    "RAG",
    "LLM streaming",
    "Justina Ominisan",
  ],

  authors: [{ name: "Justina Ominisan", url: "https://www.justinaominisan.com.ng" }],
  creator: "Justina Ominisan",

  verification: {
    google: "PyTHVuWdONV5Wab8KSgC7_Jom6EBI2Z9GFuMjeaekr8",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.justinaominisan.com.ng",
    siteName: "Justina Ominisan Portfolio",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },

  other: {
    "color-scheme": "light dark",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Keep the light hero scrim readable against the browser UI in both themes.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f1e8' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0d0c' },
  ],
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justina Ominisan",
  url: "https://www.justinaominisan.com.ng",
  jobTitle: "Software Engineer",
  description: DESCRIPTION,
  knowsAbout: [
    "Frontend Engineering",
    "React",
    "Next.js",
    "TypeScript",
    "AI Engineering",
    "Retrieval-Augmented Generation",
    "AWS Bedrock",
    "API Development",
    "End-to-End Testing",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "AWS Certified AI Practitioner",
    recognizedBy: {
      "@type": "Organization",
      name: "Amazon Web Services",
    },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Elizade University",
  },
  sameAs: [
    "https://github.com/Justinacodes",
    "https://www.linkedin.com/in/justina-ominisan-1b5a72246",
  ],
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored/system theme before first paint so there is no
            flash. Must be a plain script with dangerouslySetInnerHTML —
            next/script is not supported inside <head> here, and passing
            children to a script tag triggers a React warning. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${roboto.className} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      >
        {/* Loading screen. Server-rendered so it paints with the first byte,
            then faded out by the inline script once the page (fonts, hero
            photo) has loaded. It is only hidden, never removed: React owns
            this node, and pulling it out of the DOM would break hydration. */}
        <div id="splash" className="splash" aria-hidden="true">
          <p className="splash-mark font-display">
            Justina<span className="splash-dot">.</span>
          </p>
          <span className="splash-bar" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            // Wait for `load`, but keep it up at least 700ms from navigation
            // start (no flash on cached loads) and never longer than 4s (a slow
            // third-party request shouldn't hold the page hostage).
            __html: `(function(){var d=document.documentElement,done=false;function hide(){if(done)return;done=true;setTimeout(function(){d.classList.add('splash-done')},Math.max(0,700-performance.now()))}if(document.readyState==='complete')hide();else window.addEventListener('load',hide);setTimeout(hide,4000)})();`,
          }}
        />
        <noscript>
          <style>{`.splash{display:none}.stream-char{opacity:1}`}</style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
