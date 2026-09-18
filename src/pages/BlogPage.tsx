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

const articles = [
  {
    id: 'metro-project-dholera',
    title: 'How the Upcoming Metro Project Can Boost Property Prices in DHOLERA Smart City',
    excerpt: 'The proposed metro line connecting Dholera SIR to Ahmedabad is set to dramatically increase land values in key micro-markets. Discover why early investors are perfectly positioned to capture this massive infrastructure premium.',
    content: `The transformation of Dholera SIR into a global manufacturing and trading hub is heavily reliant on its connectivity. Among the massive infrastructure projects underway, the proposed Metro rail network stands out as a critical catalyst for real estate appreciation.\n\n### The Connectivity Premium\nHistorically, cities across India have witnessed a 15-20% spike in property values within a 2-kilometer radius of new metro stations. For a greenfield smart city like Dholera, the impact is expected to be even more pronounced.\n\n### Why Investors Are Moving Early\nBy securing plots now, before the metro infrastructure is fully operational, investors are essentially buying at the "pre-infrastructure" rate. Once the lines are active, bringing thousands of workers and residents into the city seamlessly, the demand for residential and commercial spaces near transit nodes will skyrocket.\n\n### The Long-Term Vision\nThe metro isn't just about transport; it's about integration. Connecting Dholera to Ahmedabad creates an economic corridor that allows talent and capital to flow freely, ensuring Dholera's success as India's premier smart city.`,
    date: 'May 23, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=800&fit=crop&auto=format',
    category: 'Real Estate',
  },
  {
    id: 'buying-first-home-guide',
    title: 'How to Get Started in Buying Your First Home',
    excerpt: 'A step-by-step guide for first-time buyers navigating plot selection, legal verification, and financing options in smart-cities.',
    content: `Buying your first home is a monumental milestone, but it can also be overwhelming, especially in a rapidly developing zone like Dholera SIR. Here is a definitive guide to making your first purchase secure and profitable.\n\n### 1. Define Your Purpose\nAre you buying to build immediately and move in, or are you buying as a long-term investment to build generational wealth? Your purpose dictates your location. Investors might prefer plots near the upcoming commercial zones, while families might prioritize the residential zones near schools and parks.\n\n### 2. Legal Verification (The Non-Negotiable Step)\nNever compromise on legal checks. Ensure the plot has DSIRDA approval and clear titles. At Investor Space, every plot we offer undergoes rigorous legal scrutiny before it even reaches our inventory.\n\n### 3. Future-Proofing\nLook at the master plan. Where are the arterial roads? Where is the nearest transit hub? Buying a home in a smart city requires looking at what the neighborhood will look like 10 years from now, not just today.`,
    date: 'March 18, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&auto=format',
    category: 'Real Estate',
  },
  {
    id: 'sustainable-materials-future',
    title: 'Are Sustainable Materials the Future of Homes?',
    excerpt: 'Green construction materials are transforming residential development. Here\'s what investors should know about sustainable builds.',
    content: `Sustainability is no longer a buzzword; it is a regulatory requirement and a market demand. In smart cities like Dholera, green building codes are woven into the very fabric of the city's master plan.\n\n### The Economics of Green Building\nWhile sustainable materials may carry a slight premium upfront, the long-term ROI is undeniable. Energy-efficient homes command higher resale values and attract premium tenants. \n\n### Materials Leading the Charge\nFrom recycled steel and bamboo flooring to smart-glass that regulates temperature, the materials we use are evolving. Investors who prioritize sustainable construction today will own the most sought-after properties of tomorrow.`,
    date: 'February 10, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f?w=1200&h=800&fit=crop&auto=format',
    category: 'Real Estate',
  },
  {
    id: 'biophilic-architecture',
    title: 'Biophilic Architecture: Nature in Design',
    excerpt: 'How integrating natural elements into residential spaces improves well-being, investment value, and long-term livability.',
    content: `Biophilic design—the practice of connecting people and nature within our built environments and communities—is taking center stage in luxury residential developments.\n\n### More Than Just Houseplants\nTrue biophilic architecture goes beyond adding a few plants. It involves maximizing natural light, using natural materials like wood and stone, and designing spaces that offer views of nature. It's about blurring the line between the indoors and outdoors.\n\n### The Investment Angle\nProperties that successfully integrate biophilic elements rent and sell faster. In an increasingly digital world, spaces that offer a connection to nature are becoming the ultimate luxury.`,
    date: 'January 5, 2026',
    readTime: '3 min read',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=800&fit=crop&auto=format',
    category: 'Architecture',
  },
  {
    id: 'design-shapes-wellbeing',
    title: 'How Design Shapes Well-Being',
    excerpt: 'The relationship between spatial design and human psychology — and what it means for property buyers choosing their next home.',
    content: `The spaces we inhabit profoundly impact our mental and physical well-being. Spatial design is no longer just about aesthetics; it's about psychology.\n\n### The Impact of Light and Space\nHigh ceilings and abundant natural light have been proven to reduce stress and increase productivity. When evaluating a property, investors should look at the spatial flow. Does the layout feel cramped or expansive?\n\n### The Future of Residential Design\nFuture homes in smart cities will prioritize adaptable spaces—rooms that can seamlessly transition from a home office to a yoga studio. Flexibility is the new cornerstone of good design.`,
    date: 'March 18, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&auto=format',
    category: 'Design',
  },
  {
    id: 'revamping-old-spaces',
    title: 'Revamping Old Spaces',
    excerpt: 'Renovation versus new build: when does revamping a heritage property make more investment sense than building from scratch?',
    content: `The debate between renovating an old property and building a new one is timeless. However, in established markets, revamping can unlock incredible value.\n\n### The Charm Premium\nHeritage properties possess a character that cannot be replicated in new builds. For investors, restoring this character while upgrading the infrastructure (plumbing, electrical, smart-home tech) can create a highly unique asset that commands top dollar.\n\n### The Challenges\nRenovations often uncover hidden problems. A thorough structural assessment is mandatory before committing to a revamp project. If the foundation is solid, the cosmetic and functional upgrades will almost certainly yield a strong ROI.`,
    date: 'March 18, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
    category: 'Design',
  },
];

const categories = ['All', 'Real Estate', 'Architecture', 'Design'];
const recent = articles.slice(0, 3);

export default function BlogPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  // ── VIEW: ARTICLE DETAILS ──
  const article = articleId ? articles.find((a) => a.id === articleId) : null;

  if (article) {
    return (
      <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
        {/* Parallax Hero */}
        <div className="relative pt-28 pb-32 md:pt-40 md:pb-48 flex flex-col justify-end min-h-[50vh] md:min-h-[75vh] bg-[#0F172A] overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url('${article.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
          
          {/* Back Button - Top Left */}
          <div className="absolute top-24 md:top-32 left-4 md:left-12 z-20">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-md border border-white/10 transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-white text-[#0F172A] flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              Back to Articles
            </button>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
            <Reveal delay={100}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8B1D24] bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                  {article.category}
                </span>
                <span className="text-white/80 text-sm font-medium">{article.date}</span>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
                {article.title}
              </h1>
            </Reveal>
          </div>
        </div>

        {/* Floating Meta Bar */}
        <div className="max-w-4xl mx-auto px-6 relative z-20 -mt-8 md:-mt-10">
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] md:rounded-full px-6 py-4 md:px-8 border border-white shadow-[0_20px_40px_rgba(15,23,42,0.06)] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">Investor Space Editorial</div>
                <div className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">Expert Insights</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#8B1D24]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </div>
          </div>
        </div>

        {/* Reading Layout */}
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <Reveal delay={300}>
            <div className="prose prose-base md:prose-lg lg:prose-xl prose-slate max-w-none">
              <p className="text-xl md:text-2xl text-[#0F172A] leading-relaxed font-medium mb-12 border-l-4 border-[#8B1D24] pl-6 italic">
                {article.excerpt}
              </p>
              
              <div className="text-[#334155] leading-loose space-y-8 font-serif" style={{ fontSize: '1.15rem' }}>
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="font-display text-3xl font-semibold text-[#0F172A] mt-12 mb-6 tracking-tight">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  return <p key={index} className="mb-6">{paragraph}</p>;
                })}
              </div>
            </div>
            
            {/* Share & Tags */}
            <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-full bg-slate-100 text-[#64748B] text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer transition-colors">#{article.category.replace(' ', '')}</span>
                <span className="px-4 py-2 rounded-full bg-slate-100 text-[#64748B] text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer transition-colors">#Investment</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#0F172A]">Share this:</span>
                <button className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#8B1D24] hover:border-[#8B1D24] transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#8B1D24] hover:border-[#8B1D24] transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // ── VIEW: BLOG LISTING ──
  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  // True Pagination Fix
  const perPage = 5; 
  // Get EXACTLY the slice for the current page
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  // Check if there are more articles beyond this page
  const hasMore = page * perPage < filtered.length;

  const featuredArticle = paginated.length > 0 ? paginated[0] : null;
  const gridArticles = paginated.slice(1);

  return (
    <div className="bg-[#F6F8FA] overflow-clip min-h-screen">
      {/* ── CINEMATIC HERO ── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 flex items-center min-h-[50vh] md:min-h-[60vh] bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=500&fit=crop&auto=format')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Massive Background Text */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[12vw] font-black text-white/5 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          insights
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#8B1D24] mb-6">
              <span className="w-8 h-[2px] bg-[#8B1D24]" /> News & Ideas
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6">Our Blog</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
              Intelligence, architectural trends, and investment strategies from the forefront of the real estate industry.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <section className="bg-white py-16 md:py-32 rounded-t-[3rem] md:rounded-t-[4rem] relative z-20 shadow-[0_-20px_40px_rgba(15,23,42,0.03)] -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Articles */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Featured Article */}
              {featuredArticle && (
                <Reveal>
                  <Link to={`/blog/${featuredArticle.id}`} className="group block rounded-[2.5rem] overflow-hidden bg-white border border-[#E2E8F0] transition-all duration-500 hover:border-transparent hover:shadow-[0_30px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 relative cursor-pointer">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B1D24] rounded-bl-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]" />
                    
                    <div className="relative z-10">
                      <div className="h-[250px] md:h-[400px] bg-slate-200 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                        <img 
                          src={featuredArticle.img} 
                          alt={featuredArticle.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105" 
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-white/90 backdrop-blur-md text-[#8B1D24] shadow-sm">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-10 lg:p-12">
                        <div className="flex items-center gap-4 mb-5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1D24]">{featuredArticle.category}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="text-xs font-semibold text-[#64748B]">{featuredArticle.date}</span>
                        </div>
                        
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-[#0F172A] mb-4 group-hover:text-[#8B1D24] transition-colors duration-300 leading-tight">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                          {featuredArticle.excerpt}
                        </p>
                        
                        <div className="inline-flex items-center gap-2 text-[#0F172A] font-bold text-sm group-hover:text-[#8B1D24] transition-colors">
                          Read Article
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Grid Articles */}
              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {gridArticles.map((a, i) => (
                    <Reveal key={a.id} delay={i * 100}>
                      <Link to={`/blog/${a.id}`} className="group block rounded-[2rem] overflow-hidden bg-white border border-[#E2E8F0] transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] hover:-translate-y-2 relative cursor-pointer h-full flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B1D24] rounded-bl-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]" />
                        
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="h-48 md:h-56 bg-slate-200 overflow-hidden relative shrink-0">
                            <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                            <img 
                              src={a.img} 
                              alt={a.title} 
                              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-110" 
                            />
                          </div>
                          
                          <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1D24]">{a.category}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span className="text-[10px] font-semibold text-[#64748B]">{a.date}</span>
                            </div>
                            
                            <h3 className="font-display text-xl font-semibold text-[#0F172A] mb-3 group-hover:text-[#8B1D24] transition-colors duration-300 leading-snug">
                              {a.title}
                            </h3>
                            <p className="text-sm text-[#64748B] leading-relaxed mb-6 flex-1">
                              {a.excerpt}
                            </p>
                            
                            <div className="mt-auto inline-flex items-center gap-2 text-[#0F172A] font-bold text-xs group-hover:text-[#8B1D24] transition-colors">
                              Read More
                              <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Reveal delay={200}>
                <div className="flex items-center justify-center gap-2 pt-12">
                  <button
                    onClick={() => { setPage(Math.max(1, page - 1)); window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' }); }}
                    disabled={page === 1}
                    className={`w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${page === 1 ? 'opacity-50 cursor-not-allowed bg-slate-50 border border-[#E2E8F0] text-slate-400' : 'bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#8B1D24] hover:text-[#8B1D24] shadow-sm'}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="w-12 h-12 rounded-full text-sm font-bold bg-[#8B1D24] text-white shadow-md flex items-center justify-center">
                    {page}
                  </div>

                  <button
                    onClick={() => { setPage(page + 1); window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' }); }}
                    disabled={!hasMore}
                    className={`w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${!hasMore ? 'opacity-50 cursor-not-allowed bg-slate-50 border border-[#E2E8F0] text-slate-400' : 'bg-white border border-[#E2E8F0] text-[#0F172A] hover:border-[#8B1D24] hover:text-[#8B1D24] shadow-sm'}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                
                {/* Search */}
                <Reveal>
                  <div className="relative group">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search insights..."
                      className="w-full px-6 py-4 pl-12 text-sm font-medium bg-[#F6F8FA] border border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-[#8B1D24]/30 focus:shadow-[0_0_20px_rgba(139,29,36,0.08)] transition-all duration-300 placeholder:text-[#94A3B8]"
                    />
                    <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-[#8B1D24] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </Reveal>

                {/* Categories */}
                <Reveal delay={100}>
                  <div className="bg-white rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-[#0F172A] mb-6 flex items-center gap-3">
                      <span className="w-4 h-[2px] bg-[#8B1D24]" /> Categories
                    </h4>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setPage(1); }}
                          className={`w-full text-left relative overflow-hidden group rounded-xl px-5 py-3 transition-all duration-500 border ${
                            activeCategory === cat 
                              ? 'bg-[#8B1D24] text-white border-transparent shadow-md' 
                              : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-transparent hover:shadow-[0_10px_20px_rgba(139,29,36,0.1)]'
                          }`}
                        >
                          {/* Expanding Droplet */}
                          <div className={`absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 bg-[#8B1D24]/95 rounded-full z-0 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] pointer-events-none ${activeCategory === cat ? 'scale-[20] opacity-100' : 'scale-0 opacity-0 group-hover:scale-[20] group-hover:opacity-100'}`} />
                          
                          <span className={`relative z-10 font-medium text-sm transition-colors duration-500 ${activeCategory === cat ? 'text-white' : 'group-hover:text-white'}`}>
                            {cat}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Recent Posts */}
                <Reveal delay={200}>
                  <div className="bg-white rounded-[2rem] p-8 border border-[#E2E8F0] shadow-sm">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-[#0F172A] mb-6 flex items-center gap-3">
                      <span className="w-4 h-[2px] bg-[#8B1D24]" /> Recent Posts
                    </h4>
                    <div className="space-y-6">
                      {recent.map((a) => (
                        <Link to={`/blog/${a.id}`} key={a.id} className="flex gap-4 cursor-pointer group">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-200 relative">
                            <div className="absolute inset-0 bg-[#0F172A]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="text-[10px] font-bold text-[#64748B] mb-1.5">{a.date}</div>
                            <div className="text-sm font-semibold text-[#0F172A] group-hover:text-[#8B1D24] transition-colors leading-snug line-clamp-2">
                              {a.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
