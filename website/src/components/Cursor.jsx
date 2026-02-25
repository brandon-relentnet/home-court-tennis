import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: 'power3.out'
            });
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'none'
            });
        };

        const addHoverLinks = () => {
            const links = document.querySelectorAll('a, button, .link-lift, .magnetic-btn');
            links.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(cursor, { scale: 1.5, borderColor: 'rgba(255, 255, 255, 0.5)', duration: 0.3 });
                    gsap.to(dot, { opacity: 0, duration: 0.1 });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(cursor, { scale: 1, borderColor: 'rgba(204, 88, 51, 0.4)', duration: 0.3 });
                    gsap.to(dot, { opacity: 1, duration: 0.1 });
                });
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        // Needs slight timeout to ensure components are rendered
        setTimeout(addHoverLinks, 1500);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 border border-brand-clay/40 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-clay rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
        </>
    );
}
