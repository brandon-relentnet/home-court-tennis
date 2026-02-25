import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-brand-charcoal text-white flex flex-col justify-end pb-24 px-6 md:px-16 selection:bg-brand-clay selection:text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop" 
          alt="Tennis Court at Night"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Heavy primary to black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-moss/90 via-brand-moss/40 to-black/20" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-element font-sans font-extrabold text-5xl md:text-7xl uppercase tracking-tight text-white/90">
            Tour-Grade Gear meets
          </span>
          <span className="hero-element font-drama italic text-7xl md:text-[8rem] leading-none text-brand-cream">
            Precision.
          </span>
        </h1>
        <p className="hero-element mt-8 text-xl md:text-2xl font-sans max-w-xl text-brand-cream/80 leading-relaxed font-light">
          We don't just sell equipment. We elevate your game with professional stringing, elite apparel, and match-prep protocols.
        </p>
        <div className="hero-element mt-10">
          <button className="magnetic-btn bg-brand-clay text-white px-8 py-4 rounded-full font-sans font-semibold text-lg tracking-wide hover:bg-opacity-90 transition-colors shadow-2xl">
            <span>Gear Up</span>
          </button>
        </div>
      </div>
    </section>
  );
}
