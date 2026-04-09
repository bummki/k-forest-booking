
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Region, Theme, Forest } from './types';
import { FORESTS, RESERVATION_STEPS, QUICK_BOOKING_LINKS, EXPERIENCES } from './constants';
import { POSTS } from './posts';
import { fetchForestsFromPublicData } from './forestApi';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// 애드센스 광고 단위 컴포넌트
const AdUnit: React.FC<{ slot: string; format?: string; className?: string }> = ({ slot, format = "auto", className = "" }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`adsense-container w-full max-w-7xl mx-auto px-4 overflow-hidden ${className}`}>
      {/* 애드센스 코드 */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2695727848475573"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"></ins>
    </div>
  );
};

const App: React.FC = () => {
  // const [viewMode, setViewMode] = useState<'gate' | 'content'>('gate'); // Removed for direct access
  const [selectedRegion, setSelectedRegion] = useState<Region>(Region.ALL);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(Theme.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [forests, setForests] = useState<Forest[]>(FORESTS);
  const [dataStatus, setDataStatus] = useState<'loading' | 'api' | 'fallback'>('loading');
  const [dataMessage, setDataMessage] = useState('');
  const [postRegion, setPostRegion] = useState<Region>(Region.ALL);
  const [postTheme, setPostTheme] = useState<Theme>(Theme.ALL);
  const [postsVisible, setPostsVisible] = useState(24);
  const explorerRef = useRef<HTMLElement>(null);

  // enterSite removed

  const scrollToExplorer = () => {
    explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredForests = forests.filter(f => {
    const matchesRegion = selectedRegion === Region.ALL || f.region === selectedRegion;
    const matchesTheme = selectedTheme === Theme.ALL || f.theme === selectedTheme;
    const matchesSearch = searchQuery === '' || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesTheme && matchesSearch;
  });

  // Gate view removed

  const postsWithMeta = useMemo(() => {
    const normalize = (value: string) =>
      value.replace(/\s+/g, '').replace(/[·\-–—]/g, '').trim();
    const forestMap = new Map<string, Forest>();
    forests.forEach((forest) => {
      forestMap.set(normalize(forest.name), forest);
    });
    return POSTS.map((post) => {
      const forest = forestMap.get(normalize(post.title));
      return {
        ...post,
        region: forest?.region ?? Region.ALL,
        theme: forest?.theme ?? Theme.ALL,
        location: forest?.location ?? '전국'
      };
    });
  }, [forests]);

  const filteredPosts = postsWithMeta.filter((post) => {
    const matchesRegion = postRegion === Region.ALL || post.region === postRegion;
    const matchesTheme = postTheme === Theme.ALL || post.theme === postTheme;
    return matchesRegion && matchesTheme;
  });

  useEffect(() => {
    setPostsVisible(24);
  }, [postRegion, postTheme]);

  useEffect(() => {
    let isActive = true;

    const loadForests = async () => {
      const serviceKey = import.meta.env.VITE_PUBLIC_DATA_API_KEY?.trim();
      if (!serviceKey) {
        if (isActive) {
          setForests(FORESTS);
          setDataStatus('fallback');
          setDataMessage('인증키 미설정으로 로컬 데이터를 표시 중입니다.');
        }
        return;
      }

      try {
        const apiForests = await fetchForestsFromPublicData(serviceKey);
        if (!isActive) return;

        if (apiForests.length > 0) {
          setForests(apiForests);
          setDataStatus('api');
          setDataMessage(`공공데이터 API 기준 ${apiForests.length}건 로드됨`);
          return;
        }

        setForests(FORESTS);
        setDataStatus('fallback');
        setDataMessage('API 응답에 데이터가 없어 로컬 데이터를 표시 중입니다.');
      } catch (error) {
        if (!isActive) return;
        setForests(FORESTS);
        setDataStatus('fallback');
        setDataMessage(error instanceof Error ? error.message : 'API 호출 실패로 로컬 데이터를 표시 중입니다.');
      }
    };

    loadForests();

    return () => {
      isActive = false;
    };
  }, []);


  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 animate-in fade-in duration-1000">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl">🌲</span>
            <span className="font-black text-xl text-emerald-800 tracking-tighter">숲나들e</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#quick-booking" className="hover:text-emerald-700 transition-colors">간편예약</a>
            <a href="#experience" className="hover:text-emerald-700 transition-colors">체험/레포츠</a>
            <a href="#posts" className="hover:text-emerald-700 transition-colors">포스팅</a>
            <a href="#data-usage" className="hover:text-emerald-700 transition-colors">데이터활용</a>
            <a href="#explorer" className="hover:text-emerald-700 transition-colors">휴양림 검색</a>
            <a href="#guide" className="hover:text-emerald-700 transition-colors">가이드</a>
          </div>
          <button
            onClick={scrollToExplorer}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-xs font-black transition-all"
          >
            지역별 리스트 보기
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Quick Booking Links Section */}
        <section id="quick-booking" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-stone-900">실시간 맞춤 예약 서비스</h2>
              <p className="text-stone-500 text-sm">원하시는 예약 타입을 선택하면 해당 공식 페이지로 연결됩니다.</p>
              {/* 소제목 바로 아래 광고 */}
              <AdUnit slot="7932374339" format="horizontal" className="mt-6" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {QUICK_BOOKING_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 ${link.color} hover:shadow-lg transition-all transform hover:-translate-y-1 text-center space-y-3 group`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-sm font-black tracking-tight">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Leports Section */}
        <section id="experience" className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-stone-900">도전과 힐링, 숲길 레포츠</h2>
              {/* 섹션 소제목 하단 광고 */}
              <AdUnit slot="7932374339" format="horizontal" className="mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-[2.5rem] h-80 shadow-xl border border-white">
                  <img
                    src={exp.bgImage}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={exp.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{exp.icon}</span>
                      <h3 className="text-3xl font-black">{exp.title}</h3>
                    </div>
                    <p className="text-stone-200 font-medium leading-relaxed max-w-sm">
                      {exp.description}
                    </p>
                    <div className="pt-2">
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-full font-black text-sm hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
                      >
                        자세히 보기
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section id="intro" className="py-20 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
            <span className="text-emerald-600 font-black text-xs tracking-widest uppercase">National Service Info</span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-[1.2]">숲에서 만나는 진정한 휴식</h2>
            <p className="max-w-3xl mx-auto text-lg text-stone-500 leading-relaxed">
              전국 국립자연휴양림은 숲나들e 통합 예약 시스템을 통해 쉽고 편리하게 이용할 수 있습니다.<br className="hidden md:block" />
              숙박시설뿐만 아니라 야영장, 숲길, 체험 프로그램까지 자연이 주는 혜택을 한곳에서 만나보세요.
            </p>
            {/* 인트로 하단 중간 광고 */}
            <AdUnit slot="7932374339" />
          </div>
        </section>

        {/* Posts Section */}
        <section id="posts" className="py-20 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-stone-900">휴양림 포스팅 모음</h2>
              <p className="text-stone-500 text-sm">총 {POSTS.length}건의 포스팅을 지역과 테마로 분류해 확인할 수 있어요. (새 탭에서 열림)</p>
              <AdUnit slot="7932374339" format="horizontal" className="mt-4" />
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(Region).map((region) => (
                  <button
                    key={region}
                    onClick={() => setPostRegion(region)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${postRegion === region
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-300'
                      }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(Theme).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setPostTheme(theme)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${postTheme === theme
                      ? 'bg-stone-800 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400'
                      }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
              <div className="text-center text-xs text-stone-500">
                현재 {filteredPosts.length}건 표시됨
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(0, postsVisible).map((post, idx) => (
                <a
                  key={post.href}
                  href={encodeURI(post.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="text-emerald-700 text-xs font-black tracking-widest">POST {String(idx + 1).padStart(3, '0')}</div>
                  <h3 className="mt-3 text-lg font-black text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">{post.region}</span>
                    <span className="px-2 py-1 rounded-full bg-stone-100 text-stone-600 font-bold">{post.theme}</span>
                    <span className="px-2 py-1 rounded-full bg-stone-50 text-stone-500 font-medium">{post.location}</span>
                  </div>
                  <p className="mt-3 text-sm text-stone-500">자세한 소개와 이용 팁을 확인해 보세요.</p>
                </a>
              ))}
            </div>
            {postsVisible < filteredPosts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPostsVisible((count) => count + 24)}
                  className="px-6 py-3 rounded-full bg-emerald-700 text-white text-sm font-black hover:bg-emerald-800 transition-colors"
                >
                  더보기
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Data Usage Section */}
        <section id="data-usage" className="py-16 bg-stone-50 border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-stone-900">데이터활용</h2>
              <p className="text-stone-500 text-sm mt-2">공공데이터포털 Open API를 우선 사용하고, 실패 시 로컬 데이터로 자동 전환됩니다.</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-black tracking-widest text-emerald-700">SOURCE</p>
                <p className="text-sm text-stone-700">전국휴양림표준데이터 (공공데이터포털)</p>
                <a
                  href="https://api.data.go.kr/openapi/tn_pubr_public_rcrfrst_api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-bold text-emerald-700 hover:underline"
                >
                  End Point 확인
                </a>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-black tracking-widest text-emerald-700">STATUS</p>
                <p className={`text-sm font-bold ${dataStatus === 'api' ? 'text-emerald-700' : dataStatus === 'loading' ? 'text-stone-500' : 'text-amber-700'}`}>
                  {dataStatus === 'api' ? 'API 데이터 사용 중' : dataStatus === 'loading' ? '데이터 로딩 중' : '로컬 데이터 사용 중'}
                </p>
                <p className="text-xs text-stone-500">{dataMessage || '초기 로딩 중입니다.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Explorer Section */}
        <section id="explorer" ref={explorerRef} className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tight">전국 휴양림 리스트</h2>
              <p className="text-sm text-stone-500">현재 {forests.length}건 데이터 표시 중</p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 pb-8 max-w-2xl mx-auto">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input
                    type="text"
                    placeholder="휴양림 이름이나 지역을 검색해보세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-white border-2 border-stone-200 rounded-2xl text-stone-700 font-medium placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.values(Region).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedRegion === region
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-300'
                      }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(Theme).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedTheme === theme
                      ? 'bg-stone-800 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400'
                      }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
              {/* 리스트 상단 지역 필터 아래 광고 */}
              <AdUnit slot="7932374339" format="horizontal" className="mt-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredForests.map((forest, index) => (
                <React.Fragment key={forest.id}>
                  {/* 휴양림 카드 */}
                  <div className="flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 group hover:shadow-xl transition-all duration-300">
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={forest.imageUrl}
                        alt={forest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-stone-800 uppercase">
                          {forest.region}
                        </span>
                      </div>
                      {/* Ad Stamp Removed */}
                    </div>
                    <div className="p-8 flex flex-col flex-1 space-y-4">
                      <h3 className="text-xl font-black text-stone-800">{forest.name}</h3>
                      <div className="text-xs text-stone-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                        <span className="text-emerald-500">📍</span> {forest.location}
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed flex-1">
                        {forest.description}
                      </p>
                      <div className="pt-4 border-t border-stone-50 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {forest.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={forest.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-stone-900 hover:bg-emerald-700 text-white py-4 rounded-xl text-xs font-black transition-all"
                        >
                          상세 정보 및 예약
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 리스트 중간 광고 삽입 (6번째 아이템마다 가로형 광고 노출) */}
                  {/* 리스트 중간 광고 삽입 (6번째 아이템마다) */}
                  {(index + 1) % 6 === 0 && (
                    <div className="adsense-container col-span-1 md:col-span-2 lg:col-span-3 w-full py-8">
                      {/* 애드센스 코드 */}
                      <AdUnit slot="7932374339" format="auto" className="" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section id="guide" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-stone-900">이용 가이드 및 팁</h2>
              {/* 가이드 상단 광고 */}
              <AdUnit slot="7932374339" format="horizontal" className="mt-4" />
            </div>
            <div className="bg-stone-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-black leading-tight">숲나들e<br />간편 예약 가이드</h2>
                  <p className="text-stone-400 text-lg leading-relaxed">전국의 국립자연휴양림은 통합 아이디 하나로<br />언제 어디서나 쉽게 예약할 수 있습니다.</p>
                  <div className="pt-8">
                    <a href="https://www.foresttrip.go.kr" target="_blank" className="inline-block bg-emerald-600 px-12 py-5 rounded-full font-black hover:bg-emerald-500 transition-all shadow-xl">공식 홈페이지 방문</a>
                  </div>
                </div>
                <div className="space-y-8">
                  {RESERVATION_STEPS.map((step) => (
                    <div key={step.step} className="flex gap-8 items-start p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="text-4xl shrink-0">{step.icon}</div>
                      <div className="space-y-2">
                        <div className="text-emerald-500 font-black text-xs uppercase tracking-widest">Step 0{step.step}</div>
                        <h4 className="text-xl font-bold">{step.title}</h4>
                        <p className="text-stone-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* 푸터 직전 마지막 광고 */}
          <AdUnit slot="7932374339" className="mb-16" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-2xl">🌲</span>
                <span className="text-2xl font-black text-emerald-800 tracking-tighter">숲나들e 통합 안내</span>
              </div>
              <p className="max-w-md text-sm text-stone-500 leading-relaxed font-medium">
                본 웹사이트는 전국 국립자연휴양림 이용자들의 편의를 위해 정보를 제공하는 독립적인 랜딩 페이지입니다. 예약 및 법적 고지는 공식 홈페이지를 확인하세요.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm font-black text-stone-800">
              <a href="#quick-booking" className="hover:text-emerald-600">간편예약</a>
              <a href="#experience" className="hover:text-emerald-600">체험/레포츠</a>
              <a href="#explorer" className="hover:text-emerald-600">지역리스트</a>
              <a href="https://www.foresttrip.go.kr" className="hover:text-emerald-600 border-b-2 border-emerald-500">공식사이트</a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between gap-6 text-xs text-stone-500 font-medium">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-stone-900 text-sm">© 2026 National Forest Information Portal. All Rights Reserved.</p>
              <p className="tracking-tight">
                범키드 <span className="text-stone-300 mx-2">|</span> 대표: 김낙원 <span className="text-stone-300 mx-2">|</span> 사업자등록번호: 770-51-00533
              </p>
            </div>
            <p className="md:self-end text-[10px] uppercase font-black tracking-widest text-stone-300">Better rest, Better life with Foresttrip.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
