import type { Metadata } from 'next'
import { Roboto, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
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

const TITLE = "Justina Ominisan - Frontend Engineer / AI Engineer"
const DESCRIPTION =
  "Frontend Engineer and AI Engineer building modern web applications, AI-powered products and data-driven interfaces with React, Next.js, TypeScript and AWS."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justinaominisan.com.ng"),

  title: TITLE,

  description: DESCRIPTION,

  keywords: [
    "Frontend Engineer",
    "AI Engineer",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justina Ominisan",
  url: "https://www.justinaominisan.com.ng",
  jobTitle: "Frontend Engineer / AI Engineer",
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
        className={`${roboto.className} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
