import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setComplete(true);
                if (onComplete) onComplete();
            }
        });

        tl.to('.preloader-text span', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.2
        })
            .to('.preloader-text', {
                opacity: 0,
                duration: 0.5,
                delay: 0.5
            })
            .to('.preloader-bg', {
                height: 0,
                ease: 'expo.inOut',
                duration: 1.5
            });

        return () => tl.kill();
    }, [onComplete]);

    if (complete) return null;

    return (
        <div className="preloader-bg fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal text-brand-cream overflow-hidden origin-top">
            <div className="preloader-text overflow-hidden flex space-x-2 font-drama italic text-4xl md:text-6xl tracking-widest">
                {'HOME COURT TENNIS'.split(' ').map((word, i) => (
                    <span key={i} className="inline-block translate-y-[100%] opacity-0">
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}
