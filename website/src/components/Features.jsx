import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Circle, Trophy, Tv } from 'lucide-react';

function ShufflerCard() {
  const [items, setItems] = useState([
    { id: 1, title: 'SEC Championship', desc: 'Conference Finals Coverage' },
    { id: 2, title: 'ACC Showdown', desc: 'Top 10 Singles Matchup' },
    { id: 3, title: 'NCAA Tournament', desc: 'Road to the Title' },
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
            <div className="text-xs font-mono text-brand-clay uppercase tracking-widest mb-1">Featured Event</div>
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
  const fullText = "LIVE: #3 Florida vs #7 Georgia\nSet 2 — Tiebreak 6-5\nCourt 1: Match Point.\nStatus: Streaming Now.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setText('');
        }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="h-48 w-full bg-brand-charcoal rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <Circle size={8} className="fill-brand-clay text-brand-clay animate-pulse" />
        <span className="text-xs font-mono text-brand-cream/60 uppercase tracking-widest">Live Match Feed</span>
      </div>
      <div className="font-mono text-sm text-brand-cream whitespace-pre-line leading-relaxed h-full">
        {text}
        <span className="inline-block w-2.5 h-4 bg-brand-clay align-middle ml-1 animate-pulse" />
      </div>
    </div>
  );
}

function ScheduleCard() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const schedule = [
    { day: 'TUE', match: 'Duke vs UNC', time: '2:00 PM' },
    { day: 'THU', match: 'Stanford vs USC', time: '5:00 PM' },
    { day: 'SAT', match: 'Florida vs Georgia', time: '1:00 PM' },
  ];
  const activeDays = schedule.map(s => s.day);

  return (
    <div className="h-48 w-full bg-brand-cream border border-brand-moss/10 rounded-2xl p-5 shadow-sm relative overflow-hidden select-none">
      <div className="text-xs font-mono text-brand-moss/60 uppercase tracking-widest mb-4">This Week&apos;s Matches</div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((d) => (
          <div
            key={d}
            className={`h-7 rounded flex items-center justify-center text-[10px] font-mono transition-colors duration-200 ${activeDays.includes(d) ? 'bg-brand-clay text-white shadow-sm' : 'bg-brand-moss/5 text-brand-charcoal'
              }`}
          >
            {d.charAt(0)}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {schedule.map((s, i) => (
          <div key={i} className="flex items-center justify-between text-xs font-sans">
            <span className="text-brand-charcoal font-medium">{s.match}</span>
            <span className="text-brand-moss/50 font-mono">{s.time}</span>
          </div>
        ))}
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
    <section ref={sectionRef} id="coverage" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <h2 className="font-sans font-bold text-3xl text-brand-charcoal mb-16 max-w-md">
        Coverage built for the college tennis community.
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="feature-card flex flex-col">
          <ShufflerCard />
          <div className="mt-8">
            <Trophy size={20} className="text-brand-clay mb-3" />
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">NCAA Coverage</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              From conference battles to the national championship — we cover the matches that matter in college tennis.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="feature-card flex flex-col">
          <TypewriterCard />
          <div className="mt-8">
            <Tv size={20} className="text-brand-clay mb-3" />
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">Live Updates</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              Real-time scores, match highlights, and courtside reactions delivered straight to your feed as the action unfolds.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="feature-card flex flex-col">
          <ScheduleCard />
          <div className="mt-8">
            <h3 className="font-sans font-bold text-xl text-brand-moss mb-2">Match Schedule</h3>
            <p className="font-sans text-brand-moss/70 leading-relaxed text-sm">
              Never miss a match. Stay locked in with our weekly schedule of the biggest college tennis matchups across the country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
