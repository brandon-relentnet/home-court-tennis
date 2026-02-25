import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image Scale In
      gsap.from('.hero-bg', {
        scale: 1.2,
        duration: 4,
        ease: 'power3.out',
        delay: 2.5
      });

      // Elements Reveal
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 3.0
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-brand-charcoal text-white flex flex-col justify-end pb-24 px-6 md:px-16 selection:bg-brand-clay selection:text-white">
      {/* Background Image — Tennis stadium with crowd */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/171568/pexels-photo-171568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Tennis Stadium with Crowd"
          className="hero-bg w-full h-full object-cover transform-gpu opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-moss/90 via-brand-moss/40 to-black/20" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-element font-sans font-extrabold text-5xl md:text-7xl uppercase tracking-tight text-white/90">
            Every Match.
          </span>
          <span className="hero-element font-drama italic text-7xl md:text-[8rem] leading-none text-brand-cream">
            Every Moment.
          </span>
        </h1>
        <p className="hero-element mt-8 text-xl md:text-2xl font-sans max-w-xl text-brand-cream/80 leading-relaxed font-light">
          Your home court for college tennis coverage — from the NCAA&apos;s biggest stages to the next generation of pros.
        </p>
        <div className="hero-element mt-10">
          <a href="#coverage" className="inline-block magnetic-btn bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-semibold text-lg tracking-wide hover:bg-opacity-90 transition-colors shadow-2xl">
            <span>Explore Coverage</span>
          </a>
        </div>
      </div>
    </section>
  );
}
