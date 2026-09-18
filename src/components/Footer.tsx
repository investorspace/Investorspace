import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="relative bg-slate-800 overflow-hidden mt-32">
      {/* Background Image for dark section */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=600&fit=crop&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* HUGE Faint Text */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-[15vw] md:text-[12vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none">
        investorspace
      </div>

      <div className="relative z-10 pt-20 md:pt-28 pb-32 md:pb-48 text-center px-4">
        <h2 className="font-display text-4xl md:text-6xl lg:text-[72px] font-semibold text-white mb-6 tracking-tight leading-tight">
          Your dream home awaits
        </h2>
        <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Whether you're exploring our homes or envisioning something custom, we're here to bring your dream to life.
        </p>
      </div>

      {/* Floating White Footer Card */}
      <div className="relative z-20 bg-white rounded-t-[3rem] md:rounded-t-[4rem] px-6 pt-20 md:pt-24 pb-12">
        
        {/* Floating Glass Button */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <Link
            to="/contact-us"
            className="w-28 h-28 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center text-center text-white font-bold text-xs md:text-[17px] leading-[1.1] transition-all duration-500 hover:scale-105 group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/20 rounded-full group-hover:bg-[#8B1D24] group-hover:border-[#8B1D24] transition-all duration-500" />
            <span className="relative z-10 drop-shadow-md group-hover:drop-shadow-none">Get Your<br/>Free<br/>Quote</span>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto mt-6 md:mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1.2fr] gap-12 lg:gap-0 lg:divide-x lg:divide-slate-200">
            
            {/* Col 1 */}
            <div className="lg:pr-16">
              <img src="/logo.png" alt="Investor Space" className="h-16 w-auto object-contain mb-8" />
              <p className="text-slate-500 text-[15px] leading-relaxed">
                We are creators of transformative spaces that inspire, innovate, and endure.
              </p>
            </div>

            {/* Col 2 */}
            <div className="lg:px-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ul className="space-y-5">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Our Projects', href: '/our-projects' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact Us', href: '/contact-us' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-[15px] font-bold text-[#0F172A] hover:text-[#8B1D24] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-5">
                {[
                  'Developers Services',
                  'Builder Services',
                  'Investor Services',
                  'Services For All',
                ].map((item) => (
                  <li key={item}>
                    <Link to="/our-services" className="text-[15px] font-bold text-[#0F172A] hover:text-[#8B1D24] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div className="lg:pl-16 flex flex-col justify-center">
              <a href="tel:+919818581518" className="text-[28px] md:text-[34px] font-black text-[#0F172A] hover:text-[#8B1D24] transition-colors tracking-tighter mb-4 inline-block">
                +91 9818581518
              </a>
              <div>
                <a href="mailto:contact@investorspace.co" className="text-[22px] md:text-[28px] font-black text-[#0F172A] hover:text-[#8B1D24] transition-colors tracking-tighter border-b-[3px] border-[#8B1D24] pb-2 inline-block">
                  contact@investorspace.co
                </a>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-semibold text-slate-400 mt-12">
                <a href="#" className="hover:text-[#8B1D24] transition-colors">Facebook</a>
                <span>·</span>
                <a href="#" className="hover:text-[#8B1D24] transition-colors">Instagram</a>
                <span>·</span>
                <a href="#" className="hover:text-[#8B1D24] transition-colors">Youtube</a>
                <span>·</span>
                <a href="#" className="hover:text-[#8B1D24] transition-colors">Twitter</a>
              </div>
            </div>

          </div>
          
          <div className="mt-20 pt-8 border-t border-slate-200 text-center text-sm font-semibold text-slate-400">
            © 2026 InvestorSpace. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
