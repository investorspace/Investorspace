import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

/* ── Animated Counter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className="counter-num">{count.toLocaleString()}{suffix}</span>;
}

/* ── Reveal on scroll ── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Trust Card ── */
function TrustCard({ icon, title, body, delay }: { icon: React.ReactNode; title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="relative h-full overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] rounded-2xl p-7 border border-white/60 hover:border-transparent bg-white/70"
        style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        {/* Water Droplet Expanding Background */}
        <div className="absolute top-7 left-7 w-12 h-12 bg-[#8B1D24]/90 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[25] pointer-events-none" />
        
        <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white text-[#8B1D24] shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all duration-500 border border-slate-100 group-hover:border-transparent">
          {icon}
        </div>
        <h3 className="relative z-10 font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-3">{title}</h3>
        <p className="relative z-10 text-sm text-[#475569] group-hover:text-white/90 transition-colors duration-500 leading-relaxed">{body}</p>
      </div>
    </Reveal>
  );
}

/* ── Service Card ── */
function ServiceCard({ title, subtitle, imgUrl, delay, href }: { title: string; subtitle: string; imgUrl: string; delay: number; href: string }) {
  const navigate = useNavigate();
  return (
    <Reveal delay={delay} className="h-full">
      <div onClick={() => navigate(href)} className="group h-full relative overflow-hidden rounded-2xl border border-[#E2E8F0] hover:border-transparent bg-white cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] flex flex-col block">
        
        <div className="relative overflow-hidden h-56 shrink-0 bg-slate-200">
          <div className="absolute inset-0 bg-[#8B1D24]/0 group-hover:bg-[#8B1D24]/20 transition-colors duration-700 z-10 pointer-events-none" />
          <img src={imgUrl} alt={title} className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-110" />
        </div>
        
        <div className="p-6 relative overflow-hidden flex flex-1 items-center justify-between bg-white">
          {/* Water Droplet Expanding Background from the arrow button */}
          <div className="absolute top-1/2 right-11 w-4 h-4 -translate-y-1/2 bg-[#8B1D24] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[40] pointer-events-none" />
          
          <div className="relative z-10 pr-4">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#8B1D24] group-hover:text-white/80 transition-colors duration-500">{subtitle}</div>
            <h3 className="font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mt-1">{title}</h3>
          </div>
          
          <div className="relative z-10 w-10 h-10 rounded-full bg-[#8B1D24] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#8B1D24] shrink-0 overflow-hidden transition-colors duration-500 shadow-md">
            {/* Arrow leaving */}
            <svg className="w-5 h-5 absolute transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:translate-x-[150%]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {/* Arrow entering */}
            <svg className="w-5 h-5 absolute -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Testimonial ── */
const testimonials = [
  { name: 'Neha Reddy', role: 'Project Manager', quote: 'The Investor Space team is highly professional and well-versed with Dholera SIR regulations. Their commitment and integrity are impressive. A wonderful experience overall!' },
  { name: 'Arvind Patel', role: 'Senior Investor', quote: 'I found the perfect plots with full legal documentation. The transparency and after-sale support is unmatched in the industry.' },
  { name: 'Rajesh Mehta', role: 'Business Developer', quote: 'From consultation to registration, every step was smooth. Truly a reliable partner for real estate investments.' },
  { name: 'Priya Sharma', role: 'Independent Investor', quote: 'Government-approved plots with complete documentation — exactly what I was looking for. Highly recommended!' },
];

/* ── Connectivity Step ── */
const connectivitySteps = [
  { num: '01', label: '10 minutes away', title: 'Dholera S.I.R. TP1A & TP1A-3', subtitle: 'Core development zone connectivity' },
  { num: '02', label: '12 minutes away', title: 'International Airport', subtitle: 'Seamless air connectivity' },
  { num: '03', label: '10 minutes away', title: 'Expressway', subtitle: 'Direct highway access' },
  { num: '04', label: '10 minutes away', title: 'Metro Connectivity', subtitle: 'Urban transit network' },
];

const connectivityImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop&auto=format',
];

const customLogos = [
  {
    content: (
      <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="square" d="M19 21V5H7v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h2v5m-4 0h4" />
        </svg>
        <span className="font-body font-black text-[12px] tracking-wider uppercase">ARCHITECTURE</span>
      </div>
    )
  },
  {
    content: (
      <div className="flex items-center justify-center gap-2">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l10 9h-3v9H5v-9H2L12 3z" />
        </svg>
        <div className="flex flex-col font-body font-black text-[13px] tracking-wider uppercase leading-[1.1]">
          <span>HOME<span className="text-[10px] ml-0.5">&</span></span>
          <span>GARDEN</span>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="square" d="M19 21V5H7v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5h2v5m-4 0h4" />
        </svg>
        <span className="font-body font-black text-[12px] tracking-wider uppercase">ARCHITECTURE</span>
      </div>
    )
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center gap-0.5 mt-2">
        <svg className="w-16 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 10h6v4H2v-4zm8 0h8v4h-8v-4zm10 0h2v4h-2v-4zM2 16h8v4H2v-4zm10 0h10v4H12v-4zM2 4h10v4H2V4zm12 0h8v4h-8V4z" />
        </svg>
        <div className="flex flex-col items-center font-body font-black text-[14px] tracking-widest uppercase leading-none mt-1">
          <span>BRICK</span>
          <span className="text-[7px] tracking-[0.4em] font-bold mt-1">COMPANY</span>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="flex items-center justify-center gap-2">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <div className="flex flex-col font-body font-black text-[13px] tracking-wider uppercase leading-none gap-0.5">
          <span>HOME</span>
          <span>BUILD</span>
          <span className="text-[7px] tracking-[0.2em] mt-1 font-bold">CONSTRUCTION</span>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 22V8l4-4 4 4v14H4zm6 0V10l4-3 4 3v12h-8z" />
          <path d="M14 22V6l3-2 3 2v16h-6z" />
        </svg>
        <span className="font-body font-black text-[13px] tracking-wider uppercase mt-1">CONSTRUCTION</span>
      </div>
    )
  },
];

export default function HomePage() {
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const blogSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const startScroll = () => {
      interval = setInterval(() => {
        if (blogSliderRef.current) {
          const slider = blogSliderRef.current;
          const maxScroll = slider.scrollWidth - slider.clientWidth;
          if (slider.scrollLeft >= maxScroll - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            slider.scrollBy({ left: slider.clientWidth > 800 ? 400 : 320, behavior: 'smooth' });
          }
        }
      }, 3500);
    };

    startScroll();
    
    const sliderEl = blogSliderRef.current;
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', () => clearInterval(interval));
      sliderEl.addEventListener('mouseleave', startScroll);
    }

    return () => {
      clearInterval(interval);
      if (sliderEl) {
        sliderEl.removeEventListener('mouseenter', () => clearInterval(interval));
        sliderEl.removeEventListener('mouseleave', startScroll);
      }
    };
  }, []);

  const scrollBlog = (direction: 'left' | 'right') => {
    if (blogSliderRef.current) {
      const { current } = blogSliderRef;
      const scrollAmount = current.clientWidth > 800 ? current.clientWidth / 2 : current.clientWidth;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [wordsVisible, setWordsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setHeroParallax({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Hero words reveal
  useEffect(() => {
    const timer = setTimeout(() => setWordsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Connectivity scroll
  useEffect(() => {
    const section = document.getElementById('connectivity-section');
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight)));
      setActiveStep(Math.min(3, Math.floor(progress * 4)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headline = 'Building a Better Future For Every Investor'.split(' ');

  return (
    <div className="w-full overflow-clip">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 overflow-hidden"
        style={{ background: '#0F172A' }}
      >
        {/* Parallax bg Wrapper with Zoom Out */}
        <div className="absolute inset-0 animate-hero-zoom">
          <div
            className="absolute inset-[-10%]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&h=1200&fit=crop&auto=format')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${heroParallax.x * -0.3}px, ${heroParallax.y * -0.3}px) scale(1.05)`,
              transition: 'transform 0.1s linear',
            }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.65) 50%, rgba(139,29,36,0.3) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1D24] animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-white/80 font-medium">Dholera SIR Specialists</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 overflow-hidden">
              {headline.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-3"
                  style={{
                    opacity: wordsVisible ? 1 : 0,
                    transform: wordsVisible ? 'translateY(0)' : 'translateY(100%)',
                    transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              className="text-lg text-slate-300 leading-relaxed mb-6 max-w-xl"
              style={{
                opacity: wordsVisible ? 1 : 0,
                transform: wordsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 700ms, transform 0.7s ease 700ms',
              }}
            >
              From concept to completion, we focus on sustainable development, transparency, and growth-driven investments that redefine smart living.
            </p>

            <p
              className="text-sm text-slate-400 mb-10"
              style={{
                opacity: wordsVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 900ms',
              }}
            >
              We developed landmark real estate projects that deliver lasting value to investors and communities.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: wordsVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 1000ms',
              }}
            >
              <Link
                to="/our-services"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full text-sm transition-all duration-200 hover:scale-105"
                style={{ background: '#8B1D24' }}
              >
                View Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-full text-sm border border-white/30 hover:bg-white/10 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* 3 Trust Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
            <TrustCard
              delay={200}
              title="Verified & Government-Approved Projects"
              body="We offer 100% DSIRDA and GIDA-approved residential and commercial plots in Dholera SIR, ensuring legality, safety, and long-term value for every investor."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
            <TrustCard
              delay={350}
              title="End-to-End Client Support"
              body="From consultation and documentation to registration and resale, our dedicated team guides you through every step with full transparency and professionalism."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
            <TrustCard
              delay={500}
              title="Strong Developer & Investor Partnerships"
              body="We collaborate with top developers and investors to shape sustainable, smart-city projects that deliver growth, returns, and community impact."
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="bg-[#F6F8FA] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">
              <span className="w-6 h-px bg-[#8B1D24]" /> Who We Are
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0F172A] max-w-3xl leading-tight mb-10 md:mb-16">
              The largest privately held real estate investors and managers in the world
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Vision + Mission */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal delay={150}>
                <div>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">Our Vision</h3>
                  <p className="text-[#64748B] leading-relaxed text-sm">
                    To shape a future where every investment in real estate is secure, growth-driven, and legally sound, creating sustainable value for communities and investors alike.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={250}>
                <div>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">Our Mission</h3>
                  <p className="text-[#64748B] leading-relaxed text-sm">
                    To provide 100% government-approved plots with full legal, documentation, and after-sale support, guiding investors and individuals to make confident property decisions.
                  </p>
                </div>
              </Reveal>

              {/* Stats Bento */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  { num: 16, suffix: '+', label: 'Cities', sublabel: 'Expanding Horizons' },
                  { num: 1000, suffix: '+', label: 'Satisfied Clients', sublabel: 'Trusted Experts' },
                  { num: 1200, suffix: '+', label: 'Plots Delivered', sublabel: 'Successful Projects' },
                ].map((m, i) => (
                  <Reveal key={m.label} delay={i * 100 + 300} className="h-full">
                    <div 
                      className="relative overflow-hidden group cursor-pointer h-full bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)]" 
                      style={{ boxShadow: '0 4px 20px -4px rgba(15,23,42,0.06)' }}
                    >
                      {/* Water Droplet Expanding Background */}
                      <div className="absolute top-6 left-6 w-8 h-8 bg-[#8B1D24]/90 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[30] pointer-events-none" />
                      
                      <div className="relative z-10 font-display text-4xl font-bold text-[#8B1D24] group-hover:text-white transition-colors duration-500">
                        <Counter target={m.num} suffix={m.suffix} />
                      </div>
                      <div className="relative z-10 font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mt-2 text-sm">{m.label}</div>
                      <div className="relative z-10 text-xs text-[#64748B] group-hover:text-white/90 transition-colors duration-500 mt-1">{m.sublabel}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-8 md:mt-10 lg:mt-0 lg:pl-10 relative">
              <Reveal delay={200} className="w-4/5 self-start relative z-10 hover:z-30 transition-all duration-500">
                <div className="group rounded-3xl overflow-hidden h-56 bg-slate-200 shadow-xl border-[6px] border-white transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(139,29,36,0.15)]">
                  <div className="absolute inset-0 bg-[#8B1D24]/0 group-hover:bg-[#8B1D24]/10 transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&auto=format"
                    alt="Architectural blueprint"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)]"
                  />
                </div>
              </Reveal>
              <Reveal delay={350} className="w-5/6 self-end -mt-24 relative z-20 hover:z-30 transition-all duration-500">
                <div className="group rounded-3xl overflow-hidden h-72 bg-slate-200 shadow-2xl border-[6px] border-white transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(139,29,36,0.15)]">
                  <div className="absolute inset-0 bg-[#8B1D24]/0 group-hover:bg-[#8B1D24]/10 transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format"
                    alt="Scale model"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">
              <span className="w-6 h-px bg-[#8B1D24]" /> What We Offer
            </span>
          </Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-14">
            <Reveal delay={100}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0F172A] leading-tight max-w-xl">
                Building Trust Through Expert Real Estate Services
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <Link to="/our-services" className="text-sm text-[#8B1D24] font-semibold hover:underline flex items-center gap-1 shrink-0">
                View all services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ServiceCard title="Developers Services" subtitle="For Developers" imgUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format" delay={0} href="/our-services/developers" />
            <ServiceCard title="Builder Services" subtitle="For Builders" imgUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&auto=format" delay={100} href="/our-services/builders" />
            <ServiceCard title="Investor Services" subtitle="For Investors" imgUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format" delay={200} href="/our-services/investors" />
            <ServiceCard title="Services For All" subtitle="Universal" imgUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&auto=format" delay={300} href="/our-services/all" />
          </div>

          <Reveal delay={400}>
            <div className="mt-10 text-center">
              <Link to="/our-services" className="text-sm text-[#64748B] hover:text-[#8B1D24] transition-colors">
                Explore Trusted Real Estate Development & Investment Services →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONNECTIVITY ── */}
      <section id="connectivity-section" className="bg-[#F1F5F9] relative" style={{ height: '200vh' }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">
                <span className="w-6 h-px bg-[#8B1D24]" /> Lights · PRC
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0F172A] mb-8 md:mb-12 leading-tight">
                Where Connectivity Meets Convenience
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
              {/* Timeline */}
              <div className="space-y-4">
                {connectivitySteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                      activeStep === i
                        ? 'bg-[#8B1D24]/95 border-transparent shadow-[0_20px_40px_rgba(139,29,36,0.2)] -translate-y-1 backdrop-blur-xl'
                        : 'bg-white/60 border-white hover:bg-white hover:border-white hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] shadow-sm ${
                          activeStep === i ? 'bg-white text-[#8B1D24] scale-110' : 'bg-white text-[#64748B]'
                        }`}
                      >
                        {step.num}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold tracking-widest uppercase mb-1 transition-colors duration-700 ${activeStep === i ? 'text-white/80' : 'text-[#8B1D24]'}`}>
                          {step.label}
                        </div>
                        <div className={`font-display text-xl font-semibold transition-colors duration-700 ${activeStep === i ? 'text-white' : 'text-[#0F172A]'}`}>
                          {step.title}
                        </div>
                        <div className={`text-sm mt-1 transition-colors duration-700 ${activeStep === i ? 'text-white/90' : 'text-[#64748B]'}`}>
                          {step.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Image */}
              <div className="hidden lg:block relative h-80 lg:h-[460px] rounded-[2.5rem] overflow-hidden bg-slate-200 border-[6px] border-white shadow-[0_25px_50px_rgba(15,23,42,0.1)] group hover:shadow-[0_25px_50px_rgba(139,29,36,0.15)] hover:-translate-y-2 transition-all duration-700">
                {connectivityImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={connectivitySteps[i].title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.2,1,0.2,1)]"
                    style={{ opacity: activeStep === i ? 1 : 0, transform: activeStep === i ? 'scale(1)' : 'scale(1.15)' }}
                  />
                ))}
                {/* Red tinted overlay for premium feel */}
                <div className="absolute inset-0 bg-[#8B1D24]/0 group-hover:bg-[#8B1D24]/10 transition-colors duration-700 z-10 pointer-events-none" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white z-20">
                  <div className="text-xs font-bold tracking-widest uppercase opacity-90 mb-1">{connectivitySteps[activeStep].label}</div>
                  <div className="font-display text-2xl font-semibold">{connectivitySteps[activeStep].title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left photo */}
            <Reveal>
              <div className="relative">
                <div className="group rounded-[2.5rem] overflow-hidden h-[400px] md:h-[500px] bg-slate-200 border-[6px] border-white shadow-[0_20px_40px_rgba(15,23,42,0.1)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(139,29,36,0.15)] relative">
                  <div className="absolute inset-0 bg-[#8B1D24]/0 group-hover:bg-[#8B1D24]/10 transition-colors duration-700 z-10 pointer-events-none" />
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop&auto=format"
                    alt="Expert team reviewing blueprints"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)]"
                  />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute -bottom-8 -right-8 bg-white/80 rounded-[2rem] px-8 py-5 border border-white/60 shadow-[0_20px_40px_rgba(15,23,42,0.15)] z-20 transition-all duration-500 hover:-translate-y-2"
                  style={{
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    animation: 'float 4s ease-in-out infinite',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                    <span className="text-base font-bold text-[#0F172A] ml-1">4.9</span>
                  </div>
                  <div className="text-sm font-medium text-[#64748B]">2k+ satisfied customers</div>
                </div>
              </div>
            </Reveal>

            {/* Right pillars */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8B1D24] mb-4">
                  <span className="w-6 h-px bg-[#8B1D24]" /> Our Difference
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-display text-4xl font-semibold text-[#0F172A] mb-10 leading-tight">
                  What Makes Us Different
                </h2>
              </Reveal>
              <div className="space-y-5">
                {[
                  { icon: '⚖️', title: 'Legal Responsibility', body: 'We ensure every plot meets DSIRDA, GIDA, and DICDL compliance standards.' },
                  { icon: '🤝', title: 'Experts with Integrity', body: 'Our team blends legal, marketing, and real estate expertise seamlessly.' },
                  { icon: '🌱', title: 'Collaboration & Growth', body: 'We partner with investors and developers to build sustainable, smart-city projects.' },
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 150 + 200}>
                    <div className="group relative overflow-hidden flex gap-5 items-start p-6 rounded-[2rem] border border-[#E2E8F0] hover:border-transparent bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] cursor-pointer">
                      {/* Water droplet expanding from icon */}
                      <div className="absolute top-9 left-9 w-10 h-10 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[35] pointer-events-none" />
                      
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#FFF5F5] group-hover:bg-white/20 flex items-center justify-center text-2xl shrink-0 transition-colors duration-500 shadow-sm group-hover:shadow-none border border-slate-100 group-hover:border-transparent">
                        {item.icon}
                      </div>
                      <div className="relative z-10 mt-1">
                        <h3 className="font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-2">{item.title}</h3>
                        <p className="text-sm text-[#64748B] group-hover:text-white/90 transition-colors duration-500 leading-relaxed pr-2">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-16 md:py-32 overflow-hidden bg-[#F6F8FA]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Glassmorphic Container */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              {/* Spinning seal with glow */}
              <div className="shrink-0 flex items-center justify-center relative">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-[#8B1D24]/10 rounded-full blur-3xl scale-125" />
                
                <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 z-10">
                  <svg viewBox="0 0 144 144" className="spin-seal w-full h-full drop-shadow-sm">
                    <defs>
                      <path id="circle" d="M 72,72 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0" />
                    </defs>
                    <text className="text-[10px]" fill="#8B1D24" fontSize="10" fontWeight="600" letterSpacing="3.5">
                      <textPath href="#circle">WHAT OUR INVESTORS SAY • WHAT OUR INVESTORS SAY •</textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center p-11 md:p-14">
                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-xl relative bg-slate-200 group">
                      <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop&auto=format" alt="Building" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-[#8B1D24]/20 mix-blend-multiply" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white drop-shadow-lg rotate-180" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial carousel */}
              <div className="flex-1 w-full relative mt-4 md:mt-0">
                <div className="relative min-h-[460px] sm:min-h-[380px] md:min-h-[300px]">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className={`transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] absolute inset-0 ${
                        activeTestimonial === i ? 'opacity-100 translate-x-0 blur-none pointer-events-auto scale-100' : 'opacity-0 translate-x-12 blur-md scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="absolute -top-10 md:-top-14 -left-4 md:-left-8 text-[100px] md:text-[160px] leading-none text-[#8B1D24]/10 font-serif select-none pointer-events-none">
                        "
                      </div>
                      <p className="font-display text-xl md:text-2xl lg:text-[28px] text-[#0F172A] leading-relaxed mb-8 md:mb-10 italic relative z-10">
                        "{t.quote}"
                      </p>
                      
                      {/* Unique Name Badge */}
                      <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-white shadow-sm rounded-full pr-8 p-2 relative z-10 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center bg-gradient-to-br from-[#8B1D24] to-[#4A0E13]">
                          <span className="text-white font-display font-semibold text-lg">{t.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-display font-semibold text-[#0F172A]">{t.name}</div>
                          <div className="text-[10.5px] font-bold tracking-widest uppercase text-[#8B1D24]">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-8 md:mt-16 relative z-20">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] ${
                        activeTestimonial === i ? 'w-8 h-2 bg-[#8B1D24]' : 'w-2 h-2 bg-slate-300 hover:bg-[#8B1D24]/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner marquee */}
        <div className="mt-24 pt-12 relative z-20">
          <div className="text-center text-xs tracking-widest uppercase text-[#8B1D24] font-semibold mb-12">
            We're proud to partner with best-in-class clients
          </div>
          <div className="overflow-hidden relative py-4">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#F6F8FA] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#F6F8FA] to-transparent z-10 pointer-events-none" />
            
            <div className="marquee-track flex gap-8 md:gap-16 items-center w-max hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-8 md:gap-16 items-center shrink-0">
                  {customLogos.map((logo, i) => (
                    <div key={i} className="w-40 h-32 md:w-48 md:h-40 rounded-[2rem] bg-transparent hover:bg-[#8B1D24] hover:shadow-[0_20px_40px_-10px_rgba(139,29,36,0.4)] hover:-translate-y-2 transition-all duration-300 flex items-center justify-center p-4 group cursor-pointer shrink-0 text-[#0F172A] hover:text-[#0F172A]">
                      {logo.content}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="bg-white py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6">
                  <span className="w-8 h-[2px] bg-[#8B1D24]" /> Articles & Insights
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#0F172A] leading-tight max-w-xl">
                  Explore Ideas and Real Estate Insights
                </h2>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-200 text-[#0F172A] text-sm font-bold tracking-wide hover:bg-[#8B1D24] hover:text-white hover:border-[#8B1D24] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                View All Posts
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <div 
              ref={blogSliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {[
                { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format', title: 'How Design Shapes Well-Being', date: 'March 18, 2026' },
                { img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&auto=format', title: 'Revamping Old Spaces for Modern Needs', date: 'March 18, 2026' },
                { img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=600&h=400&fit=crop&auto=format', title: 'Biophilic Design Bringing Nature Indoors', date: 'March 18, 2026' },
                { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&auto=format', title: 'The Future of Sustainable Architecture', date: 'March 22, 2026' },
              ].map((post, i) => (
                <div key={post.title} className="w-[85vw] md:w-[350px] lg:w-[380px] shrink-0 snap-center md:snap-start h-full">
                  <Reveal delay={i * 150}>
                    <Link to="/blog" className="group flex flex-col w-full cursor-pointer">
                      
                      {/* Image wrapper */}
                      <div className="relative h-[240px] sm:h-[280px] w-full rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105" />
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#8B1D24] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 shadow-sm">
                          Real Estate
                        </span>
                        <div className="h-[1px] flex-1 bg-slate-200"></div>
                        <span className="text-[11px] font-semibold text-slate-400 tracking-wide shrink-0">
                          {post.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-body text-[22px] md:text-[24px] font-black text-[#0F172A] leading-[1.2] group-hover:text-[#8B1D24] transition-colors pr-2">
                        {post.title}
                      </h3>
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>
            
            {/* Scroll Buttons */}
            <button 
              onClick={() => scrollBlog('left')}
              className="absolute -left-5 md:-left-6 top-[120px] sm:top-[140px] z-20 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_15px_40px_rgba(139,29,36,0.15)] border border-slate-100 rounded-full w-12 h-12 flex items-center justify-center text-[#0F172A] hover:text-[#8B1D24] hover:border-[#8B1D24]/20 transition-all hover:scale-105 hidden md:flex"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollBlog('right')}
              className="absolute -right-5 md:-right-6 top-[120px] sm:top-[140px] z-20 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_15px_40px_rgba(139,29,36,0.15)] border border-slate-100 rounded-full w-12 h-12 flex items-center justify-center text-[#0F172A] hover:text-[#8B1D24] hover:border-[#8B1D24]/20 transition-all hover:scale-105 hidden md:flex"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
