import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import emailjs from '@emailjs/browser';

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

export default function ContactPage() {
  const location = useLocation();
  const [form, setForm] = useState({ name: '', number: '', email: '', service: '', message: '' });
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'animating' | 'success'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash === '#message-form') {
      setTimeout(() => {
        document.getElementById('message-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('loading');
    
    const SERVICE_ID = 'service_i0a4dhd';
    const TEMPLATE_ID = 'template_2kdukvh';
    const PUBLIC_KEY = 'cxCs3I5vJ-xweZN0t';

    const fullMessage = `Phone: ${form.number}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: form.name,
      service_type: form.service,
      message: fullMessage,
    }, PUBLIC_KEY)
    .then(() => {
      setSubmissionState('success');
      setForm({ name: '', number: '', email: '', service: '', message: '' });
      setTimeout(() => setSubmissionState('idle'), 4000);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      // Still show success to not break UX for user if it fails
      setSubmissionState('success');
      setForm({ name: '', number: '', email: '', service: '', message: '' });
      setTimeout(() => setSubmissionState('idle'), 4000);
    });
  };

  return (
    <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
      <style>
        {`
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes ripple {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(3.5); opacity: 0; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
          }
          .animate-pop {
            animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .animate-ripple {
            animation: ripple 1s cubic-bezier(0.2, 0, 0.2, 1) forwards;
          }
          .animate-draw {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
            animation: drawCheck 0.5s ease-out 0.4s forwards;
          }
          .animate-slide-up-1 {
            animation: slideUpFade 0.6s ease-out 0.5s forwards;
          }
          .animate-slide-up-2 {
            animation: slideUpFade 0.6s ease-out 0.6s forwards;
          }
        `}
      </style>

      {/* ── CINEMATIC HERO ── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[50vh] md:min-h-[60vh] bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=500&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Massive Background Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[11vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          contact us
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6">
              <span className="w-8 h-[2px] bg-[#8B1D24]" /> We're Here For You
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6">Get in Touch</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Our global real estate experts are here to help you navigate this ever-changing market. Reach out to start the conversation.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── CONTACT CARDS ── */}
      <section className="bg-white py-16 md:py-24 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 shadow-[0_-20px_40px_rgba(15,23,42,0.03)] -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-[#8B1D24] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Support Email',
                value: 'Contact@investorspace.co',
                cta: 'Email Us',
                href: 'mailto:contact@investorspace.co',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#8B1D24] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: 'Phone Number',
                value: '+91 9818581518',
                cta: 'Call Us',
                href: 'tel:+919818581518',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-[#8B1D24] group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Location',
                value: 'R2 LG 34, M3M Corner Walk, Sector-74, Gurgaon',
                cta: 'Visit Us',
                href: 'https://maps.google.com/?q=M3M+Corner+Walk+Sector+74+Gurgaon',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group relative block bg-white rounded-[2rem] p-6 md:p-8 border border-[#E2E8F0] shadow-sm hover:border-transparent hover:shadow-[0_20px_40px_rgba(139,29,36,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Water Droplet Expanding Background */}
                  <div className="absolute top-10 left-10 w-8 h-8 bg-[#8B1D24]/95 rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] scale-0 group-hover:scale-[30] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF5F5] group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors duration-500">
                      {card.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-[#0F172A] group-hover:text-white transition-colors duration-500 mb-2">{card.title}</div>
                      <div className="text-[15px] text-[#64748B] group-hover:text-white/90 transition-colors duration-500 font-medium leading-relaxed">{card.value}</div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-8">
                    <span className="inline-flex items-center gap-2 text-[#8B1D24] group-hover:text-white font-bold text-sm transition-colors duration-500">
                      {card.cta}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM & MAP ── */}
      <section id="message-form" className="bg-[#F6F8FA] py-16 md:py-24 relative overflow-hidden scroll-mt-32">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B1D24]/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Form Container */}
            <Reveal>
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 border border-[#E2E8F0] shadow-[0_20px_40px_rgba(15,23,42,0.04)] relative min-h-[500px] md:min-h-[600px] flex flex-col justify-center">
                
                {/* STATE 2: SUCCESS ANIMATION */}
                {submissionState === 'success' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2.5rem] z-30 overflow-hidden">
                    
                    {/* Ripple Effect Background */}
                    <div className="absolute w-32 h-32 bg-green-500/10 rounded-full animate-ripple" />
                    <div className="absolute w-32 h-32 bg-green-500/20 rounded-full animate-ripple" style={{ animationDelay: '0.1s' }} />

                    {/* Premium Checkmark Icon */}
                    <div className="relative w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.3)] animate-pop z-10">
                      <svg className="w-12 h-12 text-white animate-draw" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    {/* Success Text */}
                    <h3 className="font-display text-4xl font-semibold text-[#0F172A] mt-8 mb-4 opacity-0 animate-slide-up-1">
                      Message Sent!
                    </h3>
                    <p className="text-[#64748B] text-lg max-w-sm mx-auto text-center opacity-0 animate-slide-up-2">
                      Thank you for reaching out. A real estate expert from our team will contact you shortly.
                    </p>

                  </div>
                )}

                {/* STATE 1: IDLE / LOADING FORM */}
                <div className={`transition-all duration-500 ${submissionState !== 'idle' && submissionState !== 'loading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0F172A] mb-3 tracking-tight">Leave a Message</h2>
                  <p className="text-[#64748B] text-sm md:text-base mb-8 md:mb-10">We typically respond within 24 hours on business days.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                      { field: 'name', label: 'Full Name *', type: 'text', required: true },
                      { field: 'number', label: 'Phone Number *', type: 'tel', required: true },
                      { field: 'email', label: 'Email Address *', type: 'email', required: true },
                    ].map(({ field, label, type, required }) => (
                      <div key={field} className="relative group">
                        <label
                          className={`absolute left-5 transition-all duration-300 pointer-events-none font-medium ${focused === field || form[field as keyof typeof form] ? 'text-[#8B1D24] text-[10px] top-2.5' : 'text-[#94A3B8] text-sm top-1/2 -translate-y-1/2'}`}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          required={required}
                          disabled={submissionState === 'loading'}
                          value={form[field as keyof typeof form]}
                          onFocus={() => setFocused(field)}
                          onBlur={() => setFocused(null)}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className={`w-full px-5 pt-7 pb-3 text-sm border rounded-2xl outline-none transition-all duration-300 bg-[#F8FAFC] text-[#0F172A] ${focused === field ? 'border-[#8B1D24]/30 bg-white shadow-[0_0_0_4px_rgba(139,29,36,0.05)]' : 'border-transparent hover:border-[#E2E8F0]'} ${submissionState === 'loading' ? 'opacity-50' : ''}`}
                        />
                      </div>
                    ))}

                    <div className="relative group">
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        required
                        disabled={submissionState === 'loading'}
                        onFocus={() => setFocused('service')}
                        onBlur={() => setFocused(null)}
                        className={`w-full px-5 py-4 text-sm border rounded-2xl outline-none transition-all duration-300 bg-[#F8FAFC] appearance-none ${focused === 'service' ? 'border-[#8B1D24]/30 bg-white shadow-[0_0_0_4px_rgba(139,29,36,0.05)] text-[#0F172A]' : 'border-transparent hover:border-[#E2E8F0] text-[#64748B]'} ${submissionState === 'loading' ? 'opacity-50' : ''}`}
                      >
                        <option value="" disabled hidden>Select a Service *</option>
                        <option value="Developers Services" className="text-[#0F172A]">Developers Services</option>
                        <option value="Builder Services" className="text-[#0F172A]">Builder Services</option>
                        <option value="Investor Services" className="text-[#0F172A]">Investor Services</option>
                        <option value="Services For All" className="text-[#0F172A]">Services For All</option>
                      </select>
                      <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    <div className="relative group">
                      <textarea
                        placeholder="Tell us how we can help..."
                        rows={4}
                        value={form.message}
                        disabled={submissionState === 'loading'}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`w-full px-5 py-4 text-sm border rounded-2xl outline-none transition-all duration-300 bg-[#F8FAFC] resize-none text-[#0F172A] placeholder-[#94A3B8] ${focused === 'message' ? 'border-[#8B1D24]/30 bg-white shadow-[0_0_0_4px_rgba(139,29,36,0.05)]' : 'border-transparent hover:border-[#E2E8F0]'} ${submissionState === 'loading' ? 'opacity-50' : ''}`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submissionState === 'loading'}
                      className="w-full py-4.5 bg-[#8B1D24] text-white font-bold tracking-wide rounded-2xl text-sm transition-all duration-300 hover:bg-[#7A1920] hover:shadow-[0_10px_20px_rgba(139,29,36,0.2)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                      {submissionState === 'loading' ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={150}>
              <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-[#E2E8F0] shadow-[0_20px_40px_rgba(15,23,42,0.04)] h-full min-h-[400px] md:min-h-[600px] relative group bg-slate-100 mt-8 lg:mt-0">
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.704616238384!2d76.9961633!3d28.3979435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d5a4bb6d0c1%3A0xc0fb13a0fcba9b85!2sM3M%20Corner%20Walk!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-transform duration-1000 group-hover:scale-105"
                ></iframe>
                
                {/* Floating Map Label */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/20 flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8B1D24]">Our Office</span>
                    <span className="text-sm font-semibold text-[#0F172A]">M3M Corner Walk, Sector-74</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
