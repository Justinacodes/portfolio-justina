import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})


export const metadata: Metadata = {
  title: 'Justina Ominisan - Front-End Developer',
  description: 'Front-end developer dedicated to creating intuitive, user-centered web experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      <Analytics />
    </html>
  )
}