import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Chat flow state
  const [messages, setMessages] = useState<{sender: 'bot'|'user', text: string}[]>([
    { sender: 'bot', text: 'Hi! Welcome to Investor Space. May I know your good name?' }
  ]);
  const [step, setStep] = useState(0); // 0: Name, 1: Service, 2: Requirement, 3: Done
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState({ name: '', service: '', req: '' });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    
    // Bot response logic
    setTimeout(() => {
      if (step === 0) {
        setUserData(prev => ({ ...prev, name: text }));
        setMessages(prev => [...prev, { sender: 'bot', text: `Nice to meet you, ${text}! Which service are you interested in?` }]);
        setStep(1);
      } else if (step === 1) {
        setUserData(prev => ({ ...prev, service: text }));
        setMessages(prev => [...prev, { sender: 'bot', text: 'Great! Could you please briefly explain your requirement?' }]);
        setStep(2);
      } else if (step === 2) {
        const finalData = { ...userData, req: text };
        setUserData(finalData);
        
        // ── EMAILJS INTEGRATION ──
        // Replace these with your actual EmailJS credentials
        const SERVICE_ID = 'service_i0a4dhd';
        const TEMPLATE_ID = 'template_2kdukvh';
        const PUBLIC_KEY = 'cxCs3I5vJ-xweZN0t';

        if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
          emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            from_name: finalData.name,
            service_type: finalData.service,
            message: `Service Required: ${finalData.service}\n\nRequirement Details:\n${finalData.req}`,
          }, PUBLIC_KEY)
          .then((result) => console.log('EmailJS Success:', result.text))
          .catch((error) => console.error('EmailJS Error:', error));
        }

        // ── REDIRECT TO REAL WHATSAPP ──
        const waText = `Hi! My name is ${finalData.name}.%0A%0AI am interested in: ${finalData.service}.%0A%0AMy Requirement: ${finalData.req}`;
        const waUrl = `https://wa.me/919818581518?text=${waText}`;
        window.open(waUrl, '_blank');

        setMessages(prev => [...prev, { sender: 'bot', text: 'Redirecting you to our official WhatsApp...' }]);
        setStep(3);
      }
    }, 600); // Simulated delay
  };

  const handleQuickReply = (service: string) => {
    handleSend(service);
  };

  return (
    <>
      {/* WhatsApp Chat Widget */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
        
        {/* Chat Window */}
        <div 
          className={`mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left flex flex-col ${isChatOpen ? 'scale-100 opacity-100 w-80 sm:w-80 h-[450px]' : 'scale-0 opacity-0 w-0 h-0'}`}
          style={{ border: '1px solid #E2E8F0' }}
        >
          {/* Header */}
          <div className="bg-[#075E54] p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="IS" className="w-8 h-auto object-contain" />
              </div>
              <div>
                <div className="font-semibold text-sm">Investor Space</div>
                <div className="text-xs text-white/80">Typically replies instantly</div>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative" style={{ backgroundColor: '#E5DDD5', backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm relative ${msg.sender === 'user' ? 'bg-[#DCF8C6] text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Quick Replies for Step 1 */}
            {step === 1 && (
              <div className="flex flex-col gap-2 mt-2 items-start pl-2">
                {['Developers Services', 'Builder Services', 'Investor Services', 'General Inquiry'].map(srv => (
                  <button 
                    key={srv}
                    onClick={() => handleQuickReply(srv)}
                    className="bg-white border border-[#075E54] text-[#075E54] px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:bg-[#075E54] hover:text-white transition-colors text-left"
                  >
                    {srv}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-[#F0F0F0] flex items-center gap-2 shrink-0">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={step === 3}
              placeholder={step === 3 ? "Chat ended" : "Type a message..."}
              className="flex-1 rounded-full px-4 py-2 text-sm border-none focus:ring-0 shadow-sm outline-none bg-white disabled:bg-slate-100"
            />
            <button 
              onClick={() => handleSend()}
              disabled={step === 3 || !inputValue.trim()}
              className="w-10 h-10 rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-opacity"
            >
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 hover:scale-110 relative"
          style={{ background: '#25D366' }}
          aria-label="Toggle WhatsApp Chat"
        >
          {/* Pulse ring (only when closed) */}
          {!isChatOpen && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: '#25D366',
                animation: 'pulsePing 3s ease-out infinite',
              }}
            />
          )}
          
          {isChatOpen ? (
            <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          )}
        </button>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-lg hover:border-[#8B1D24] hover:text-[#8B1D24] text-[#0F172A] transition-all duration-200 spring-pop"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}
