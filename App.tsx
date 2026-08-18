
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


  const QUICK_CHIPS = [
    { icon: '📅', label: '예약 오픈일', href: '#schedule' },
    { icon: '🗺️', label: '지도로 찾기', href: '#map' },
    { icon: '🏆', label: '인기 순위', href: '/ranking.html' },
    { icon: '🌲', label: '휴양림 전체', href: '#explorer' },
    { icon: '📖', label: '휴양림 이야기', href: '#posts' },
    { icon: '🥾', label: '숲길·레포츠', href: '#experience' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 page-fade-in">
      {/* ── 상단 고정 헤더 ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="맨 위로 이동"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 shrink-0"
            >
              <span className="text-xl" aria-hidden="true">🌲</span>
              <span className="text-lg font-bold tracking-tight text-emerald-700">숲으로</span>
            </button>

            <div className="relative">
              <label htmlFor="region-select" className="sr-only">지역 선택</label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as Region)}
                className="appearance-none bg-transparent pl-1 pr-6 py-1 text-sm font-bold text-stone-900 focus:outline-none cursor-pointer"
              >
                {Object.values(Region).map((r) => (
                  <option key={r} value={r}>{r === Region.ALL ? '전국' : r}</option>
                ))}
              </select>
              <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex-1" />

            <a href="/ranking.html" aria-label="인기 순위"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" />
              </svg>
            </a>
            <a href="#map" aria-label="지도로 찾기"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100 transition-colors">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 20l-5.4 1.8A1 1 0 013 20.9V6.2a1 1 0 01.7-1L9 3.4m0 16.6l6-2m-6 2V3.4m6 14.6l5.4 1.8a1 1 0 001.6-1V4.1a1 1 0 00-.7-1L15 1.4m0 16.6V1.4m-6 2l6-2" />
              </svg>
            </a>
          </div>

          <div className="pb-3">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="가리왕산, 제주, 계곡 검색해보세요"
                className="w-full h-11 pl-12 pr-10 rounded-full bg-stone-100 text-[15px] font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="검색어 지우기"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        {/* ── 예약 오픈 일정 ── */}
        <section id="schedule" className="max-w-5xl mx-auto px-4 pt-5">
          <div className="rounded-3xl bg-emerald-700 p-5 md:p-6">
            <p className="text-emerald-100 text-xs font-bold tracking-wide">숲나들e 국립휴양림 예약 일정</p>
            <h1 className="mt-1 text-xl md:text-2xl font-bold text-white leading-snug">
              전국 자연휴양림,<br className="md:hidden" /> 다음 예약 오픈까지
            </h1>
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {bookingEvents.map((ev) => {
                const badge = ev.ongoing ? '진행 중' : dday(ev.date, new Date());
                const hot = ev.ongoing || badge === 'D-DAY';
                return (
                  <div key={ev.label}
                    className={`rounded-2xl p-3.5 ${hot ? 'bg-white' : 'bg-emerald-600/40'}`}>
                    <span className={`text-[11px] font-bold ${hot ? 'text-emerald-700' : 'text-emerald-100'}`}>
                      {badge}
                    </span>
                    <p className={`mt-0.5 text-[15px] font-bold ${hot ? 'text-stone-900' : 'text-white'}`}>
                      {ev.label}
                    </p>
                    <p className={`mt-1 text-[11px] leading-relaxed ${hot ? 'text-stone-500' : 'text-emerald-100'}`}>
                      {ev.ongoing
                        ? '오늘 신청 가능'
                        : ev.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-emerald-100/80">
              공립·사립 휴양림은 운영기관에 따라 일정이 다를 수 있습니다.
            </p>
          </div>
        </section>

        {/* ── 퀵 액션 칩 ── */}
        <nav aria-label="바로가기" className="max-w-5xl mx-auto px-4 pt-4">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {QUICK_CHIPS.map((c) => (
              <a key={c.label} href={c.href}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <span className="text-xl" aria-hidden="true">{c.icon}</span>
                <span className="text-[11px] font-bold text-stone-700 text-center leading-tight">{c.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <AdUnit slot="7932374339" format="horizontal" className="mt-5" />

        {/* ── 휴양림 탐색 ── */}
        <section id="explorer" ref={explorerRef} className="max-w-5xl mx-auto px-4 pt-7">
          <h2 className="text-[19px] font-bold text-stone-900">
            어떤 숲으로 떠나볼까요?
          </h2>
          <p className="mt-1 text-[13px] text-stone-500">전국 {forests.length}곳 · 조건에 맞는 곳 {filteredForests.length}곳</p>

          <div className="mt-4 -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max pb-1">
              {Object.values(Region).map((region) => (
                <button key={region}
                  onClick={() => setSelectedRegion(region)}
                  aria-pressed={selectedRegion === region}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${selectedRegion === region
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                >
                  {region}
                  <span className="ml-1 opacity-50">{filterCounts.byRegion[region] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max pb-1">
              {Object.values(Theme).map((theme) => (
                <button key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  aria-pressed={selectedTheme === theme}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${selectedTheme === theme
                    ? 'border-emerald-700 text-emerald-700 bg-emerald-50'
                    : 'border-stone-200 text-stone-500 hover:border-stone-300'
                    }`}
                >
                  {theme}
                  <span className="ml-1 opacity-50">{filterCounts.byTheme[theme] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex rounded-full bg-stone-100 p-1">
              {([['default', '이름순'], ['popular', '인기순']] as const).map(([key, label]) => (
                <button key={key}
                  onClick={() => setSortBy(key)}
                  aria-pressed={sortBy === key}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors ${sortBy === key ? 'bg-white text-stone-900' : 'text-stone-500'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {sortBy === 'popular' && (
              <span className="text-[11px] text-stone-400">관심등록 기준 · 2023.04 국립 45곳</span>
            )}
          </div>

          {filteredForests.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-2xl" aria-hidden="true">🌲</div>
              <p className="mt-4 text-[15px] font-bold text-stone-800">조건에 맞는 휴양림이 없어요</p>
              <p className="mt-1 text-[13px] text-stone-500">검색어를 지우거나 다른 지역을 골라보세요</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedRegion(Region.ALL); setSelectedTheme(Theme.ALL); }}
                className="mt-5 px-5 py-2.5 rounded-full bg-stone-900 text-white text-[13px] font-bold"
              >
                조건 초기화
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-7">
              {filteredForests.map((forest, index) => {
                const postHref = postHrefByForest.get(normalizeName(forest.name));
                return (
                  <React.Fragment key={forest.id}>
                    <article className="group">
                      <a href={postHref ? encodeURI(postHref) : forest.bookingUrl}
                        {...(postHref ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                        className="block">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                          <img
                            src={forest.imageUrl}
                            alt={`${forest.name} 전경`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {forest.interest !== undefined && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-emerald-700">
                              관심 {forest.interest.toLocaleString('ko-KR')}
                            </span>
                          )}
                        </div>
                        <p className="mt-2.5 text-[12px] text-stone-400 font-medium truncate">{forest.location}</p>
                        <h3 className="mt-0.5 text-[15px] font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                          {forest.name}
                        </h3>
                      </a>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {forest.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                            {tag.replace('#', '')}
                          </span>
                        ))}
                      </div>
                      <a
                        href={forest.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-center py-2 rounded-xl bg-stone-900 hover:bg-emerald-700 text-white text-[12px] font-bold transition-colors"
                      >
                        예약하러 가기
                      </a>
                    </article>

                    {(index + 1) % 6 === 0 && (
                      <div className="col-span-2 lg:col-span-3 py-2">
                        <AdUnit slot="7932374339" format="auto" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </section>

        {/* ── 지도 ── */}
        <section id="map" className="max-w-5xl mx-auto px-4 pt-10">
          <h2 className="text-[19px] font-bold text-stone-900">지도에서 찾아보기</h2>
          <p className="mt-1 text-[13px] text-stone-500">
            좌표가 확인된 {mappableForests.length}곳 · 마커를 누르면 예약 페이지로 이동해요
          </p>
          <div ref={mapSectionRef} className="mt-4">
            <div
              ref={mapNodeRef}
              className="w-full h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center"
            >
              {!mapReady && <span className="text-[13px] font-bold text-stone-400">지도를 불러오는 중…</span>}
            </div>
          </div>
          <p className="mt-2 text-[11px] text-stone-400">
            지도 © OpenStreetMap 기여자 · 좌표 출처: 공공데이터포털, 산림청 산림공간정보
          </p>
        </section>

        {/* ── 간편 예약 링크 ── */}
        <section id="quick-booking" className="max-w-5xl mx-auto px-4 pt-10">
          <h2 className="text-[19px] font-bold text-stone-900">숲나들e 바로가기</h2>
          <p className="mt-1 text-[13px] text-stone-500">예약 유형을 고르면 공식 페이지로 연결됩니다</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {QUICK_BOOKING_LINKS.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <span className="text-lg" aria-hidden="true">{link.icon}</span>
                <span className="text-[13px] font-bold text-stone-800">{link.title}</span>
              </a>
            ))}
          </div>
        </section>

        <AdUnit slot="7932374339" format="horizontal" className="mt-8" />

        {/* ── 포스팅 ── */}
        <section id="posts" className="max-w-5xl mx-auto px-4 pt-10">
          <h2 className="text-[19px] font-bold text-stone-900">휴양림 이야기</h2>
          <p className="mt-1 text-[13px] text-stone-500">
            총 {POSTS.length}편 · 현재 {filteredPosts.length}편 표시 중
          </p>

          <div className="mt-4 -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max pb-1">
              {Object.values(Region).map((region) => (
                <button key={region}
                  onClick={() => setPostRegion(region)}
                  aria-pressed={postRegion === region}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${postRegion === region
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredPosts.slice(0, postsVisible).map((post) => (
              <a key={post.href} href={encodeURI(post.href)}
                className="group rounded-2xl border border-stone-200 p-4 hover:border-emerald-600 transition-colors">
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{post.region}</span>
                  <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">{post.theme}</span>
                </div>
                <h3 className="mt-2 text-[15px] font-bold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-[12px] text-stone-400">{post.location}</p>
              </a>
            ))}
          </div>

          {postsVisible < filteredPosts.length && (
            <div className="mt-5 text-center">
              <button
                onClick={() => setPostsVisible((c) => c + 24)}
                className="px-6 py-2.5 rounded-full border border-stone-300 text-[13px] font-bold text-stone-700 hover:border-stone-900 transition-colors"
              >
                더보기 ({filteredPosts.length - postsVisible})
              </button>
            </div>
          )}
        </section>

        {/* ── 체험 / 레포츠 ── */}
        <section id="experience" className="max-w-5xl mx-auto px-4 pt-10">
          <h2 className="text-[19px] font-bold text-stone-900">숲에서 더 해볼 것</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPERIENCES.map((exp, idx) => (
              <a key={idx} href={exp.link} target="_blank" rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-3xl h-44 block">
                <img src={exp.bgImage} alt={exp.title} loading="lazy" decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-xl" aria-hidden="true">{exp.icon}</span>
                  <h3 className="mt-1 text-lg font-bold">{exp.title}</h3>
                  <p className="mt-0.5 text-[12px] text-stone-200">{exp.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 예약 가이드 ── */}
        <section id="guide" className="max-w-5xl mx-auto px-4 pt-10">
          <h2 className="text-[19px] font-bold text-stone-900">처음이신가요?</h2>
          <p className="mt-1 text-[13px] text-stone-500">예약은 세 단계면 끝납니다</p>
          <ol className="mt-4 space-y-2">
            {RESERVATION_STEPS.map((step) => (
              <li key={step.step} className="flex gap-3.5 items-start p-4 rounded-2xl bg-stone-50">
                <span className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-base" aria-hidden="true">
                  {step.icon}
                </span>
                <div>
                  <p className="text-[14px] font-bold text-stone-900">{step.title}</p>
                  <p className="mt-0.5 text-[12px] text-stone-500 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer"
            className="mt-4 block text-center py-3.5 rounded-2xl bg-stone-900 hover:bg-emerald-700 text-white text-[14px] font-bold transition-colors">
            숲나들e 공식 홈페이지 열기
          </a>
        </section>

        <AdUnit slot="7932374339" className="mt-10" />
      </main>

      {/* ── 푸터 ── */}
      <footer className="mt-10 border-t border-stone-100 bg-stone-50 pb-24 md:pb-10 pt-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1.5">
            <span className="text-lg" aria-hidden="true">🌲</span>
            <span className="text-base font-bold text-emerald-700">숲으로</span>
          </div>
          <p className="mt-3 max-w-xl text-[12px] text-stone-500 leading-relaxed">
            「숲으로」는 전국 자연휴양림 정보를 모아 안내하는 민간 사이트입니다. 산림청 및 숲나들e와 관련이 없으며,
            예약·결제와 법적 고지는 숲나들e 공식 홈페이지를 따릅니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold text-stone-700">
            <a href="#explorer" className="hover:text-emerald-700">휴양림 전체</a>
            <a href="#map" className="hover:text-emerald-700">지도</a>
            <a href="/ranking.html" className="hover:text-emerald-700">인기순위</a>
            <a href="/privacy.html" className="hover:text-emerald-700">개인정보처리방침</a>
            <a href="https://www.foresttrip.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">공식사이트</a>
          </div>
          <div className="mt-6 pt-5 border-t border-stone-200 text-[11px] text-stone-400 leading-relaxed">
            <p>범키드 · 대표 김낙원 · 사업자등록번호 770-51-00533</p>
            <p className="mt-1">© 2026 숲으로. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── 모바일 하단 탭바 ── */}
      <nav aria-label="주요 메뉴"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {[
            { href: '#explorer', label: '휴양림', d: 'M12 3l8 7h-2v9H6v-9H4l8-7z' },
            { href: '#map', label: '지도', d: 'M9 20l-6 2V6l6-2m0 16l6-2m-6 2V4m6 14l6 2V6l-6-2m0 14V4' },
            { href: '/ranking.html', label: '순위', d: 'M3 17l6-6 4 4 8-8' },
            { href: '#posts', label: '이야기', d: 'M4 5h16v14H4zM8 9h8M8 13h5' }
          ].map((t) => (
            <a key={t.label} href={t.href}
              className="flex flex-col items-center gap-0.5 py-2.5 text-stone-500 hover:text-emerald-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={t.d} />
              </svg>
              <span className="text-[10px] font-bold">{t.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
