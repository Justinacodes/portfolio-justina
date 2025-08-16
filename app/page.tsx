
// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Justina Ominisan - Front-End Developer</title>
        <meta name="description" content="Front-end developer dedicated to creating intuitive, user-centered web experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Resume />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;
