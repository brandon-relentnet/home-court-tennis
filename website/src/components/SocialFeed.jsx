import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { YouTubeIcon, TikTokIcon, SubstackIcon } from './icons';

gsap.registerPlugin(ScrollTrigger);

const BEHOLD_FEED_URL = 'https://feeds.behold.so/4Mueu6QvWx8gReU6hxN3';

const OTHER_PLATFORMS = [
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/@Homecourtatlanta',
        tagline: 'Full matches & behind the scenes',
        icon: <YouTubeIcon className="w-5 h-5" />,
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@homecourtatlanta',
        tagline: 'Quick hits & viral moments',
        icon: <TikTokIcon className="w-5 h-5" />,
    },
    {
        name: 'Substack',
        url: 'https://substack.com/@homecourtatlanta',
        tagline: 'The weekly newsletter',
        icon: <SubstackIcon className="w-5 h-5" />,
    },
];

export default function SocialFeed() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Instagram posts from Behold
    useEffect(() => {
        let cancelled = false;
        async function fetchFeed() {
            try {
                const res = await fetch(BEHOLD_FEED_URL);
                if (!res.ok) throw new Error('Failed to load feed');
                const data = await res.json();
                const valid = (data.posts || []).filter(
                    (p) => p.id && p.permalink && (p.sizes?.medium?.mediaUrl || p.thumbnailUrl)
                );
                if (!cancelled) setPosts(valid);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchFeed();
        return () => { cancelled = true; };
    }, []);

    // GSAP scroll-triggered entrance animations
    useEffect(() => {
        if (loading || error) return;

        const ctx = gsap.context(() => {
            gsap.from('.social-header', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            gsap.from('.feed-item', {
                scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.6,
                stagger: 0.08,
                ease: 'back.out(1.2)',
                clearProps: 'all',
            });

            gsap.from('.social-link-card', {
                scrollTrigger: { trigger: '.social-links-strip', start: 'top 85%' },
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: 'power3.out',
                clearProps: 'all',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading, error]);

    return (
        <section
            id="social"
            ref={sectionRef}
            className="py-32 px-6 md:px-16 w-full max-w-[1400px] mx-auto"
        >
            {/* ── Header ────────────────────────────────────── */}
            <div className="social-header mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <Instagram size={20} className="text-brand-clay" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-clay">
                        @homecourtatlanta
                    </span>
                </div>
                <h2 className="font-sans font-bold text-4xl text-brand-charcoal mb-4">
                    Fresh Off the Court
                </h2>
                <p className="font-sans text-brand-moss/70 text-lg max-w-lg">
                    The latest from our Instagram — match highlights, player
                    moments, and everything in between.
                </p>
            </div>

            {/* ── Instagram Grid ────────────────────────────── */}
            <div ref={gridRef}>
                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-[4/5] bg-brand-moss/10 rounded-2xl animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-20">
                        <p className="font-sans text-brand-moss/60 text-lg">
                            Couldn't load the feed right now.
                        </p>
                        <a
                            href="https://www.instagram.com/homecourtatlanta/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 font-mono text-sm text-brand-clay underline underline-offset-4 hover:text-brand-charcoal transition-colors"
                        >
                            Visit us on Instagram instead
                        </a>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-sans text-brand-moss/60 text-lg">
                            No posts yet — check back soon.
                        </p>
                    </div>
                )}

                {/* Post grid */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="feed-item group relative aspect-[4/5] bg-brand-charcoal overflow-hidden rounded-xl md:rounded-2xl block"
                            >
                                <img
                                    src={
                                        post.sizes?.medium?.mediaUrl ||
                                        post.thumbnailUrl
                                    }
                                    alt={post.prunedCaption || 'Instagram post'}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Reel indicator */}
                                {post.isReel && (
                                    <div className="absolute top-3 right-3 text-white/80 drop-shadow-md">
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Caption on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <p className="text-white text-sm font-sans leading-snug line-clamp-2 drop-shadow-lg">
                                        {post.prunedCaption}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* ── View All ──────────────────────────────────── */}
            <div className="mt-12 text-center">
                <a
                    href="https://www.instagram.com/homecourtatlanta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block magnetic-btn border-2 border-brand-charcoal text-brand-charcoal px-8 py-4 rounded-full font-sans font-bold text-sm tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors duration-300"
                >
                    View All on Instagram
                </a>
            </div>

            {/* ── Other Platforms Strip ─────────────────────── */}
            <div className="social-links-strip mt-24 pt-16 border-t border-brand-moss/10">
                <p className="font-drama italic text-2xl text-brand-moss/50 mb-8 text-center">
                    We're everywhere you want to be
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {OTHER_PLATFORMS.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link-card group flex items-center justify-between p-6 rounded-2xl border border-brand-moss/10 hover:border-brand-clay/30 bg-brand-moss/[0.02] hover:bg-brand-moss/[0.05] transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center group-hover:bg-brand-clay transition-colors duration-300">
                                    {platform.icon}
                                </div>
                                <div>
                                    <span className="font-sans font-bold text-brand-charcoal block">
                                        {platform.name}
                                    </span>
                                    <span className="font-mono text-xs text-brand-moss/50">
                                        {platform.tagline}
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight
                                size={20}
                                className="text-brand-moss/30 group-hover:text-brand-clay group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
