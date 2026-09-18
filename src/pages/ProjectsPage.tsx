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

const projects = [
  {
    id: 'kesar-green-flora',
    name: 'Kesar Green Flora',
    type: 'Residential Plots',
    area: '192,632 Sq. Yd.',
    status: 'Under Development / Pre-launch',
    location: 'Dholera SIR, Gujarat',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&h=700&fit=crop&auto=format',
    description: 'A flagship residential plot development within Dholera SIR featuring vertical garden facades, solar energy infrastructure, and world-class amenities designed for the smart-city lifestyle. Kesar Green Flora promises an environment where modern urban living coexists seamlessly with nature.',
    amenities: [
      { icon: '🔒', label: '24x7 Security' },
      { icon: '📹', label: 'Surveillance System' },
      { icon: '🏋️', label: 'Fitness Center' },
      { icon: '🛝', label: "Children's Play Area" },
    ],
    transit: [
      { place: 'Lothal Museum', time: '10 mins' },
      { place: 'Expressway', time: '10 mins' },
      { place: 'Metro / Monorail', time: '10 mins' },
      { place: 'Tata Accommodation Flat', time: '5 mins' },
    ],
    builtUp: '1,92,632 Sq. Yd.',
    features: ['Vertical garden facade', 'Solar energy', 'Smart infrastructure', 'Eco-friendly design'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118223.15545224385!2d72.06734185121966!3d22.28186121703212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f1f7d6e5a6bf7%3A0x6b77242c1613eb5f!2sDholera%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  },
  {
    id: 'dholera-smart-city',
    name: 'Dholera Smart City',
    type: 'Commercial & Residential',
    area: '250,000+ Sq. Yd.',
    status: 'Ongoing',
    location: 'Dholera SIR, Gujarat',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=700&fit=crop&auto=format',
    description: 'A landmark mixed-use development at the heart of Dholera SIR\'s commercial zone, delivering institutional-grade infrastructure with smart-city connectivity for investors and businesses. This project acts as the nucleus for next-generation enterprises.',
    amenities: [
      { icon: '🔒', label: '24x7 Security' },
      { icon: '📶', label: 'Smart Connectivity' },
      { icon: '🌿', label: 'Green Zones' },
      { icon: '🏢', label: 'Commercial Hub' },
    ],
    transit: [
      { place: 'International Airport', time: '12 mins' },
      { place: 'Expressway', time: '10 mins' },
      { place: 'Metro Station', time: '10 mins' },
      { place: 'Dholera TP1A', time: '10 mins' },
    ],
    builtUp: '2,50,000+ Sq. Yd.',
    features: ['Smart city infrastructure', 'DICDL approved', 'Institutional grade', 'High-speed transit access'],
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118223.15545224385!2d72.06734185121966!3d22.28186121703212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f1f7d6e5a6bf7%3A0x6b77242c1613eb5f!2sDholera%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  },
];

export default function ProjectsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const proj = projectId ? projects.find((p) => p.id === projectId) : null;

  // View: Individual Project Details
  if (proj) {
    return (
      <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
        {/* Parallax Hero */}
        <div className="relative pt-28 pb-32 md:pt-40 md:pb-48 flex flex-col justify-end min-h-[50vh] md:min-h-[70vh] bg-[#0F172A] overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url('${proj.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <Reveal>
              <button
                onClick={() => navigate('/our-projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md border border-white/10 transition-all duration-300 mb-8 group"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#0F172A] flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                Back to Projects
              </button>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-tight">{proj.name}</h1>
            </Reveal>
          </div>
        </div>

        {/* Floating Meta Bar */}
        <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-12 md:-mt-16">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { label: 'Project Type', value: proj.type },
                { label: 'Project Area', value: proj.area },
                { label: 'Status', value: proj.status },
                { label: 'Location', value: proj.location }
              ].map((m, i) => (
                <Reveal key={m.label} delay={150 + i * 50}>
                  <div className="text-xs font-bold text-[#8B1D24] uppercase tracking-widest mb-1">{m.label}</div>
                  <div className="font-semibold text-[#0F172A]">{m.value}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Col: Details */}
            <div className="lg:col-span-2 space-y-12 md:space-y-16">
              <Reveal>
                <h2 className="font-display text-3xl font-semibold text-[#0F172A] mb-6 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#8B1D24]" /> About the Project
                </h2>
                <p className="text-[#64748B] text-lg leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-3 mt-8">
                  {proj.features.map((f) => (
                    <span key={f} className="px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-full bg-[#FFF5F5] text-[#8B1D24] border border-[#8B1D24]/10 shadow-sm">{f}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h3 className="font-display text-2xl font-semibold text-[#0F172A] mb-6">Premium Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {proj.amenities.map((a) => (
                    <div key={a.label} className="group relative overflow-hidden flex flex-col items-center gap-3 p-6 bg-white rounded-[2rem] border border-[#E2E8F0] text-center hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] hover:border-transparent transition-all duration-500 cursor-pointer">
                      {/* Water Droplet Expanding Background */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[20] pointer-events-none" />
                      
                      <div className="relative z-10 w-14 h-14 rounded-full bg-[#FFF5F5] group-hover:bg-white/20 flex items-center justify-center text-2xl transition-colors duration-500 shadow-sm">{a.icon}</div>
                      <span className="relative z-10 text-xs font-bold text-[#0F172A] group-hover:text-white transition-colors duration-500 tracking-wide">{a.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <Reveal delay={150}>
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-[#E2E8F0] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] transition-all duration-500 cursor-pointer">
                    {/* Water Droplet Expanding Background */}
                    <div className="absolute top-8 left-8 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[30] pointer-events-none" />
                    
                    <h3 className="relative z-10 font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-6">Project Specs</h3>
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-end border-b border-slate-100 group-hover:border-white/20 transition-colors duration-500 pb-2">
                        <span className="text-sm font-medium text-[#64748B] group-hover:text-white/80 transition-colors duration-500">Built-up Area</span>
                        <span className="font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500">{proj.builtUp}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-slate-100 group-hover:border-white/20 transition-colors duration-500 pb-2">
                        <span className="text-sm font-medium text-[#64748B] group-hover:text-white/80 transition-colors duration-500">Current Status</span>
                        <span className="font-semibold text-[#8B1D24] group-hover:text-white transition-colors duration-500">{proj.status}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-[#E2E8F0] h-full relative overflow-hidden group hover:-translate-y-2 hover:border-transparent hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] transition-all duration-500 cursor-pointer">
                    {/* Water Droplet Expanding Background */}
                    <div className="absolute top-8 left-8 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[30] pointer-events-none" />
                    
                    <h3 className="relative z-10 font-display text-xl font-semibold text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-6">Nearby Transit</h3>
                    <div className="relative z-10 space-y-4">
                      {proj.transit.slice(0, 3).map((t) => (
                        <div key={t.place} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B1D24] group-hover:bg-white transition-colors duration-500" />
                            <span className="text-sm font-medium text-[#0F172A] group-hover:text-white transition-colors duration-500">{t.place}</span>
                          </div>
                          <span className="text-xs font-bold text-[#64748B] group-hover:text-white group-hover:bg-white/20 transition-colors duration-500 bg-slate-50 px-2 py-1 rounded-md">{t.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
              
              {/* Google Map */}
              <Reveal delay={250}>
                <h3 className="font-display text-3xl font-semibold text-[#0F172A] mb-6 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#8B1D24]" /> Location Map
                </h3>
                <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[300px] md:h-[400px] border-4 border-white shadow-[0_20px_40px_rgba(15,23,42,0.06)] relative group">
                  <div className="absolute inset-0 bg-[#0F172A]/10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
                  <iframe 
                    src={proj.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Col: Inquiry Sidebar */}
            <div className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="sticky top-28 bg-white rounded-[2.5rem] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
                <div className="w-12 h-12 bg-[#FFF5F5] rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#8B1D24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#0F172A] mb-2">Project Inquiry</h3>
                <p className="text-sm text-[#64748B] mb-8">Get the latest brochure, pricing, and availability directly from our experts.</p>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-2">Your Name</label>
                    <input className="w-full px-5 py-4 text-sm bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#8B1D24]/30 focus:shadow-[0_0_15px_rgba(139,29,36,0.1)] transition-all" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-2">Phone Number</label>
                    <input className="w-full px-5 py-4 text-sm bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#8B1D24]/30 focus:shadow-[0_0_15px_rgba(139,29,36,0.1)] transition-all" placeholder="+91 00000 00000" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider pl-2">Message</label>
                    <textarea className="w-full px-5 py-4 text-sm bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#8B1D24]/30 focus:shadow-[0_0_15px_rgba(139,29,36,0.1)] transition-all resize-none" rows={4} placeholder="I'm interested in this project..." />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 text-white font-bold rounded-2xl text-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(139,29,36,0.3)] hover:-translate-y-1"
                    style={{ background: '#8B1D24' }}
                  >
                    Request Callback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View: Main Projects Listing
  return (
    <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
      {/* Cinematic Hero */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[50vh] md:min-h-[60vh] bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=500&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Massive Background Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          projects
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6">
              <span className="w-8 h-[2px] bg-[#8B1D24]" /> Our Portfolio
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6">Signature Projects</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Discover our landmark developments shaping the future of Dholera SIR through smart-city infrastructure and premium design.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="bg-white py-16 md:py-32 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 shadow-[0_-20px_40px_rgba(15,23,42,0.03)] -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#0F172A]">Ongoing Developments</h2>
              <div className="hidden md:flex gap-2">
                <button className="w-12 h-12 rounded-full border border-[#E2E8F0] flex items-center justify-center text-slate-400 hover:text-[#8B1D24] hover:border-[#8B1D24] transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full border border-[#E2E8F0] flex items-center justify-center text-slate-400 hover:text-[#8B1D24] hover:border-[#8B1D24] transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
          
          <div className="space-y-12">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <Link
                  to={`/our-projects/${p.id}`}
                  className="group block rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white border border-[#E2E8F0] transition-all duration-500 hover:border-transparent hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 relative"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1D24] rounded-bl-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                    <div className="h-64 sm:h-80 lg:h-auto bg-slate-200 overflow-hidden relative">
                      <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                      <img 
                        src={p.img} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#F6F8FA] text-[#0F172A] border border-[#E2E8F0] group-hover:border-[#0F172A]/10 transition-colors">
                          {p.type}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full ${p.status.includes('Pre') ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                          {p.status}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-4xl font-semibold text-[#0F172A] mb-4 group-hover:text-[#8B1D24] transition-colors duration-300">
                        {p.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-[#64748B] mb-6">
                        <svg className="w-5 h-5 text-[#8B1D24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {p.location}
                      </div>
                      
                      <p className="text-base text-[#64748B] leading-relaxed mb-10">
                        {p.description.slice(0, 150)}...
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-auto">
                        <div className="inline-flex items-center justify-between gap-4 px-6 py-4 rounded-full bg-slate-50 group-hover:bg-[#8B1D24] text-[#0F172A] group-hover:text-white transition-all duration-500 border border-[#E2E8F0] group-hover:border-[#8B1D24]">
                          <span className="font-bold text-sm">View Project Details</span>
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#8B1D24] shadow-sm group-hover:shadow-none group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-[#64748B]">
                          Area: <span className="font-bold text-[#0F172A] group-hover:text-[#8B1D24] transition-colors">{p.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
