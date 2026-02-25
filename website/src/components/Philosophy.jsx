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
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: '20%',
        ease: 'none'
      });

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
      id="philosophy"
      ref={sectionRef} 
      className="relative w-full py-48 overflow-hidden bg-brand-charcoal text-brand-cream flex items-center justify-center"
    >
      {/* Background Texture image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1542144612-1b3641ec3459?q=80&w=2000&auto=format&fit=crop" 
          alt="Dark Moss Texture"
          className="w-full h-[120%] object-cover scale-110 origin-top"
        />
        <div className="absolute inset-0 bg-brand-charcoal/40 mix-blend-multiply" />
      </div>

      <div ref={textRef} className="relative z-10 max-w-4xl px-6 text-center">
        <p className="manifesto-line font-sans text-xl md:text-2xl text-brand-cream/60 mb-6 font-light tracking-wide">
          Most modern tennis shops focus on: <span className="text-white font-medium">moving inventory based on brand sponsorships.</span>
        </p>
        <h2 className="manifesto-line font-drama italic text-5xl md:text-7xl leading-tight">
          We focus on: <br />
          <span className="text-brand-clay not-italic font-sans font-black tracking-tighter uppercase text-6xl md:text-8xl block mt-4 drop-shadow-lg">Elevating Your Game.</span>
        </h2>
      </div>
    </section>
  );
}
