import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const milestones = [
  { year: '2004', title: 'Foundation', body: 'Founded with a vision to provide 100% government-approved plots near key development zones.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop' },
  { year: '2008', title: 'Expansion', body: 'Expanded services to include end-to-end legal support, documentation, and client assistance.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop' },
  { year: '2012', title: 'Partnership', body: 'Successfully partnered with top developers and investors to deliver smart-city projects.', img: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=600&auto=format&fit=crop' },
  { year: '2016', title: 'Milestone', body: 'Reached 100+ satisfied clients with verified residential and commercial plot deliveries.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop' },
  { year: '2026', title: 'Innovation', body: 'Continuing to innovate and guide investors, developers, and buyers toward secure growth.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop' },
];

export default function AboutPage() {
  // Logic for sticky timeline active year
  const [activeYear, setActiveYear] = useState(milestones[0].year);
  
  useEffect(() => {
    const handleScroll = () => {
      // Find which milestone is currently in view
      const elements = document.querySelectorAll('.milestone-card');
      let currentYear = milestones[0].year;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          currentYear = el.getAttribute('data-year') || currentYear;
        }
      });
      setActiveYear(currentYear);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F6F8FA] overflow-clip">
      {/* ── HERO ── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[50vh] md:min-h-[60vh] bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=800&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Massive Background Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          about us
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight">Our Story</h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-slate-300 text-base md:text-lg lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              From investment to possession, we provide end-to-end real estate solutions with absolute transparency.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── MISSION & STATS ── */}
      <section className="bg-white py-16 md:py-32 relative rounded-b-[3rem] md:rounded-b-[4rem] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6 md:mb-8">
                  <span className="w-8 h-[2px] bg-[#8B1D24]" /> Who We Are
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A] leading-tight mb-6 md:mb-8">
                  Shaping the Future of Real Estate
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">
                  Investor Space is a premier real estate promoter specializing in government-approved plots across Dholera SIR and surrounding smart-city zones. We combine legal expertise with market intelligence to deliver secure, growth-oriented investment opportunities.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8B1D24] text-white text-sm font-bold tracking-wide hover:bg-[#6c161c] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  Discover Our Experts
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Reveal>
            </div>
            
            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white rounded-[2.5rem] md:rounded-[3rem] transform translate-x-4 translate-y-4"></div>
                <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden h-[400px] md:h-[500px] shadow-2xl shadow-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&h=1200&fit=crop&auto=format"
                    alt="Real estate team"
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Premium Stats Row */}
          <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: '40+', label: 'Projects Developed', desc: 'Across premium locations' },
              { num: '18M+', label: 'Sq. Ft. Property', desc: 'Successfully delivered' },
              { num: '₹2.5B', label: 'Projects Value', desc: 'Total investment cost' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 150} className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white border border-[#E2E8F0] hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)]" style={{ boxShadow: '0 4px 20px -4px rgba(15,23,42,0.06)' }}>
                {/* Water Droplet Expanding Background */}
                <div className="absolute top-10 left-10 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[40] pointer-events-none" />
                
                <div className="relative z-10 p-10 flex flex-col justify-between min-h-[220px]">
                  <div className="font-body text-6xl font-black text-[#8B1D24] group-hover:text-white mb-2 tracking-tighter group-hover:scale-105 transform origin-left transition-all duration-500">
                    {s.num}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-1">{s.label}</div>
                    <div className="text-sm font-semibold text-slate-400 group-hover:text-white/80 transition-colors duration-500">{s.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY TIMELINE ── */}
      <section className="bg-[#F6F8FA] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
            
            {/* Left Side: Sticky Year */}
            <div className="hidden lg:block relative">
              <div className="sticky top-32 h-[calc(100vh-8rem)] flex flex-col justify-center">
                <Reveal>
                  <h2 className="font-display text-4xl font-semibold text-[#0F172A] mb-8">
                    20+ Years of Excellence
                  </h2>
                </Reveal>
                <div className="relative z-10 text-xl font-bold text-[#8B1D24] uppercase tracking-widest pl-2 mb-2 drop-shadow-sm">
                  Milestone
                </div>
                <div className="relative h-48 flex items-center">
                  {milestones.map((m) => (
                    <div
                      key={m.year}
                      className={`absolute top-1/2 left-[-1rem] font-body font-black text-[14rem] leading-none tracking-tighter text-[#8B1D24]/40 transition-all duration-700 ease-out pointer-events-none ${
                        activeYear === m.year 
                          ? 'opacity-100 -translate-y-1/2 scale-100 blur-none' 
                          : 'opacity-0 -translate-y-[40%] scale-95 blur-sm'
                      }`}
                    >
                      {m.year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Scrolling Cards */}
            <div className="py-16 lg:py-48 space-y-24 md:space-y-32">
              <div className="lg:hidden mb-12 text-center">
                <Reveal>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0F172A]">
                    20+ Years of Excellence
                  </h2>
                </Reveal>
              </div>

              {milestones.map((m, i) => (
                <div key={m.year} className="milestone-card relative" data-year={m.year}>
                  {/* The Line connecting them on mobile */}
                  <div className="absolute left-8 top-0 bottom-[-8rem] w-px bg-slate-200 lg:hidden" />
                  
                  <Reveal delay={i * 100}>
                    <div className="flex flex-col lg:block relative pl-16 lg:pl-0">
                      
                      {/* Mobile dot */}
                      <div className="absolute left-[26px] top-12 w-3 h-3 rounded-full bg-[#8B1D24] shadow-[0_0_0_6px_rgba(139,29,36,0.1)] lg:hidden" />
                      
                      {/* Mobile Year */}
                      <div className="lg:hidden font-body text-4xl font-black text-slate-300 mb-4 tracking-tighter">
                        {m.year}
                      </div>

                      {/* Glass Card */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(15,23,42,0.1)] border border-white group hover:-translate-y-2 transition-all duration-500">
                        <div className="h-48 sm:h-64 w-full relative overflow-hidden">
                          <img src={m.img} alt={m.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent" />
                          <div className="absolute bottom-6 left-8">
                            <h3 className="font-display text-3xl font-semibold text-white">
                              {m.title}
                            </h3>
                          </div>
                        </div>
                        <div className="p-8 md:p-10 bg-white">
                          <p className="text-slate-500 text-lg leading-relaxed">
                            {m.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 3 PILLARS ── */}
      <section className="bg-white py-16 md:py-32 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 shadow-[0_-20px_40px_rgba(15,23,42,0.03)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-4 md:mb-6">
                <span className="w-8 h-[2px] bg-[#8B1D24]" /> Why Choose Us
              </span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-[#0F172A]">
                Our Core Principles
              </h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'What We Do',
                body: 'End-to-end real estate solutions from plot identification and legal verification to documentation, registration, and resale support.',
                cta: 'Our Solutions',
                href: '/our-services',
              },
              {
                num: '02',
                title: 'Our Impact',
                body: 'Shaping smart city projects in Dholera SIR with sustainable development, community value, and lasting investor returns.',
                cta: 'See Projects',
                href: '/our-projects',
              },
              {
                num: '03',
                title: 'Core Values',
                body: 'Integrity and trust form the bedrock of every interaction — from first inquiry to final possession and beyond.',
                cta: 'Discover More',
                href: '/contact-us',
              },
            ].map((p, i) => (
              <Reveal key={p.num} delay={i * 150} className="h-full">
                <div
                  className="group relative rounded-[3rem] p-10 flex flex-col justify-between h-full bg-white border border-[#E2E8F0] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-transparent hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)]"
                  style={{ boxShadow: '0 4px 20px -4px rgba(15,23,42,0.06)' }}
                >
                  {/* Water Droplet Expanding Background */}
                  <div className="absolute top-10 left-10 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[60] pointer-events-none" />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="font-body text-7xl font-black mb-8 tracking-tighter text-slate-100 group-hover:text-white/10 transition-colors duration-500">
                      {p.num}
                    </div>
                    <h3 className="font-display text-3xl font-semibold mb-4 text-[#0F172A] group-hover:text-white transition-colors duration-500">
                      {p.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed font-medium text-slate-500 group-hover:text-white/80 transition-colors duration-500">
                      {p.body}
                    </p>
                  </div>
                  <Link
                    to={p.href}
                    className="relative z-10 mt-12 inline-flex items-center justify-between w-full p-4 rounded-full transition-all duration-300 bg-slate-50 group-hover:bg-white/10 text-[#0F172A] group-hover:text-white border border-transparent group-hover:border-white/20"
                  >
                    <span className="font-bold text-sm ml-2">{p.cta}</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#8B1D24] shadow-sm group-hover:shadow-none group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
