
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { SiteContent, PortfolioItem, InquiryFormData, Testimonial, ProcessStep, ServiceItem, FAQItem } from './types';
import { INITIAL_CONTENT, ADMIN_PASSWORD } from './constants';

// --- Helper Components ---

const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-5xl font-black mb-4 ${light ? 'text-white' : 'text-slate-900'} tracking-tight`}>{title}</h2>
    {subtitle && <p className={`text-lg md:text-xl font-medium ${light ? 'text-purple-200' : 'text-slate-500'}`}>{subtitle}</p>}
    <div className={`w-12 h-1.5 mx-auto mt-8 rounded-full ${light ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
  </div>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-purple-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black text-purple-950 tracking-tighter uppercase italic">BARA DESIGN</Link>
          </div>
          <div className="hidden md:flex space-x-10 text-[15px] font-bold text-slate-600">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-purple-600 transition-colors">특장점</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="hover:text-purple-600 transition-colors">포트폴리오</a>
            <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className="hover:text-purple-600 transition-colors">작업 프로세스</a>
            <a href="#service" onClick={(e) => handleNavClick(e, 'service')} className="hover:text-purple-600 transition-colors">서비스</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-purple-600 transition-colors">FAQ</a>
          </div>
          <div>
            <a href="#inquiry" onClick={(e) => handleNavClick(e, 'inquiry')} className="bg-purple-600 text-white px-7 py-3 rounded-full text-[15px] font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95">
              지금 바로 문의하기
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-purple-950 text-purple-300 py-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="mb-8">
        <span className="text-2xl font-black text-white tracking-widest uppercase italic">BARA DESIGN</span>
        <p className="mt-4 text-purple-200/60 max-w-md mx-auto leading-relaxed font-medium">비즈니스의 가치를 디자인으로 증명합니다.<br/>목적이 분명한 디자인으로 당신의 성공을 돕습니다.</p>
      </div>
      <div className="w-full h-px bg-purple-900 my-10"></div>
      <p className="text-sm opacity-80">© 2024 BARA DESIGN. All rights reserved.</p>
      <div className="mt-8 flex justify-center gap-6">
        <Link to="/admin" className="text-purple-400 hover:text-white text-xs font-bold underline underline-offset-4 decoration-purple-700">Admin Dashboard</Link>
      </div>
    </div>
  </footer>
);

const CTAButton: React.FC<{ text: string; primary?: boolean; href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ text, primary, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-block px-10 py-5 rounded-2xl text-lg font-black transition-all transform hover:scale-105 shadow-2xl active:scale-95 ${
      primary 
        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200' 
        : 'bg-white text-purple-900 border-2 border-purple-100 hover:bg-purple-50 shadow-slate-100'
    }`}
  >
    {text}
  </a>
);

const PortfolioModal: React.FC<{ item: PortfolioItem; onClose: () => void }> = ({ item, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={onClose}>
      <button className="absolute top-8 right-8 text-white text-5xl hover:text-purple-400 transition-colors" aria-label="닫기">&times;</button>
      <div className="max-w-6xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-2xl group">
          {item.images.length > 0 ? (
            <img 
              src={item.images[currentIdx]} 
              className="max-w-full max-h-full object-contain select-none transition-transform duration-500"
              alt={`${item.title} ${currentIdx + 1}`}
            />
          ) : (
             <div className="text-white font-bold">등록된 이미지가 없습니다.</div>
          )}
          {item.images.length > 1 && (
            <>
              <button onClick={() => setCurrentIdx(prev => (prev === 0 ? item.images.length - 1 : prev - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"> &lsaquo; </button>
              <button onClick={() => setCurrentIdx(prev => (prev === item.images.length - 1 ? 0 : prev + 1))} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"> &rsaquo; </button>
            </>
          )}
        </div>
        <div className="mt-10 text-center text-white">
          <h3 className="text-3xl font-black mb-2 tracking-tight">{item.title}</h3>
          <p className="text-purple-300 text-lg font-bold">{item.category} <span className="mx-2 opacity-30">|</span> {currentIdx + 1} / {item.images.length}</p>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ content: SiteContent }> = ({ content }) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    if (!content.testimonials || content.testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setTestimonialIdx(prev => (prev + 1) % content.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [content.testimonials]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-40 pb-32 md:pt-60 md:pb-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <span className="inline-block px-5 py-2 rounded-full bg-purple-50 text-purple-600 text-xs font-black mb-8 tracking-[0.3em] uppercase">BARA DESIGN / PREMIUM STUDIO</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-950 mb-10 leading-[1.1] tracking-tighter whitespace-pre-line">
              {content.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <CTAButton text="문의하기 (010-7222-4594)" primary href="#inquiry" onClick={(e) => handleScrollTo(e, 'inquiry')} />
              <CTAButton text="포트폴리오 보러가기" href="#portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[1000px] h-[1000px] bg-purple-50 rounded-full blur-[120px] opacity-70 -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[100px] opacity-60 -z-10"></div>
      </section>

      {/* Strengths */}
      <section id="about" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="성공을 설계하는 디자인" subtitle="디자인의 목적은 단순히 아름다움이 아닌, 비즈니스의 성장입니다." />
          <div className="grid md:grid-cols-3 gap-10">
            {content.strengths.map((s, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-purple-50 group">
                <div className="text-6xl mb-10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{s.icon}</div>
                <h3 className="text-2xl font-black mb-5 text-purple-950">{s.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="최근 프로젝트" subtitle="바라 디자인이 제안한 최적의 솔루션을 확인해보세요." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.portfolio.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedPortfolio(item)}>
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] bg-slate-100 shadow-lg border border-slate-50">
                  <img src={item.images[0] || 'https://via.placeholder.com/800x600?text=Preparing...'} alt={item.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
                  <div className="absolute inset-0 bg-purple-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white border-2 border-white/50 px-8 py-3 rounded-full font-black text-lg shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500">VIEW PROJECT</span>
                  </div>
                  {item.images.length > 1 && (
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[12px] font-black text-purple-950 shadow-sm">
                      +{item.images.length - 1} PHOTOS
                    </div>
                  )}
                </div>
                <div className="mt-7 px-2">
                  <p className="text-purple-500 text-xs font-black mb-2 uppercase tracking-[0.2em]">{item.category}</p>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-purple-600 transition-colors duration-300">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPortfolio && <PortfolioModal item={selectedPortfolio} onClose={() => setSelectedPortfolio(null)} />}

      {/* Testimonials */}
      <section className="py-32 bg-purple-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 min-h-[400px] flex flex-col justify-center">
          <div className="text-8xl mb-12 text-purple-600/50 font-serif italic">"</div>
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold italic leading-relaxed mb-12 max-w-4xl mx-auto tracking-tight">
              {content.testimonials[testimonialIdx]?.quote}
            </h2>
            <div className="w-16 h-1 bg-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-purple-300 font-black tracking-[0.2em] uppercase text-sm">— {content.testimonials[testimonialIdx]?.author} —</p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {content.testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setTestimonialIdx(i)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${i === testimonialIdx ? 'bg-purple-400 w-10' : 'bg-purple-900 hover:bg-purple-700'}`}
              aria-label={`후기 ${i + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="작업 프로세스" subtitle="신뢰를 바탕으로 한 투명한 진행 과정" />
          <div className="flex flex-col md:flex-row justify-between gap-8 relative">
            {content.processes.map((p, i) => (
              <div key={i} className="flex-1 bg-slate-50 p-10 rounded-[2.5rem] border border-purple-100/50 shadow-sm hover:shadow-xl transition-all duration-500 text-center group">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 font-black text-xl shadow-xl shadow-purple-100 group-hover:rotate-6 transition-all">{p.step}</div>
                <h4 className="text-xl font-black mb-4 text-slate-900">{p.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service & FAQ */}
      <section id="service" className="py-32 bg-purple-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="서비스 안내" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {content.services.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-purple-100 flex flex-col justify-center items-center text-center group hover:bg-purple-600 transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-2xl font-black text-slate-950 group-hover:text-white mb-3 tracking-tight">{s.name}</h3>
                <span className="text-purple-600 font-black text-3xl group-hover:text-purple-100">{s.price}</span>
              </div>
            ))}
          </div>

          <div id="faq" className="max-w-4xl mx-auto mt-32">
            <SectionTitle title="자주 묻는 질문" />
            <div className="space-y-6">
              {content.faqs.map((f, i) => (
                <details key={i} className="group bg-white rounded-[2rem] border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <summary className="p-10 cursor-pointer flex justify-between items-center font-black text-xl text-slate-900 list-none outline-none">
                    <div className="flex items-center gap-6"> 
                      <span className="text-purple-500 font-black text-2xl">Q.</span> 
                      {f.question} 
                    </div>
                    <span className="transition-transform duration-500 group-open:rotate-180 text-purple-600 bg-purple-50 w-10 h-10 rounded-full flex items-center justify-center">▼</span>
                  </summary>
                  <div className="px-10 pb-10 pt-0 text-slate-600 leading-relaxed text-lg bg-white border-t border-purple-50 animate-fade-in">
                    <div className="flex items-start gap-6 pt-10"> 
                      <span className="text-slate-300 font-black text-2xl pt-1">A.</span> 
                      <p className="font-medium">{f.answer}</p> 
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Contact Section */}
      <section id="inquiry" className="py-32 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight tracking-tighter text-slate-950"> 
                당신의 브랜드를<br/> 
                <span className="text-purple-600 underline underline-offset-8 decoration-purple-100">가장 돋보이게</span> 
              </h2>
              <p className="text-slate-500 text-xl md:text-2xl mb-14 font-medium">BARA DESIGN은 항상 열려있습니다.<br/>비즈니스의 가치를 높여줄 최적의 디자인 파트너를 만나보세요.</p>
            </div>
            <div className="flex-1 w-full bg-purple-50/50 p-12 rounded-[3.5rem] shadow-2xl border border-purple-100/50 backdrop-blur-sm">
              <h3 className="text-3xl font-black text-purple-950 mb-10 text-center">문의 및 상담</h3>
              
              <div className="space-y-8">
                {/* Contact Items */}
                <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📱</div>
                  <div>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Inquiry Contact</p>
                    <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">010-7222-4594</p>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                  <div className="w-16 h-16 bg-[#FAE100] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">💬</div>
                  <div>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">KakaoTalk ID</p>
                    <p className="text-2xl md:text-3xl font-black text-[#371701] tracking-tight">haram0226</p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-slate-400 text-sm font-medium">업무 시간: 평일 09:00 - 18:00 (주말 및 공휴일 휴무)</p>
                  <p className="text-purple-600 text-xs mt-2 font-black italic">상담 요청 시 빠르게 회신 드립니다.</p>
                </div>
              </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/2 -z-10"></div>
      </section>

      <Footer />
    </div>
  );
};

// --- Admin Section ---

const AdminPanel: React.FC<{ content: SiteContent; setContent: (c: SiteContent) => void }> = ({ content, setContent }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthorized(true);
    else alert('비밀번호가 올바르지 않습니다.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const promises = fileArray.map(file => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target?.result as string);
      reader.readAsDataURL(file);
    }));
    Promise.all(promises).then(base64Images => {
      const newList = [...content.portfolio];
      newList[idx].images = [...newList[idx].images, ...base64Images];
      setContent({...content, portfolio: newList});
    });
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-950 px-4">
        <form onSubmit={handleLogin} className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full">
          <div className="text-center mb-10"> 
            <h1 className="text-4xl font-black text-purple-950 mb-3 tracking-tighter">BARA ADMIN</h1> 
            <p className="text-slate-400 font-bold">인증을 위해 비밀번호를 입력해 주세요.</p> 
          </div>
          <input type="password" placeholder="PASSWORD" className="w-full px-8 py-5 bg-slate-50 rounded-2xl mb-6 border border-purple-100 focus:ring-4 focus:ring-purple-200 outline-none font-black text-center tracking-widest" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl">ACCESS DASHBOARD</button>
          <button type="button" onClick={() => navigate('/')} className="w-full text-slate-400 mt-8 text-sm underline font-bold tracking-tight">홈으로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-40 px-10 py-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg">A</div>
           <h1 className="font-black text-2xl text-slate-900 tracking-tighter uppercase italic">BARA MANAGEMENT</h1>
        </div>
        <button onClick={() => navigate('/')} className="bg-slate-950 text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg hover:bg-slate-800 transition-all">EXIT</button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-16 space-y-16">
        <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200">
          <h2 className="text-3xl font-black mb-10 border-b pb-6 flex items-center gap-4">
            <span className="w-3 h-10 bg-purple-500 rounded-full"></span>
            히어로 영역 관리
          </h2>
          <div className="space-y-8">
            <div> <label className="block text-sm font-black text-slate-500 mb-3 uppercase tracking-widest">메인 타이틀 (줄바꿈: \n)</label> <textarea className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl min-h-[160px] font-black text-2xl leading-tight" value={content.heroTitle} onChange={(e) => setContent({...content, heroTitle: e.target.value})} /> </div>
            <div> <label className="block text-sm font-black text-slate-500 mb-3 uppercase tracking-widest">서브 텍스트</label> <textarea className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl min-h-[100px] font-bold text-lg" value={content.heroSubtitle} onChange={(e) => setContent({...content, heroSubtitle: e.target.value})} /> </div>
          </div>
        </section>

        <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-10 border-b pb-6">
            <h2 className="text-3xl font-black flex items-center gap-4">
              <span className="w-3 h-10 bg-purple-500 rounded-full"></span>
              포트폴리오 라이브러리
            </h2>
            <button onClick={() => setContent({...content, portfolio: [{ id: Date.now().toString(), title: '제목 입력', category: '카테고리', images: [] }, ...content.portfolio]})} className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl">+ NEW PROJECT</button>
          </div>
          <div className="space-y-10">
            {content.portfolio.map((item, idx) => (
              <div key={item.id} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group animate-fade-in">
                <button onClick={() => { if(confirm('정말 삭제하시겠습니까?')) setContent({...content, portfolio: content.portfolio.filter(p => p.id !== item.id)})}} className="absolute top-6 right-6 bg-red-100 text-red-500 w-10 h-10 rounded-full flex items-center justify-center font-black hover:bg-red-500 hover:text-white transition-all">✕</button>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">프로젝트 제목</label>
                    <input className="w-full px-6 py-4 border-none bg-white rounded-2xl font-black text-xl shadow-sm" value={item.title} onChange={e => { const nl = [...content.portfolio]; nl[idx].title = e.target.value; setContent({...content, portfolio: nl}); }} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">카테고리</label>
                    <input className="w-full px-6 py-4 border-none bg-white rounded-2xl font-bold text-purple-600 shadow-sm" value={item.category} onChange={e => { const nl = [...content.portfolio]; nl[idx].category = e.target.value; setContent({...content, portfolio: nl}); }} />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="block text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest">이미지 업로드 ({item.images.length})</label>
                  <div className="flex gap-4 flex-wrap">
                    {item.images.map((img, iIdx) => (
                      <div key={iIdx} className="w-24 h-24 bg-white rounded-2xl relative border border-slate-200 overflow-hidden shadow-sm group/img">
                        <img src={img} className="w-full h-full object-cover" />
                        <button onClick={() => { const nl = [...content.portfolio]; nl[idx].images = nl[idx].images.filter((_, i) => i !== iIdx); setContent({...content, portfolio: nl}); }} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center font-black transition-opacity">삭제</button>
                      </div>
                    ))}
                    <label className="w-24 h-24 border-2 border-dashed border-purple-200 rounded-2xl flex items-center justify-center cursor-pointer text-purple-400 hover:bg-purple-50 transition-all font-black text-2xl">
                      +
                      <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, idx)} />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200">
           <h2 className="text-3xl font-black mb-10 border-b pb-6 flex items-center gap-4">
            <span className="w-3 h-10 bg-purple-500 rounded-full"></span>
            기타 콘텐츠 일괄 관리
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
             <div className="space-y-6">
                <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-4">작업 프로세스 (5단계)</h3>
                {content.processes.map((p, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                    <input className="w-16 h-12 text-center bg-purple-600 text-white font-black rounded-xl border-none shadow-lg" value={p.step} onChange={e => { const nl = [...content.processes]; nl[i].step = e.target.value; setContent({...content, processes: nl}); }} />
                    <div className="flex-1 space-y-2">
                       <input className="w-full px-4 py-2 border rounded-xl font-black" value={p.title} onChange={e => { const nl = [...content.processes]; nl[i].title = e.target.value; setContent({...content, processes: nl}); }} />
                       <textarea className="w-full px-4 py-2 border rounded-xl text-xs font-medium" value={p.desc} onChange={e => { const nl = [...content.processes]; nl[i].desc = e.target.value; setContent({...content, processes: nl}); }} />
                    </div>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-4">고객 후기 롤링 보드</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {content.testimonials.map((t, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group animate-fade-in">
                      <button onClick={() => setContent({...content, testimonials: content.testimonials.filter((_, idx) => idx !== i)})} className="absolute top-2 right-2 text-red-500 font-black opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      <textarea className="w-full px-4 py-3 bg-white border-none rounded-2xl mb-3 text-sm italic font-medium shadow-sm" value={t.quote} onChange={e => { const nl = [...content.testimonials]; nl[i].quote = e.target.value; setContent({...content, testimonials: nl}); }} />
                      <input className="w-full px-4 py-2 bg-purple-50 border-none rounded-xl text-[10px] font-black text-purple-700 uppercase" value={t.author} onChange={e => { const nl = [...content.testimonials]; nl[i].author = e.target.value; setContent({...content, testimonials: nl}); }} />
                    </div>
                  ))}
                  <button onClick={() => setContent({...content, testimonials: [...content.testimonials, { quote: '의뢰 후기 내용을 입력해 주세요.', author: '재의뢰 고객님' }]})} className="w-full py-4 border-2 border-dashed border-purple-200 text-purple-400 rounded-3xl font-black hover:bg-purple-50 transition-all">+ 후기 추가</button>
                </div>
             </div>
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-12 right-12 z-50">
        <div className="bg-purple-600 text-white px-10 py-5 rounded-3xl shadow-[0_20px_50px_rgba(147,51,234,0.4)] font-black text-[15px] animate-pulse">
           SYSTEM: SAVED & DEPLOYED
        </div>
      </div>
    </div>
  );
};

// --- App Container with Error Handling ---

const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('site_content_bara_v3');
      if (!saved) return INITIAL_CONTENT;
      
      const parsed = JSON.parse(saved);
      if (!parsed.heroTitle || !parsed.portfolio || !parsed.processes) return INITIAL_CONTENT;
      
      return parsed;
    } catch (e) {
      console.error("Failed to parse stored content:", e);
      return INITIAL_CONTENT;
    }
  });

  useEffect(() => {
    localStorage.setItem('site_content_bara_v3', JSON.stringify(content));
  }, [content]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage content={content} />} />
        <Route path="/admin" element={<AdminPanel content={content} setContent={setContent} />} />
      </Routes>
    </Router>
  );
};

export default App;
