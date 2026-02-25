import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Play, PlaySquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TABS = ['Instagram', 'TikTok', 'YouTube'];

const MOCK_POSTS = {
    Instagram: [
        { id: 'ig1', type: 'image', url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '2.4k', comments: '142' },
        { id: 'ig2', type: 'image', url: 'https://images.pexels.com/photos/2432299/pexels-photo-2432299.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '1.8k', comments: '89' },
        { id: 'ig3', type: 'image', url: 'https://images.pexels.com/photos/5730248/pexels-photo-5730248.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '3.1k', comments: '215' },
        { id: 'ig4', type: 'image', url: 'https://images.pexels.com/photos/5730239/pexels-photo-5730239.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '4.2k', comments: '304' },
        { id: 'ig5', type: 'image', url: 'https://images.pexels.com/photos/7634035/pexels-photo-7634035.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '1.5k', comments: '67' },
        { id: 'ig6', type: 'image', url: 'https://images.pexels.com/photos/3336214/pexels-photo-3336214.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', likes: '2.9k', comments: '188' },
    ],
    TikTok: [
        { id: 'tk1', type: 'video', url: 'https://images.pexels.com/photos/5730302/pexels-photo-5730302.jpeg?auto=compress&cs=tinysrgb&w=400&h=700&fit=crop', views: '145k', title: 'POV: Match Point in the SEC Finals 🏆' },
        { id: 'tk2', type: 'video', url: 'https://images.pexels.com/photos/4851410/pexels-photo-4851410.jpeg?auto=compress&cs=tinysrgb&w=400&h=700&fit=crop', views: '89k', title: 'Day in the life of a D1 Stringer 🧵' },
        { id: 'tk3', type: 'video', url: 'https://images.pexels.com/photos/2432299/pexels-photo-2432299.jpeg?auto=compress&cs=tinysrgb&w=400&h=700&fit=crop', views: '210k', title: 'The crowd went WILD for this shot 🤯' },
        { id: 'tk4', type: 'video', url: 'https://images.pexels.com/photos/5730248/pexels-photo-5730248.jpeg?auto=compress&cs=tinysrgb&w=400&h=700&fit=crop', views: '54k', title: 'What\'s in the bag? Pro edition 🎒' },
    ],
    YouTube: [
        { id: 'yt1', type: 'video', url: 'https://images.pexels.com/photos/171568/pexels-photo-171568.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop', views: '24k', title: 'FULL MATCH: Florida vs Georgia | 2024 Championship', duration: '1:45:20' },
        { id: 'yt2', type: 'video', url: 'https://images.pexels.com/photos/7634035/pexels-photo-7634035.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop', views: '12k', title: 'Behind The Scenes: The Road to the Title', duration: '14:22' },
        { id: 'yt3', type: 'video', url: 'https://images.pexels.com/photos/3336214/pexels-photo-3336214.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop', views: '8.5k', title: 'Top 10 Shots of the SEC Tournament', duration: '4:15' },
    ]
};

export default function SocialFeed() {
    const sectionRef = useRef(null);
    const gridWrapRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Instagram');
    const [isAnimating, setIsAnimating] = useState(false);

    // Initial scroll trigger animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.social-header', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            // Initial posts load sequence
            gsap.from('.feed-item', {
                scrollTrigger: {
                    trigger: gridWrapRef.current,
                    start: 'top 80%'
                },
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.6,
                stagger: 0.08,
                ease: 'back.out(1.2)',
                clearProps: 'all' // Clean up inline styles so hover classes work
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Watch for activeTab changes to safely trigger the Enter animation
    useEffect(() => {
        if (!isAnimating) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.feed-item',
                { y: 40, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'back.out(1.2)',
                    clearProps: 'all', // Critical: allows group-hover styles to take over
                    onComplete: () => setIsAnimating(false)
                }
            );
        }, gridWrapRef);

        return () => ctx.revert();
    }, [activeTab]);

    // Handle Tab Switch Animation
    const handleTabChange = (newTab) => {
        if (newTab === activeTab || isAnimating) return;
        setIsAnimating(true);

        const ctx = gsap.context(() => {
            // Animate out
            gsap.to('.feed-item', {
                y: -20,
                opacity: 0,
                scale: 0.95,
                duration: 0.25,
                stagger: 0.04,
                ease: 'power2.in',
                onComplete: () => {
                    // Update React state after exit animation finishes. 
                    // This triggers the useEffect above to handle the enter animation.
                    setActiveTab(newTab);
                }
            });
        }, gridWrapRef);
    };

    const renderPosts = () => {
        const posts = MOCK_POSTS[activeTab];

        if (activeTab === 'Instagram') {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="feed-item group relative aspect-square bg-brand-charcoal overflow-hidden rounded-lg md:rounded-2xl cursor-pointer">
                            <img src={post.url} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                                <div className="flex items-center gap-2 text-white font-sans font-bold">
                                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                    {post.likes}
                                </div>
                                <div className="flex items-center gap-2 text-white font-sans font-bold">
                                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" /></svg>
                                    {post.comments}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'TikTok') {
            return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="feed-item group relative aspect-[9/16] bg-brand-charcoal overflow-hidden rounded-2xl cursor-pointer">
                            <img src={post.url} alt="TikTok Video" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Play className="w-12 h-12 text-white fill-white/80 backdrop-blur-sm rounded-full p-2 bg-black/20" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-1 text-white/90 font-mono text-xs mb-2">
                                    <PlaySquare size={14} /> {post.views}
                                </div>
                                <p className="text-white font-sans text-sm font-medium line-clamp-2 leading-snug drop-shadow-md">
                                    {post.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'YouTube') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="feed-item group cursor-pointer">
                            <div className="relative aspect-video bg-brand-charcoal overflow-hidden rounded-2xl mb-4">
                                <img src={post.url} alt="YouTube Video" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-[10px] px-2 py-1 rounded backdrop-blur-md">
                                    {post.duration}
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className="text-brand-charcoal font-sans font-bold leading-tight group-hover:text-brand-clay transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-brand-moss/60 font-mono text-xs mt-2 uppercase tracking-wide">
                                    {post.views} views • Home Court Tennis
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <section id="social" ref={sectionRef} className="py-32 px-6 md:px-16 w-full max-w-[1400px] mx-auto min-h-screen flex flex-col">
            <div className="social-header flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                <div>
                    <h2 className="font-sans font-bold text-4xl text-brand-charcoal mb-4">
                        The Feed
                    </h2>
                    <p className="font-sans text-brand-moss/70 text-lg max-w-sm">
                        Watch the latest match highlights, player reactions, and behind-the-scenes content across all channels.
                    </p>
                </div>

                {/* Sexy Filter Switch */}
                <div className="relative flex p-1.5 bg-brand-moss/5 rounded-full border border-brand-moss/10 shadow-inner">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`relative z-10 px-6 md:px-8 py-3 rounded-full font-mono text-sm uppercase tracking-widest font-medium transition-colors duration-300 w-full sm:w-auto ${activeTab === tab ? 'text-white' : 'text-brand-moss/60 hover:text-brand-charcoal'
                                }`}
                        >
                            {tab}
                            {/* Active Pill Background indicator handled via pseudo element for smoothness or standard absolute div */}
                            {activeTab === tab && (
                                <div className="absolute inset-0 bg-brand-clay rounded-full -z-10 shadow-md" style={{ viewTransitionName: 'active-pill' }} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div ref={gridWrapRef} className="w-full flex-grow">
                {renderPosts()}
            </div>

            {/* View All Button */}
            <div className="mt-16 text-center">
                <a href={`https://${activeTab.toLowerCase()}.com/homecourtatlanta`} target="_blank" rel="noopener noreferrer" className="inline-block magnetic-btn border-2 border-brand-charcoal text-brand-charcoal px-8 py-4 rounded-full font-sans font-bold text-sm tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors duration-300">
                    View All on {activeTab}
                </a>
            </div>
        </section>
    );
}
