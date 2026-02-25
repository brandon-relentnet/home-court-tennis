import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'scrolled-nav',
          targets: navRef.current
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl rounded-full px-6 py-4 flex items-center justify-between transition-all duration-500 text-brand-cream
        [&.scrolled-nav]:bg-brand-cream/60 [&.scrolled-nav]:backdrop-blur-xl [&.scrolled-nav]:text-brand-moss [&.scrolled-nav]:border [&.scrolled-nav]:border-brand-moss/10 [&.scrolled-nav]:shadow-lg"
    >
      <div className="font-sans font-bold text-xl tracking-tight link-lift cursor-pointer">
        Home Court Tennis
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest font-medium">
        <a href="#features" className="link-lift">Gear</a>
        <a href="#philosophy" className="link-lift">Philosophy</a>
        <a href="#protocol" className="link-lift">Protocol</a>
      </div>
      <a href="#features" className="magnetic-btn bg-brand-clay text-white px-6 py-2.5 rounded-full font-sans font-semibold text-sm tracking-wide shadow-md">
        <span>Shop Now</span>
      </a>
    </nav>
  );
}
