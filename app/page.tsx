import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}

export default Home
