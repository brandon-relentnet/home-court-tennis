import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import { initMagneticButtons } from './utils/magnetic';

const HAS_FINE_POINTER = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

function App() {
  useEffect(() => {
    let cleanup;
    const timer = setTimeout(() => {
      cleanup = initMagneticButtons();
    }, 1500);
    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className={`relative w-full min-h-screen ${HAS_FINE_POINTER ? 'cursor-none' : ''}`}>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <SocialFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
