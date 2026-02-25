import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Capture',
    desc: 'We\'re courtside at the biggest college matches — from packed SEC showdowns to high-stakes NCAA tournament draws.'
  },
  {
    num: '02',
    title: 'Create',
    desc: 'Raw highlights, player spotlights, and behind-the-scenes content that brings you closer to the game than ever before.'
  },
  {
    num: '03',
    title: 'Deliver',
    desc: 'Straight to your feed, every week. Follow us on Instagram, TikTok, and YouTube to never miss a moment.'
  }
];

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.3,
          filter: 'blur(20px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });

      // Animating the graphics inside cards
      gsap.to('.motif-rotate', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
      gsap.to('.laser-line', { y: 200, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      gsap.to('.waveform-path', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'linear' });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative w-full bg-brand-cream py-24 select-none">
      <div className="absolute top-10 left-6 md:left-16 z-10">
        <h2 className="font-sans font-bold text-3xl text-brand-charcoal uppercase tracking-tighter">
          The Process
        </h2>
      </div>

      <div className="flex flex-col items-center">
        {steps.map((step, i) => (
          <div
            key={i}
            className="protocol-card sticky top-0 w-full h-[100vh] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-4xl h-[70vh] bg-brand-charcoal rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row shadow-2xl overflow-hidden relative border border-brand-moss/20">

              {/* Graphic Left Side */}
              <div className="flex-1 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-brand-cream/10 mb-8 md:mb-0 pb-8 md:pb-0 md:pr-10">
                {i === 0 && (
                  <svg className="motif-rotate w-48 h-48 text-brand-clay opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="30" />
                    <circle cx="50" cy="50" r="20" strokeDasharray="2 6" />
                    <line x1="50" y1="10" x2="50" y2="90" />
                    <line x1="10" y1="50" x2="90" y2="50" />
                  </svg>
                )}
                {i === 1 && (
                  <div className="relative w-48 h-48 border border-brand-cream/20 grid grid-cols-6 grid-rows-6">
                    {Array.from({ length: 36 }).map((_, j) => (
                      <div key={j} className="border-[0.5px] border-brand-cream/5" />
                    ))}
                    <div className="laser-line absolute top-0 left-0 w-full h-[2px] bg-brand-clay shadow-[0_0_15px_rgba(204,88,51,0.8)]" style={{ top: '-10px' }} />
                  </div>
                )}
                {i === 2 && (
                  <svg className="w-full h-32 text-brand-moss rotate-180 opacity-90" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="2">
                    <path className="waveform-path" strokeDasharray="400" strokeDashoffset="400" d="M0 20 L40 20 L50 0 L60 40 L70 10 L80 30 L90 20 L200 20" />
                  </svg>
                )}
              </div>

              {/* Content Right Side */}
              <div className="flex-1 md:pl-10 flex flex-col justify-center text-brand-cream">
                <div className="font-mono text-brand-clay text-2xl mb-4 tracking-widest">{step.num}</div>
                <h3 className="font-sans font-extrabold text-4xl md:text-5xl uppercase tracking-tighter mb-6">{step.title}</h3>
                <p className="font-sans text-brand-cream/70 text-lg md:text-xl leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
