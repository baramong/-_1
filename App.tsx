
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { SiteContent, PortfolioItem, InquiryFormData, Testimonial, ProcessStep, ServiceItem, FAQItem } from './types';
import { INITIAL_CONTENT, ADMIN_PASSWORD } from './constants';

// --- Helper Components ---

const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-black mb-4 ${light ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {subtitle && <p className={`text-lg ${light ? 'text-purple-200' : 'text-slate-600'}`}>{subtitle}</p>}
    <div className={`w-16 h-1 mx-auto mt-6 ${light ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
  </div>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100 font-['Pretendard']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-black text-purple-950 tracking-tighter uppercase italic">BARA DESIGN</Link>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-700">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-purple-600 transition">특장점</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="hover:text-purple-600 transition">포트폴리오</a>
            <a href="#process" onClick={(e) => handleNavClick(e, 'process')} className="hover:text-purple-600 transition">작업 프로세스</a>
            <a href="#service" onClick={(e) => handleNavClick(e, 'service')} className="hover:text-purple-600 transition">서비스</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-purple-600 transition">FAQ</a>
          </div>
          <div>
            <a href="#inquiry" onClick={(e) => handleNavClick(e, 'inquiry')} className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-100">
              무료 상담 받기
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-purple-950 text-purple-300 py-12 font-['Pretendard']">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-sm font-black text-white mb-2 tracking-widest uppercase">BARA DESIGN</p>
      <p className="text-xs">© 2024 BARA DESIGN. All rights reserved.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Link to="/admin" className="text-purple-400 hover:text-white text-xs transition">Admin Access</Link>
      </div>
    </div>
  </footer>
);

const CTAButton: React.FC<{ text: string; primary?: boolean; href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ text, primary, href, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-block px-8 py-4 rounded-xl text-lg font-black transition transform hover:scale-105 shadow-xl ${
      primary 
        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200' 
        : 'bg-white text-purple-900 border-2 border-purple-100 hover:bg-purple-50 shadow-slate-100'
    }`}
  >
    {text}
  </a>
);

// --- Modal Slider ---
const PortfolioModal: React.FC<{ item: PortfolioItem; onClose: () => void }> = ({ item, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white text-4xl hover:text-purple-400 transition">&times;</button>
      <div className="max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-2xl">
          {item.images.length > 0 ? (
            <img 
              src={item.images[currentIdx]} 
              className="max-w-full max-h-full object-contain select-none"
              alt={`${item.title} ${currentIdx + 1}`}
            />
          ) : (
             <div className="text-white">등록된 이미지가 없습니다.</div>
          )}
          {item.images.length > 1 && (
            <>
              <button onClick={() => setCurrentIdx(prev => (prev === 0 ? item.images.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-purple-600 text-white flex items-center justify-center transition"> &lsaquo; </button>
              <button onClick={() => setCurrentIdx(prev => (prev === item.images.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-purple-600 text-white flex items-center justify-center transition"> &rsaquo; </button>
            </>
          )}
        </div>
        <div className="mt-8 text-center text-white">
          <h3 className="text-2xl font-black mb-1">{item.title}</h3>
          <p className="text-purple-300 text-sm font-medium">{item.category} ({currentIdx + 1} / {item.images.length})</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Pages ---

const LandingPage: React.FC<{ content: SiteContent }> = ({ content }) => {
  const [formData, setFormData] = useState<InquiryFormData>({ name: '', contact: '', type: '', schedule: '', budget: '', message: '' });
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    if (content.testimonials.length <= 1) return;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 곧 연락드리겠습니다!');
    setFormData({ name: '', contact: '', type: '', schedule: '', budget: '', message: '' });
  };

  return (
    <div className="pt-16 scroll-smooth font-['Pretendard']">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32 md:pt-40 md:pb-52">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black mb-6 tracking-[0.2em] uppercase">BARA DESIGN / PROMOTION EXPERT</span>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.15] whitespace-pre-line tracking-tight">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CTAButton text="실시간 카카오톡 상담" primary href="#inquiry" onClick={(e) => handleScrollTo(e, 'inquiry')} />
              <CTAButton text="포트폴리오 먼저 보기" href="#portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-purple-50 rounded-full blur-3xl opacity-60"></div>
      </section>

      {/* Strengths Section */}
      <section id="about" className="py-24 bg-purple-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="성공을 위한 디자인 공식" subtitle="바라 디자인은 고객의 비즈니스 가치를 디자인으로 증명합니다." />
          <div className="grid md:grid-cols-3 gap-8">
            {content.strengths.map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition border border-purple-100 group">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition">{s.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-purple-900">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="최신 프로젝트" subtitle="최근 진행한 홍보 목적 중심의 작업물들입니다." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.portfolio.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedPortfolio(item)}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100 shadow-sm">
                  <img src={item.images[0] || 'https://via.placeholder.com/800x600?text=No+Image'} alt={item.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white border-2 border-white px-6 py-2 rounded-full font-bold">자세히 보기</span>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-purple-400 text-xs font-black mb-1 uppercase tracking-widest">{item.category}</p>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPortfolio && <PortfolioModal item={selectedPortfolio} onClose={() => setSelectedPortfolio(null)} />}

      {/* Testimonials Carousel */}
      <section className="py-24 bg-purple-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-6xl mb-8 text-purple-400 font-serif opacity-50">"</div>
          <div className="transition-opacity duration-500 ease-in-out">
            <h2 className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-8">
              {content.testimonials[testimonialIdx]?.quote}
            </h2>
            <div className="w-12 h-0.5 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-purple-300 font-black tracking-widest uppercase text-xs">— {content.testimonials[testimonialIdx]?.author} —</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-8">
          {content.testimonials.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-purple-400 w-6' : 'bg-purple-800'}`}></div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="안심 설계 작업 프로세스" subtitle="투명한 진행 과정으로 처음 의뢰하시는 분들도 안심할 수 있습니다." />
          <div className="flex flex-col md:flex-row justify-between gap-6 relative">
            {content.processes.map((p, i) => (
              <div key={i} className="flex-1 bg-white p-8 rounded-3xl border border-purple-50 shadow-sm hover:shadow-md transition text-center relative">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black shadow-lg shadow-purple-100">{p.step}</div>
                <h4 className="text-lg font-black mb-3 text-slate-900">{p.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section id="service" className="py-24 bg-purple-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="제공 서비스 안내" subtitle="브랜드 성장에 필요한 모든 홍보물을 제작합니다." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 flex flex-col justify-center items-center text-center group hover:bg-purple-600 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-xl font-black text-slate-800 group-hover:text-white mb-2">{s.name}</h3>
                <span className="text-purple-600 font-black text-2xl group-hover:text-purple-100">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle title="자주 묻는 질문" />
          <div className="space-y-4">
            {content.faqs.map((f, i) => (
              <details key={i} className="group bg-slate-50 rounded-3xl border border-purple-50 overflow-hidden transition-all duration-300">
                <summary className="p-8 cursor-pointer flex justify-between items-center font-bold text-lg text-slate-800 list-none outline-none">
                  <div className="flex items-center gap-4"> <span className="text-purple-500 font-black">Q.</span> {f.question} </div>
                  <span className="transition-transform group-open:rotate-180 text-purple-600">▼</span>
                </summary>
                <div className="p-8 pt-0 text-slate-600 leading-relaxed bg-white border-t border-purple-50">
                  <div className="flex items-start gap-4"> <span className="text-slate-300 font-black text-lg pt-0.5">A.</span> <p>{f.answer}</p> </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA & Form */}
      <section id="inquiry" className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-slate-950"> BARA DESIGN과<br/> <span className="text-purple-600">함께 성장하세요</span> </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" className="bg-[#FAE100] text-[#371701] px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:brightness-95 transition shadow-xl"> 카카오톡으로 즉시 상담 </a>
              </div>
            </div>
            <div className="flex-1 w-full bg-purple-50 p-10 rounded-[2.5rem] shadow-2xl border border-purple-100">
              <h3 className="text-2xl font-black text-purple-900 mb-8 text-center">문의 폼 작성</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input type="text" placeholder="성함 / 업체명" required className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-purple-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input type="tel" placeholder="연락처" required className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-purple-500" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                </div>
                <select className="w-full px-5 py-4 bg-white border-none rounded-2xl focus:ring-2 focus:ring-purple-500 text-slate-500" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value="">홍보물 종류 선택</option>
                  <option value="전단/리플렛">전단/리플렛</option>
                  <option value="포스터/배너">포스터/배너</option>
                  <option value="SNS이미지">SNS 홍보 이미지</option>
                  <option value="상세페이지">상세페이지</option>
                </select>
                <button type="submit" className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-purple-700 transition shadow-lg shadow-purple-200">상담 신청하기</button>
              </form>
            </div>
         </div>
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
    else alert('비밀번호가 틀렸습니다.');
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
      <div className="min-h-screen flex items-center justify-center bg-purple-950 px-4 font-['Pretendard']">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full">
          <div className="text-center mb-8"> <h1 className="text-3xl font-black text-purple-950 mb-2 tracking-tight">BARA ADMIN</h1> <p className="text-slate-500 text-sm">비밀번호를 입력해 주세요.</p> </div>
          <input type="password" placeholder="비밀번호" className="w-full px-6 py-4 bg-slate-50 rounded-2xl mb-4 border border-purple-100 focus:ring-2 focus:ring-purple-500 outline-none font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black hover:bg-purple-700 transition">접속하기</button>
          <button type="button" onClick={() => navigate('/')} className="w-full text-slate-400 mt-6 text-sm underline font-medium">사이트로 돌아가기</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-['Pretendard']">
      <header className="bg-white border-b border-purple-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-black text-xl text-slate-900 tracking-tight">BARA DESIGN MGMT</h1>
        <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold">사이트 종료</button>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 space-y-12">
        {/* Basic Info Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black mb-8 border-b pb-4">기본 정보 수정</h2>
          <div className="space-y-6">
            <div> <label className="block text-sm font-black mb-2">메인 헤드라인</label> <textarea className="w-full px-5 py-4 bg-slate-50 border rounded-2xl min-h-[120px]" value={content.heroTitle} onChange={(e) => setContent({...content, heroTitle: e.target.value})} /> </div>
            <div> <label className="block text-sm font-black mb-2">메인 서브텍스트</label> <textarea className="w-full px-5 py-4 bg-slate-50 border rounded-2xl min-h-[80px]" value={content.heroSubtitle} onChange={(e) => setContent({...content, heroSubtitle: e.target.value})} /> </div>
          </div>
        </section>

        {/* Portfolio Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black">포트폴리오 라이브러리</h2>
            <button onClick={() => setContent({...content, portfolio: [{ id: Date.now().toString(), title: '제목', category: '카테고리', images: [] }, ...content.portfolio]})} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-black text-sm">+ 추가</button>
          </div>
          <div className="space-y-6">
            {content.portfolio.map((item, idx) => (
              <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative">
                <button onClick={() => setContent({...content, portfolio: content.portfolio.filter(p => p.id !== item.id)})} className="absolute top-4 right-4 text-red-500 font-bold">삭제</button>
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="px-4 py-2 border rounded-xl font-bold" value={item.title} onChange={e => { const nl = [...content.portfolio]; nl[idx].title = e.target.value; setContent({...content, portfolio: nl}); }} placeholder="제목" />
                  <input className="px-4 py-2 border rounded-xl" value={item.category} onChange={e => { const nl = [...content.portfolio]; nl[idx].category = e.target.value; setContent({...content, portfolio: nl}); }} placeholder="카테고리" />
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {item.images.map((img, iIdx) => <div key={iIdx} className="w-16 h-16 bg-slate-200 rounded relative"><img src={img} className="w-full h-full object-cover" /><button onClick={() => { const nl = [...content.portfolio]; nl[idx].images = nl[idx].images.filter((_, i) => i !== iIdx); setContent({...content, portfolio: nl}); }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px]">×</button></div>)}
                  <label className="w-16 h-16 border-2 border-dashed rounded flex items-center justify-center cursor-pointer text-slate-400 font-bold">+</label>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, idx)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Step Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black mb-8 border-b pb-4">작업 프로세스 수정</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.processes.map((p, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex gap-2 mb-2">
                  <input className="w-12 px-2 py-1 border rounded bg-white text-center font-bold" value={p.step} onChange={e => { const nl = [...content.processes]; nl[i].step = e.target.value; setContent({...content, processes: nl}); }} />
                  <input className="flex-1 px-4 py-1 border rounded bg-white font-bold" value={p.title} onChange={e => { const nl = [...content.processes]; nl[i].title = e.target.value; setContent({...content, processes: nl}); }} />
                </div>
                <textarea className="w-full px-4 py-2 border rounded bg-white text-sm" value={p.desc} onChange={e => { const nl = [...content.processes]; nl[i].desc = e.target.value; setContent({...content, processes: nl}); }} />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black">후기(Testimonials) 관리</h2>
            <button onClick={() => setContent({...content, testimonials: [...content.testimonials, { quote: '후기 내용', author: '작성자' }]})} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-black text-sm">+ 추가</button>
          </div>
          <div className="space-y-4">
            {content.testimonials.map((t, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border relative">
                <button onClick={() => setContent({...content, testimonials: content.testimonials.filter((_, idx) => idx !== i)})} className="absolute top-2 right-2 text-red-500 text-xs">삭제</button>
                <textarea className="w-full px-4 py-2 border rounded mb-2 text-sm italic" value={t.quote} onChange={e => { const nl = [...content.testimonials]; nl[i].quote = e.target.value; setContent({...content, testimonials: nl}); }} />
                <input className="w-full px-4 py-2 border rounded text-xs font-bold" value={t.author} onChange={e => { const nl = [...content.testimonials]; nl[i].author = e.target.value; setContent({...content, testimonials: nl}); }} />
              </div>
            ))}
          </div>
        </section>

        {/* Services Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black">서비스 및 가격 수정</h2>
            <button onClick={() => setContent({...content, services: [...content.services, { name: '새 서비스', price: '0원' }]})} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-black text-sm">+ 추가</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.services.map((s, i) => (
              <div key={i} className="flex gap-2 p-4 bg-slate-50 rounded-xl border relative group">
                <button onClick={() => setContent({...content, services: content.services.filter((_, idx) => idx !== i)})} className="hidden group-hover:block absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px]">×</button>
                <input className="flex-1 px-4 py-2 border rounded font-bold" value={s.name} onChange={e => { const nl = [...content.services]; nl[i].name = e.target.value; setContent({...content, services: nl}); }} />
                <input className="w-32 px-4 py-2 border rounded text-purple-600 font-bold" value={s.price} onChange={e => { const nl = [...content.services]; nl[i].price = e.target.value; setContent({...content, services: nl}); }} />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Editor */}
        <section className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black">FAQ 수정</h2>
            <button onClick={() => setContent({...content, faqs: [...content.faqs, { question: '질문', answer: '답변' }]})} className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-black text-sm">+ 추가</button>
          </div>
          <div className="space-y-4">
            {content.faqs.map((f, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border relative group">
                <button onClick={() => setContent({...content, faqs: content.faqs.filter((_, idx) => idx !== i)})} className="hidden group-hover:block absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px]">×</button>
                <input className="w-full px-4 py-2 border rounded mb-2 font-bold" value={f.question} onChange={e => { const nl = [...content.faqs]; nl[i].question = e.target.value; setContent({...content, faqs: nl}); }} />
                <textarea className="w-full px-4 py-2 border rounded text-sm" value={f.answer} onChange={e => { const nl = [...content.faqs]; nl[i].answer = e.target.value; setContent({...content, faqs: nl}); }} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-purple-600 text-white px-8 py-4 rounded-full shadow-2xl font-black text-sm">변경사항 자동 저장 중</div>
      </div>
    </div>
  );
};

// --- App Container ---

const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('site_content_bara');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('site_content_bara', JSON.stringify(content));
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
