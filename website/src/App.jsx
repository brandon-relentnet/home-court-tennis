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

function App() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initMagneticButtons();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen cursor-none">
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
