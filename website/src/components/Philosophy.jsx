import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.fromTo(bgRef.current,
        { y: '-10%' }, // Start slightly higher
        {
          y: '10%',    // End slightly lower
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Text Reveal
      const lines = gsap.utils.toArray('.manifesto-line');
      gsap.from(lines, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-48 overflow-hidden bg-brand-charcoal text-brand-cream flex items-center justify-center"
    >
      {/* Background Texture image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop"
          alt="Tennis Court Aerial"
          className="w-full h-[120%] object-cover scale-110 origin-top"
        />
        <div className="absolute inset-0 bg-brand-charcoal/40 mix-blend-multiply" />
      </div>

      <div ref={textRef} className="relative z-10 max-w-4xl px-6 text-center">
        <p className="manifesto-line font-sans text-xl md:text-2xl text-brand-cream/60 mb-6 font-light tracking-wide">
          Most tennis media <span className="text-white font-medium">overlooked college entirely.</span>
        </p>
        <h2 className="manifesto-line font-drama italic text-5xl md:text-7xl leading-tight">
          We put the spotlight <br />
          <span className="text-brand-clay not-italic font-sans font-black tracking-tighter uppercase text-6xl md:text-8xl block mt-4 drop-shadow-lg">Where It Belongs.</span>
        </h2>
      </div>
    </section>
  );
}
