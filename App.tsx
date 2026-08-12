
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

// 숲나들e 국립휴양림 예약 일정 (전국 공통 고정 규칙)
type BookingEvent = { label: string; detail: string; date: Date; ongoing?: boolean };

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** 이번 달 지정일이 이미 지났으면 다음 달 같은 날을 반환 */
const nextMonthly = (today: Date, day: number) => {
  const base = startOfDay(today);
  const thisMonth = new Date(base.getFullYear(), base.getMonth(), day);
  return thisMonth >= base
    ? thisMonth
    : new Date(base.getFullYear(), base.getMonth() + 1, day);
};

/** 다음(또는 오늘) 수요일 */
const nextWednesday = (today: Date) => {
  const base = startOfDay(today);
  const diff = (3 - base.getDay() + 7) % 7;
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + diff);
};

/** 4~9일처럼 기간으로 열리는 일정은, 기간 안에 있으면 '진행 중'으로 본다 */
const nextRange = (today: Date, from: number, to: number) => {
  const base = startOfDay(today);
  const day = base.getDate();
  if (day >= from && day <= to) return { date: base, ongoing: true };
  return { date: nextMonthly(today, from), ongoing: false };
};

const getBookingEvents = (today: Date): BookingEvent[] => {
  const draw = nextRange(today, 4, 9);
  return [
    {
      label: '추첨 신청',
      detail: draw.ongoing
        ? '신청 진행 중 · 매월 9일 18:00 마감'
        : '매월 4~9일 09:00~18:00 · 금·토·공휴일 전날 입실분',
      date: draw.date,
      ongoing: draw.ongoing
    },
    { label: '추첨 발표', detail: '매월 10일 16:00', date: nextMonthly(today, 10) },
    { label: '잔여분 선착순', detail: '매월 15일 09:00', date: nextMonthly(today, 15) },
    { label: '평일 선착순', detail: '매주 수요일 09:00 · 6주 뒤 월요일까지', date: nextWednesday(today) }
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
};

const dday = (target: Date, today: Date) => {
  const diff = Math.round((startOfDay(target).getTime() - startOfDay(today).getTime()) / 86400000);
  return diff === 0 ? 'D-DAY' : `D-${diff}`;
};

// 휴양림 이름 ↔ 포스팅 제목 매칭용 정규화 (공백·구분자 제거)
const normalizeName = (value: string) =>
  value.replace(/\s+/g, '').replace(/[·\-–—]/g, '').trim();

// 애드센스 광고 단위 컴포넌트
const AdUnit: React.FC<{ slot: string; format?: string; className?: string }> = ({ slot, format = "auto", className = "" }) => {
  const pushed = useRef(false);

  useEffect(() => {
    // StrictMode 이중 마운트 시 같은 <ins>에 두 번 push되는 것을 방지
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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
  const [sortBy, setSortBy] = useState<'default' | 'popular'>('default');
  const [mapReady, setMapReady] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const bookingEvents = useMemo(() => getBookingEvents(new Date()), []);
  const [forests, setForests] = useState<Forest[]>(FORESTS);
  const [postRegion, setPostRegion] = useState<Region>(Region.ALL);
  const [postTheme, setPostTheme] = useState<Theme>(Theme.ALL);
  const [postsVisible, setPostsVisible] = useState(24);
  const explorerRef = useRef<HTMLElement>(null);

  // enterSite removed

  const scrollToExplorer = () => {
    explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredForests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = forests.filter((f) => {
      const matchesRegion = selectedRegion === Region.ALL || f.region === selectedRegion;
      const matchesTheme = selectedTheme === Theme.ALL || f.theme === selectedTheme;
      const matchesSearch = query === '' ||
        f.name.toLowerCase().includes(query) ||
        f.location.toLowerCase().includes(query);
      return matchesRegion && matchesTheme && matchesSearch;
    });

    // 관심등록 인원은 국립휴양림에만 있으므로, 값이 없는 곳은 뒤로 보낸다.
    if (sortBy === 'popular') {
      return [...result].sort((a, b) => (b.interest ?? -1) - (a.interest ?? -1));
    }
    return result;
  }, [forests, selectedRegion, selectedTheme, searchQuery, sortBy]);

  // Gate view removed

  const postsWithMeta = useMemo(() => {
    const forestMap = new Map<string, Forest>();
    forests.forEach((forest) => {
      forestMap.set(normalizeName(forest.name), forest);
    });
    return POSTS.map((post) => {
      const forest = forestMap.get(normalizeName(post.title));
      return {
        ...post,
        region: forest?.region ?? Region.ALL,
        theme: forest?.theme ?? Theme.ALL,
        location: forest?.location ?? '전국'
      };
    });
  }, [forests]);

  // 필터 버튼 옆에 표시할 건수 (자기 자신의 조건은 제외하고 계산)
  const filterCounts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = (f: Forest) =>
      query === '' || f.name.toLowerCase().includes(query) || f.location.toLowerCase().includes(query);

    const byRegion = {} as Record<string, number>;
    const byTheme = {} as Record<string, number>;

    forests.forEach((f) => {
      if (!matchesSearch(f)) return;
      if (selectedTheme === Theme.ALL || f.theme === selectedTheme) {
        byRegion[f.region] = (byRegion[f.region] || 0) + 1;
        byRegion[Region.ALL] = (byRegion[Region.ALL] || 0) + 1;
      }
      if (selectedRegion === Region.ALL || f.region === selectedRegion) {
        byTheme[f.theme] = (byTheme[f.theme] || 0) + 1;
        byTheme[Theme.ALL] = (byTheme[Theme.ALL] || 0) + 1;
      }
    });
    return { byRegion, byTheme };
  }, [forests, selectedRegion, selectedTheme, searchQuery]);

  const mappableForests = useMemo(
    () => forests.filter((f) => f.lat !== undefined && f.lng !== undefined),
    [forests]
  );

  // 휴양림 → 자체 포스팅 경로 (카드에서 내부 상세 페이지로 연결)
  const postHrefByForest = useMemo(() => {
    const map = new Map<string, string>();
    POSTS.forEach((post) => {
      map.set(normalizeName(post.title), post.href);
    });
    return map;
  }, []);

  const filteredPosts = useMemo(
    () => postsWithMeta.filter((post) => {
      const matchesRegion = postRegion === Region.ALL || post.region === postRegion;
      const matchesTheme = postTheme === Theme.ALL || post.theme === postTheme;
      return matchesRegion && matchesTheme;
    }),
    [postsWithMeta, postRegion, postTheme]
  );

  useEffect(() => {
    setPostsVisible(24);
  }, [postRegion, postTheme]);

  // 지도 섹션이 화면에 들어올 때만 Leaflet을 내려받는다 (초기 로딩 보호)
  useEffect(() => {
    const node = mapSectionRef.current;
    if (!node || mapReady) return;

    const load = () => {
      if (document.getElementById('leaflet-js')) { setMapReady(true); return; }
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(css);
      const js = document.createElement('script');
      js.id = 'leaflet-js';
      js.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      js.onload = () => setMapReady(true);
      document.head.appendChild(js);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { load(); observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [mapReady]);

  useEffect(() => {
    const L = (window as unknown as { L?: any }).L;
    const node = mapNodeRef.current;
    if (!mapReady || !L || !node || mappableForests.length === 0) return;

    const map = L.map(node, { scrollWheelZoom: false }).setView([36.5, 127.8], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mappableForests.forEach((f) => {
      L.circleMarker([f.lat, f.lng], {
        radius: 6, color: '#047857', weight: 2, fillColor: '#10b981', fillOpacity: 0.85
      })
        .addTo(map)
        .bindPopup(
          `<strong>${f.name}</strong><br>${f.location}` +
          `<br><a href="${f.bookingUrl}" target="_blank" rel="noopener noreferrer">예약 페이지 열기</a>`
        );
    });

    return () => { map.remove(); };
  }, [mapReady, mappableForests]);

  useEffect(() => {
    let isActive = true;

    // 데이터 출처는 화면에 노출하지 않는다. 문제 진단은 콘솔로만 남긴다.
    const loadForests = async () => {
      const serviceKey = import.meta.env.VITE_PUBLIC_DATA_API_KEY?.trim();
      if (!serviceKey) return;

      try {
        const apiForests = await fetchForestsFromPublicData(serviceKey);
        if (!isActive) return;

        // 응답 스키마가 바뀌면 이름·주소가 빈 값으로 채워진 목록이 만들어질 수 있다.
        // 로컬 데이터보다 확실히 나을 때만 교체한다.
        const usable = apiForests.filter(
          (f) => f.name && !f.name.startsWith('휴양림 ') && f.location !== '전국'
        );

        if (usable.length >= FORESTS.length * 0.8) {
          setForests(usable);
          return;
        }

        console.warn(
          `[forest] API 응답 ${apiForests.length}건 중 유효 ${usable.length}건이라 로컬 데이터를 유지합니다.`
        );
      } catch (error) {
        if (!isActive) return;
        console.warn('[forest] 공공데이터 API 호출 실패, 로컬 데이터를 유지합니다.', error);
      }
    };

    loadForests();

    return () => {
      isActive = false;
    };
  }, []);


  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 page-fade-in">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            aria-label="맨 위로 이동"
            className="flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-2xl" aria-hidden="true">🌲</span>
            <span className="font-black text-xl text-emerald-800 tracking-tighter">숲나들e</span>
          </button>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-600">
            <a href="#schedule" className="hover:text-emerald-700 transition-colors">예약일정</a>
            <a href="#map" className="hover:text-emerald-700 transition-colors">지도</a>
            <a href="/ranking.html" className="hover:text-emerald-700 transition-colors">인기순위</a>
            <a href="#quick-booking" className="hover:text-emerald-700 transition-colors">간편예약</a>
            <a href="#experience" className="hover:text-emerald-700 transition-colors">체험/레포츠</a>
            <a href="#posts" className="hover:text-emerald-700 transition-colors">포스팅</a>
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
        {/* 예약 오픈 일정 */}
        <section id="schedule" className="py-14 bg-stone-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">다음 예약 오픈까지</h2>
              <p className="text-stone-400 text-sm">국립자연휴양림 공통 일정입니다. 공립·사립은 운영기관에 따라 다를 수 있습니다.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {bookingEvents.map((ev) => {
                const badge = ev.ongoing ? '진행 중' : dday(ev.date, new Date());
                const isToday = ev.ongoing || badge === 'D-DAY';
                return (
                  <div
                    key={ev.label}
                    className={`rounded-3xl p-6 border transition-colors ${isToday
                      ? 'bg-emerald-600 border-emerald-400'
                      : 'bg-white/5 border-white/10'
                      }`}
                  >
                    <div className={`text-xs font-black tracking-widest ${isToday ? 'text-white' : 'text-emerald-400'}`}>
                      {badge}
                    </div>
                    <h3 className="mt-2 text-lg font-black text-white">{ev.label}</h3>
                    <p className="mt-1 text-xs text-stone-300 leading-relaxed">{ev.detail}</p>
                    <p className={`mt-3 text-[11px] font-bold ${isToday ? 'text-emerald-100' : 'text-stone-400'}`}>
                      {ev.ongoing
                        ? '오늘 신청 가능'
                        : ev.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
                    loading="lazy"
                    decoding="async"
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
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-[1.2]">전국 자연휴양림 예약 정보, 숲에서 만나는 진정한 휴식</h1>
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
                    aria-pressed={postRegion === region}
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
                    aria-pressed={postTheme === theme}
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

        {/* 지도 */}
        <section id="map" className="py-16 bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4" ref={mapSectionRef}>
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-3xl font-black text-stone-900">지도로 찾기</h2>
              <p className="text-stone-500 text-sm">
                좌표가 확인된 {mappableForests.length}곳을 표시합니다. 마커를 누르면 예약 페이지로 이동할 수 있어요.
              </p>
            </div>
            <div
              ref={mapNodeRef}
              className="w-full h-[480px] rounded-[2rem] overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center"
            >
              {!mapReady && <span className="text-sm font-bold text-stone-400">지도를 불러오는 중입니다…</span>}
            </div>
            <p className="mt-3 text-center text-[11px] text-stone-400">
              지도 데이터 © OpenStreetMap 기여자 · 좌표 출처: 공공데이터포털 전국휴양림표준데이터, 산림청 산림공간정보
            </p>
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
                      aria-label="검색어 지우기"
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
                    aria-pressed={selectedRegion === region}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedRegion === region
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-emerald-300'
                      }`}
                  >
                    {region}
                    <span className="ml-1.5 opacity-60 font-medium">{filterCounts.byRegion[region] || 0}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(Theme).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    aria-pressed={selectedTheme === theme}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedTheme === theme
                      ? 'bg-stone-800 text-white shadow-md'
                      : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400'
                      }`}
                  >
                    {theme}
                    <span className="ml-1.5 opacity-60 font-medium">{filterCounts.byTheme[theme] || 0}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-2 pt-2">
                <div className="inline-flex rounded-full border border-stone-200 bg-white p-1">
                  {([['default', '이름순'], ['popular', '인기순']] as const).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key)}
                      aria-pressed={sortBy === key}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${sortBy === key
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-800'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {sortBy === 'popular' && (
                  <p className="text-[11px] text-stone-400 max-w-md text-center leading-relaxed">
                    산림청 국립자연휴양림관리소 관심시설 등록 인원(2023년 4월 기준) 순입니다.
                    국립휴양림 45곳만 제공되며, 자료가 없는 휴양림은 뒤에 표시됩니다.
                  </p>
                )}
              </div>

              {/* 리스트 상단 지역 필터 아래 광고 */}
              <AdUnit slot="7932374339" format="horizontal" className="mt-10" />
            </div>

            {filteredForests.length === 0 && (
              <div className="text-center py-20 space-y-3">
                <p className="text-lg font-black text-stone-700">조건에 맞는 휴양림이 없습니다.</p>
                <p className="text-sm text-stone-500">검색어를 지우거나 다른 지역·테마를 선택해 보세요.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredForests.map((forest, index) => (
                <React.Fragment key={forest.id}>
                  {/* 휴양림 카드 */}
                  <div className="flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 group hover:shadow-xl transition-all duration-300">
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={forest.imageUrl}
                        alt={`${forest.name} 전경`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-stone-800 uppercase">
                          {forest.region}
                        </span>
                        {forest.interest !== undefined && (
                          <span
                            className="bg-emerald-700/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-white"
                            title="산림청 관심시설 등록 인원 (2023년 4월 기준)"
                          >
                            관심 {forest.interest.toLocaleString('ko-KR')}명
                          </span>
                        )}
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
                        {(() => {
                          const postHref = postHrefByForest.get(normalizeName(forest.name));
                          if (!postHref) {
                            return (
                              <a
                                href={forest.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-stone-900 hover:bg-emerald-700 text-white py-4 rounded-xl text-xs font-black transition-all"
                              >
                                상세 정보 및 예약
                              </a>
                            );
                          }
                          return (
                            <div className="grid grid-cols-2 gap-2">
                              <a
                                href={encodeURI(postHref)}
                                className="block text-center bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-xl text-xs font-black transition-all"
                              >
                                자세히 보기
                              </a>
                              <a
                                href={forest.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl text-xs font-black transition-all"
                              >
                                예약하러 가기
                              </a>
                            </div>
                          );
                        })()}
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
                    <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-600 px-12 py-5 rounded-full font-black hover:bg-emerald-500 transition-all shadow-xl">공식 홈페이지 방문</a>
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
              <a href="/ranking.html" className="hover:text-emerald-600">인기순위</a>
              <a href="/privacy.html" className="hover:text-emerald-600">개인정보처리방침</a>
              <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 border-b-2 border-emerald-500">공식사이트</a>
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
