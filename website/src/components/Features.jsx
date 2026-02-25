import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MousePointer2, Circle } from 'lucide-react';

function ShufflerCard() {
  const [items, setItems] = useState([
    { id: 1, title: 'Pro Staff V14', desc: 'Precision & Feel' },
    { id: 2, title: 'Pure Drive 2024', desc: 'Explosive Power' },
    { id: 3, title: 'Radical MP', desc: 'Versatile Control' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItems = [...prev];
        const last = newItems.pop();
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full perspective-1000">
      {items.map((item, index) => {
        const isTop = index === 0;
        const scale = 1 - index * 0.05;
        const yOffset = index * 12;
        const opacity = 1 - index * 0.2;

        return (
          <div
            key={item.id}
            className="absolute top-0 left-0 w-full bg-brand-cream border border-brand-moss/10 rounded-2xl p-6 shadow-sm transition-all duration-700"
            style={{
              transform: `translateY(${yOffset}px) scale(${scale})`,
              zIndex: 10 - index,
              opacity,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="text-xs font-mono text-brand-clay uppercase tracking-widest mb-1">Elite Frame</div>
            <div className="font-sans font-bold text-lg text-brand-charcoal">{item.title}</div>
            <div className="text-sm font-sans text-brand-moss/70 mt-4">{item.desc}</div>
          </div>
        );
      })}
    </div>
  );
}

function TypewriterCard() {
  const [text, setText] = useState('');
  const fullText = "Tension: 54lbs.\nString: Luxilon ALU Power.\nPattern: 16x19.\nStatus: Ready for play.";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0; // loop
        setText('');
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="h-48 w-full bg-brand-charcoal rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Circle size={8} className="fill-brand-clay text-brand-clay animate-pulse" />
        <span className="text-xs font-mono text-brand-cream/60 uppercase tracking-widest">Live Stringing Feed</span>
      </div>
      <div className="font-mono text-sm text-brand-cream whitespace-pre-line leading-relaxed h-full">
        {text}
        <span className="inline-block w-2.5 h-4 bg-brand-clay align-middle ml-1 animate-pulse" />
      </div>
    </div>
  );
}

function SchedulerCard() {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set(cursorRef.current, { x: 200, y: 150, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 40, duration: 1, ease: 'power2.inOut' }) // Move to Thursday
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, onComplete: () => { setPressed(true); setActiveDay(4); } })
        .to(cursorRef.current, { scale: 1, duration: 0.1, onComplete: () => setPressed(false) })
        .to(cursorRef.current, { x: 180, y: 110, duration: 0.8, delay: 0.3, ease: 'power2.inOut' }) // Move to Save
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, onComplete: () => { setPressed(true); } })
        .to(cursorRef.current, { scale: 1, duration: 0.1, onComplete: () => { setPressed(false); setActiveDay(null); } })
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.2 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-48 w-full bg-brand-cream border border-brand-moss/10 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
      <div className="text-xs font-mono text-brand-moss/60 uppercase tracking-widest mb-4">Select Preparation Day</div>
      
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`h-8 rounded flex items-center justify-center text-xs font-mono transition-colors duration-200 ${
              activeDay === i ? 'bg-brand-clay text-white shadow-sm' : 'bg-brand-moss/5 text-brand-charcoal'
            } ${pressed && activeDay === i ? 'scale-95' : ''}`}
          >
            {d}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button className={`bg-brand-moss text-white px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-transform ${pressed && activeDay !== null ? 'bg-brand-moss/80 scale-95' : ''}`}>
          Save
        </button>
      </div>

      <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none">
        <MousePointer2 size={24} className="text-brand-charcoal fill-white filter drop-shadow-md" />
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <h2 className="font-sans font-bold text-3xl text-brand-charcoal mb-16 max-w-md">
        Tools engineered to dictate the pace of the match.
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="feature-card flex flex-col">
          <ShufflerCard />
          <div className="mt-8">
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">Tour-Grade Gear</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              We exclusively stock models played on the pro tour. Precision engineering for the player who demands feel, control, and unapologetic power.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card flex flex-col">
          <TypewriterCard />
          <div className="mt-8">
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">Precision Stringing</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              Tension matched to exactly how your arm performs. We analyze string patterns and bed stiffness to optimize your attack trajectory.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card flex flex-col">
          <SchedulerCard />
          <div className="mt-8">
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">Match Prep Protocol</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              Schedule targeted drop-offs. We sync stringing recovery and grip replacements exactly 48 hours before your weekend tournament slate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
