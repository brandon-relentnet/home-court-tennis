import { Instagram } from 'lucide-react';

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
            <li><a href="#" className="hover:text-white transition-colors">Merch (Coming Soon)</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-6">Follow Along</h3>
          <div className="flex flex-col gap-4 font-sans text-brand-cream/70 text-sm">
            <a href="https://www.instagram.com/homecourtatlanta/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <Instagram size={16} /> Instagram
            </a>
            <a href="https://www.tiktok.com/@homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.61a8.24 8.24 0 0 0 4.76 1.5V6.69h-1z" /></svg>
              TikTok
            </a>
            <a href="https://www.youtube.com/@Homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              YouTube
            </a>
            <a href="https://substack.com/@homecourtatlanta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>
              Substack
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-brand-cream/40">
        <p>&copy; {new Date().getFullYear()} Home Court Tennis. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-cream transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
