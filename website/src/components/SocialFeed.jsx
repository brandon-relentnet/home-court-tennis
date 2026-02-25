import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    {
        platform: 'Instagram',
        handle: '@homecourtatlanta',
        url: 'https://www.instagram.com/homecourtatlanta/',
        color: 'from-purple-500 via-pink-500 to-orange-400',
        icon: <Instagram size={24} />,
        description: 'Match highlights, player spotlights & courtside content.'
    },
    {
        platform: 'TikTok',
        handle: '@homecourtatlanta',
        url: 'https://www.tiktok.com/@homecourtatlanta',
        color: 'from-cyan-400 via-black to-pink-500',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.61a8.24 8.24 0 0 0 4.76 1.5V6.69h-1z" />
            </svg>
        ),
        description: 'Quick clips, reactions & behind-the-scenes action.'
    },
    {
        platform: 'YouTube',
        handle: '@Homecourtatlanta',
        url: 'https://www.youtube.com/@Homecourtatlanta',
        color: 'from-red-600 to-red-800',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        description: 'Full match coverage, interviews & deep dives.'
    },
    {
        platform: 'Substack',
        handle: '@homecourtatlanta',
        url: 'https://substack.com/@homecourtatlanta',
        color: 'from-orange-500 to-orange-700',
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
        ),
        description: 'In-depth articles, analysis & the weekly newsletter.'
    }
];

export default function SocialFeed() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.social-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="social" ref={sectionRef} className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="font-sans font-bold text-3xl text-brand-charcoal mb-4">
                    Stay Connected
                </h2>
                <p className="font-sans text-brand-moss/70 text-lg max-w-lg">
                    Follow Home Court Tennis across all platforms for the latest coverage, highlights, and behind-the-scenes content.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {socialLinks.map((social, i) => (
                    <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-card group relative bg-brand-charcoal rounded-3xl p-8 overflow-hidden transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl"
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                        <div className="relative z-10 flex flex-col h-full min-h-[180px]">
                            <div className="text-brand-cream mb-4">
                                {social.icon}
                            </div>
                            <div className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-1">
                                {social.platform}
                            </div>
                            <div className="font-sans font-bold text-lg text-brand-cream mb-3">
                                {social.handle}
                            </div>
                            <p className="font-sans text-brand-cream/50 text-sm leading-relaxed mt-auto">
                                {social.description}
                            </p>

                            {/* Hover arrow */}
                            <div className="mt-4 flex items-center gap-2 text-brand-clay text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                Follow →
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
