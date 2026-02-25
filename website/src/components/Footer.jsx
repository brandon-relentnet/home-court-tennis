export default function Footer() {
  return (
    <footer className="w-full bg-[#0d120f] border-t border-brand-moss/20 pt-20 pb-10 px-6 md:px-16 rounded-t-[4rem] text-brand-cream relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-cream/10 pb-16">
        
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-sans font-extrabold text-3xl tracking-tight mb-4">Home Court Tennis</h2>
            <p className="font-drama italic text-xl text-brand-cream/60 max-w-sm">
              The precision engineered pro-shop for the modern player.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-cream/50">System Operational</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-6">Archive</h3>
          <ul className="flex flex-col gap-4 font-sans text-brand-cream/70 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Tour Racquets</a></li>
            <li><a href="#" className="hover:text-white transition-colors">String Vault</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Performance Apparel</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Footwear</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-mono text-xs text-brand-clay uppercase tracking-widest mb-6">Location Target</h3>
          <p className="font-sans text-brand-cream/70 text-sm leading-relaxed mb-6">
            1400 Grand Slam Blvd<br/>
            London, UK SW19 5AE
          </p>
          <button className="magnetic-btn border border-brand-cream/20 text-brand-cream px-6 py-3 rounded-full font-sans font-medium text-sm flex items-center justify-center hover:bg-white hover:text-brand-charcoal transition-colors">
            Contact Outpost
          </button>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between font-mono text-xs text-brand-cream/40">
        <p>&copy; {new Date().getFullYear()} Home Court Tennis. All tactical rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-cream transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-cream transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
