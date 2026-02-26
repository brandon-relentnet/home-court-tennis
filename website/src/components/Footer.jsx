import { Instagram } from 'lucide-react';
import { TikTokIcon, YouTubeIcon, SubstackIcon } from './icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d120f] border-t border-brand-moss/20 pt-20 pb-10 px-6 md:px-16 rounded-t-[4rem] text-brand-cream relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-cream/10 pb-16">

        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-sans font-extrabold text-3xl tracking-tight mb-4">Home Court Tennis</h2>
            <p className="font-drama italic text-xl text-brand-cream/60 max-w-sm">
              Your source for college tennis coverage — from NCAA to pro.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-cream/50">Covering Every Court</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-6">Content</h3>
          <ul className="flex flex-col gap-4 font-sans text-brand-cream/70 text-sm">
            <li><a href="#coverage" className="hover:text-white transition-colors">NCAA Coverage</a></li>
            <li><a href="#coverage" className="hover:text-white transition-colors">Highlights</a></li>
            <li><a href="#coverage" className="hover:text-white transition-colors">Pro Tour</a></li>
            <li><span className="text-brand-cream/40">Merch (Coming Soon)</span></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-6">Follow Along</h3>
          <div className="flex flex-col gap-4 font-sans text-brand-cream/70 text-sm">
            <a href="https://www.instagram.com/homecourtatlanta/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Instagram size={16} /> Instagram
            </a>
            <a href="https://www.tiktok.com/@homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <TikTokIcon /> TikTok
            </a>
            <a href="https://www.youtube.com/@Homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <YouTubeIcon /> YouTube
            </a>
            <a href="https://substack.com/@homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <SubstackIcon /> Substack
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-brand-cream/40">
        <p>&copy; {new Date().getFullYear()} Home Court Tennis. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}
