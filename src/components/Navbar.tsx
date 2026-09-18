import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';

const services = [
  { label: 'Developers Services', href: '/our-services/developers' },
  { label: 'Builder Services', href: '/our-services/builders' },
  { label: 'Investor Services', href: '/our-services/investors' },
  { label: 'Services For All', href: '/our-services/all' },
];

const projects = [
  { label: 'Ongoing Projects', href: '/our-projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = useNavigate();

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleNavClick = (href: string) => {
    navigate(href);
    if (location.pathname === href || (href !== '/' && location.pathname.startsWith(href))) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Our Services', href: '/our-services', dropdown: services },
    { label: 'Our Projects', href: '/our-projects', dropdown: projects },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      style={{ pointerEvents: 'none' }}
    >
      <nav
        className="w-full max-w-7xl flex items-center justify-between px-6 rounded-2xl transition-all duration-500 bg-white border border-slate-100 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
        style={{
          height: scrolled ? '64px' : '80px',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <div onClick={() => handleNavClick('/')} className="flex items-center shrink-0 cursor-pointer">
          <img src="/logo.png" alt="Investor Space" className="h-12 w-auto object-contain" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href} className="relative dropdown-parent">
              <div
                onClick={() => handleNavClick(link.href)}
                className={`cursor-pointer nav-link-underline px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                    ? 'text-[#8B1D24]'
                    : 'text-[#0F172A] hover:text-[#8B1D24]'
                }`}
              >
                {link.label}
                {link.dropdown && (
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              {link.dropdown && (
                <div className="dropdown-menu absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-xl py-1">
                  {link.dropdown.map((item) => (
                    <div
                      key={item.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavClick(item.href);
                      }}
                      className="cursor-pointer block px-4 py-2.5 text-sm text-[#0F172A] hover:text-[#8B1D24] hover:bg-[#FFF5F5] transition-colors"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+919818581518" className="text-sm text-[#64748B] font-medium hover:text-[#8B1D24] transition-colors">
            +91 9818581518
          </a>
          <div
            onClick={() => handleNavClick('/contact-us')}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: '#8B1D24' }}
          >
            Get in Touch
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#0F172A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl py-4 px-4"
          style={{ pointerEvents: 'auto' }}
        >
          {navLinks.map((link) => (
            <div
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="cursor-pointer block py-2.5 text-sm font-medium text-[#0F172A] hover:text-[#8B1D24] border-b border-slate-100 last:border-0"
            >
              {link.label}
            </div>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a href="tel:+919818581518" className="text-sm text-[#64748B] font-medium">+91 9818581518</a>
            <div
              onClick={() => handleNavClick('/contact-us')}
              className="cursor-pointer text-center px-5 py-2.5 text-sm font-semibold text-white rounded-full"
              style={{ background: '#8B1D24' }}
            >
              Get in Touch
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
