import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router';

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
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

const services = [
  {
    id: 'developers',
    title: 'Developers Services',
    about: 'We provide comprehensive solutions for developers looking to build on approved land in Dholera SIR. From regulatory clearances to joint development agreements, we streamline every stage of the development lifecycle.',
    features: [
      { title: 'Regulatory Approvals', desc: 'DSIRDA & GIDA regulatory approvals simplified.' },
      { title: 'Land Acquisition', desc: 'Secure land acquisition and legal documentation.' },
      { title: 'Project Planning', desc: 'Complete project planning and feasibility analysis.' },
      { title: 'Sales Channels', desc: 'Robust sales channel development and execution.' },
    ],
    services: ['Sales Support', 'Marketing Solutions', 'Marketing Strategy & Support', 'Development Planning'],
    faqs: [
      { q: 'What approvals are required for development in Dholera SIR?', a: 'Projects require DSIRDA approval along with DICDL clearance. We handle the entire approval chain on your behalf.' },
      { q: 'How long does the approval process take?', a: 'Typically 4–8 weeks depending on project type. Our experience in the region significantly accelerates timelines.' },
      { q: 'Do you offer joint development partnerships?', a: 'Yes, we structure JDA agreements with transparent terms and full legal backing.' },
    ],
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'builders',
    title: 'Builder Services',
    about: 'Our builder services cover the full spectrum from blueprint approval to site handover. We ensure every construction milestone aligns with Dholera SIR\'s smart-city standards and regulatory framework.',
    features: [
      { title: 'Blueprint Review', desc: 'Expert blueprint review and approval support.' },
      { title: 'Structural Compliance', desc: 'Rigorous structural compliance certification.' },
      { title: 'Timeline Management', desc: 'Efficient construction timeline management.' },
      { title: 'Quality Assurance', desc: 'Advanced quality assurance frameworks.' },
    ],
    services: ['Sales Support', 'Marketing Solutions', 'Marketing Strategy & Support', 'Development Planning'],
    faqs: [
      { q: 'What building codes apply in Dholera SIR?', a: 'Dholera SIR follows Gujarat RERA guidelines combined with smart-city building codes. We ensure full compliance.' },
      { q: 'Can you help with material sourcing?', a: 'We have a vetted network of sustainable material suppliers aligned with smart-city green standards.' },
    ],
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'investors',
    title: 'Investor Services',
    about: 'We guide investors through the entire investment journey — from plot selection and legal due diligence to registration, possession, and eventual resale. Complete transparency at every step.',
    features: [
      { title: 'Approved Inventory', desc: '100% DSIRDA-approved plot inventory.' },
      { title: 'Due Diligence', desc: 'Comprehensive legal due diligence and title verification.' },
      { title: 'Registration Support', desc: 'End-to-end registration and documentation support.' },
      { title: 'Resale Advisory', desc: 'Expert resale and portfolio advisory.' },
    ],
    services: ['Sales Support', 'Marketing Solutions', 'Marketing Strategy & Support', 'Development Planning'],
    faqs: [
      { q: 'Are plots guaranteed to appreciate?', a: 'While no investment is without risk, Dholera SIR\'s infrastructure investments and government backing make it one of India\'s highest-conviction growth corridors.' },
      { q: 'What is the minimum investment?', a: 'Plot sizes and prices vary. Contact our team for current inventory and pricing tailored to your budget.' },
      { q: 'How do you ensure legal safety?', a: 'Every plot we offer carries full DSIRDA approval, clear title, and we walk you through all documents before any payment.' },
    ],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format',
  },
  {
    id: 'all',
    title: 'Services For All',
    about: 'Whether you\'re a first-time homebuyer, an NRI looking to invest, or a family seeking a plot in a safe, approved community — our universal service package covers your needs with the same institutional quality.',
    features: [
      { title: 'First-time Buyers', desc: 'Dedicated first-time buyer consultation.' },
      { title: 'NRI Investment', desc: 'Specialized NRI investment guidance.' },
      { title: 'Family Advisory', desc: 'Family residential plot advisory.' },
      { title: 'Transparent Pricing', desc: '100% transparent pricing and documentation.' },
    ],
    services: ['Sales Support', 'Marketing Solutions', 'Marketing Strategy & Support', 'Development Planning'],
    faqs: [
      { q: 'Can NRIs invest through Investor Space?', a: 'Absolutely. We handle FEMA compliance, NRI documentation, and power-of-attorney arrangements on your behalf.' },
      { q: 'Do you offer EMI-based payment plans?', a: 'Yes, we partner with leading banks and NBFCs to offer flexible financing options.' },
    ],
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&auto=format',
  },
];

export default function ServicesPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  
  // Set initial state based on URL param
  const initialIndex = services.findIndex(s => s.id === type);
  const [activeService, setActiveService] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync state if URL changes from React Router (e.g. back button or direct link)
  useEffect(() => {
    const idx = services.findIndex(s => s.id === type);
    if (idx >= 0) {
      setActiveService(idx);
      setOpenFaq(null);
    }
  }, [type]);

  const svc = services[activeService];

  const handleServiceChange = (index: number, id: string) => {
    setActiveService(index);
    setOpenFaq(null);
    
    // Smooth scroll to the top of the content area
    const contentArea = document.getElementById('service-content');
    if (contentArea) {
      const y = contentArea.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
      {/* ── HERO ── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[50vh] md:min-h-[60vh] bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=500&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Massive Background Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          services
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6">
              <span className="w-8 h-[2px] bg-[#8B1D24]" /> What We Do
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6">Our Services</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Institutional-grade real estate solutions designed for developers, builders, investors, and families in Dholera SIR.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section id="service-content" className="bg-white py-16 md:py-32 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 shadow-[0_-20px_40px_rgba(15,23,42,0.03)] -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Sidebar: Sticky Service Index */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <Reveal>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-8">
                    Select a Service
                  </h3>
                </Reveal>
                
                <div className="space-y-4">
                  {services.map((s, i) => {
                    const isActive = activeService === i;
                    return (
                      <Reveal key={s.id} delay={i * 100}>
                        <button
                          onClick={() => handleServiceChange(i, s.id)}
                          className={`w-full text-left group relative p-6 rounded-3xl transition-all duration-500 overflow-hidden border ${
                            isActive 
                              ? 'bg-white border-[#E2E8F0] shadow-[0_20px_40px_-10px_rgba(15,23,42,0.1)] scale-[1.02]' 
                              : 'bg-transparent border-transparent hover:bg-slate-50'
                          }`}
                        >
                          {/* Active Droplet Indicator */}
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-[#8B1D24]/5 rounded-bl-[100%] transition-transform duration-700 ease-out origin-top-right ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-50 group-hover:opacity-100'}`} />
                          
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <span className={`font-body text-4xl font-black tracking-tighter transition-colors duration-500 ${isActive ? 'text-[#8B1D24]' : 'text-slate-200 group-hover:text-slate-300'}`}>
                                0{i + 1}
                              </span>
                              <span className={`font-display text-xl font-semibold transition-colors duration-500 ${isActive ? 'text-[#0F172A]' : 'text-slate-500'}`}>
                                {s.title}
                              </span>
                            </div>
                            
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#8B1D24] text-white shadow-md transform translate-x-0 opacity-100' : 'bg-white text-slate-400 transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 border border-[#E2E8F0]'}`}>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Quick Contact Block */}
                <Reveal delay={400}>
                  <div className="mt-12 bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1D24] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative z-10">
                      <h4 className="font-display text-2xl font-semibold text-white mb-3">Need Custom Advice?</h4>
                      <p className="text-slate-400 text-sm mb-8 leading-relaxed">Speak directly with our real estate experts for a personalized strategy.</p>
                      <Link
                        to="/contact-us"
                        className="inline-flex items-center justify-center w-full py-4 text-white rounded-full text-sm font-semibold transition-all duration-300 bg-[#8B1D24] hover:bg-white hover:text-[#8B1D24] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      >
                        Contact Us Today
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Side: Content Area */}
            <div className="lg:col-span-8 lg:pl-10">
              <Reveal>
                <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden h-[250px] sm:h-[400px] mb-8 md:mb-12 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0F172A] mb-6 md:mb-8">{svc.title}</h2>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-12 md:mb-16">{svc.about}</p>
              </Reveal>

              {/* Expanding Droplet Grid */}
              <Reveal delay={200}>
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6 md:mb-8 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#8B1D24]" /> Why Choose Us
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
                  {svc.features.map((f, i) => (
                    <div 
                      key={i}
                      className="relative group cursor-pointer overflow-hidden rounded-[2rem] bg-white border border-[#E2E8F0] hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] p-6 md:p-8"
                      style={{ boxShadow: '0 4px 20px -4px rgba(15,23,42,0.06)' }}
                    >
                      {/* Water Droplet Expanding Background */}
                      <div className="absolute top-8 left-8 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[30] pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors duration-500">
                          <svg className="w-6 h-6 text-[#8B1D24] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-3">
                          {f.title}
                        </h4>
                        <p className="text-sm text-[#64748B] group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={250}>
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-8 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#8B1D24]" /> Services Offered
                </h3>
                <div className="flex flex-wrap gap-3 mb-16">
                  {svc.services.map((s) => (
                    <span 
                      key={s} 
                      className="px-6 py-3 text-sm font-medium rounded-full bg-slate-50 border border-[#E2E8F0] text-[#0F172A] shadow-sm hover:border-[#8B1D24] hover:shadow-md transition-all duration-300 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <h3 className="text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-8 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#8B1D24]" /> Popular Questions
                </h3>
                <div className="space-y-4">
                  {svc.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div 
                        key={i} 
                        className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-[#8B1D24] bg-white shadow-lg' : 'border-[#E2E8F0] bg-slate-50 hover:border-slate-300'}`}
                      >
                        <button
                          className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 font-semibold text-[#0F172A]"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                        >
                          <span className="text-base">{faq.q}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#8B1D24] text-white' : 'bg-white border border-[#E2E8F0] text-[#64748B]'}`}>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        <div 
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="px-8 pb-8 text-[15px] text-[#64748B] leading-relaxed">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
