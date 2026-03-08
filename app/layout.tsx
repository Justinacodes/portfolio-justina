import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justinaominisan.com.ng"),

  title: "Justina Ominisan - Front-End Developer",

  description:
    "Front-end developer dedicated to creating intuitive, user-centered web experiences.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Justina Ominisan - Front-End Developer",
    description:
      "Front-end developer dedicated to creating intuitive, user-centered web experiences.",
    url: "https://www.justinaominisan.com.ng",
    siteName: "Justina Ominisan Portfolio",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Justina Ominisan - Front-End Developer",
    description:
      "Front-end developer dedicated to creating intuitive, user-centered web experiences.",
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

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Justina Ominisan",
    url: "https://www.justinaominisan.com.ng",
    jobTitle: "Front-End Developer",
    sameAs: [
      "https://github.com/Justinacodes",
      "https://www.linkedin.com/in/justina-ominisan-1b5a72246"
    ]
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Analytics />
      </body>
    </html>
  )
}
