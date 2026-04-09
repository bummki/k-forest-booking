import { Region, Theme, Forest, ReservationStep, QuickLink, ExperienceSection } from './types';
import forestDataRaw from './forest_data.js';

type ForestSource = Record<string, unknown>;

const FALLBACK_BOOKING_URL = 'https://www.foresttrip.go.kr/';

const FOREST_IMAGES = [
  '/images/forest-01.png',
  '/images/forest-02.png',
  '/images/forest-03.png',
  '/images/forest-04.png',
  '/images/forest-05.png',
  '/images/forest-06.png',
  '/images/forest-07.png',
  '/images/forest-08.png',
  '/images/forest-09.png',
  '/images/forest-10.png',
  '/images/forest-11.png',
  '/images/forest-12.png'
];

const firstString = (source: ForestSource, keys: string[]): string => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim();
    }
  }
  return '';
};

const sanitizeUrl = (url: string): string => {
  if (!url) return FALLBACK_BOOKING_URL;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return FALLBACK_BOOKING_URL;
};

export const QUICK_BOOKING_LINKS: QuickLink[] = [
  { title: '월별예약', url: 'https://www.foresttrip.go.kr/rep/or/sssn/monthRsrvtSmplStatus.do', icon: '🗓️', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { title: '추첨신청', url: 'https://www.foresttrip.go.kr/rep/drlts/drltsUseGdnc.do?hmpgId=FRIP&menuId=001003004', icon: '🎰', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { title: '우선예약', url: 'https://www.foresttrip.go.kr/rep/cndtl/cndtlRsrvtMain.do?type=Main&infoFlag=Main&hmpgId=FRIP&menuId=001002001', icon: '🌟', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { title: '일반예약', url: 'https://www.foresttrip.go.kr/rep/or/sssn/fcfsRsrvtSmplPssblGoodsDetls.do', icon: '🌲', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { title: '프로그램/부대시설', url: 'https://www.foresttrip.go.kr/rep/or/sssn/initPrgrmRsrvt.do?hmpgId=FRIP&menuId=001005', icon: '🎾', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { title: '숲나들e 바로가기', url: 'https://www.foresttrip.go.kr/main.do?hmpgId=FRIP', icon: '🔗', color: 'bg-stone-50 text-stone-700 border-stone-100' },
];

export const EXPERIENCES: ExperienceSection[] = [
  {
    title: '아름다운 숲길',
    description: '자연과 사람이 함께하는 숲길을 느껴보세요.',
    link: 'https://www.foresttrip.go.kr/frtrlMain.do',
    icon: '🥾',
    bgImage: '/images/forest-05.png'
  },
  {
    title: '산림 레포츠',
    description: '도전과 힐링! 자연에서 즐기는 색다른 체험을 즐겨보세요.',
    link: 'https://www.foresttrip.go.kr/mnfrsLeportsMain.do',
    icon: '🚵',
    bgImage: '/images/forest-10.png'
  }
];

export const RESERVATION_STEPS: ReservationStep[] = [
  {
    step: 1,
    title: '숲나들e 회원가입 및 로그인',
    description: '편리한 예약을 위해 먼저 회원가입을 진행해 주세요.',
    icon: '👤'
  },
  {
    step: 2,
    title: '휴양림 및 날짜 선택',
    description: '원하는 휴양림의 숙박 시설과 날짜를 자유롭게 선택합니다.',
    icon: '📅'
  },
  {
    step: 3,
    title: '예약 신청 및 결제',
    description: '신청 후 결제를 완료하면 예약이 확정됩니다.',
    icon: '💳'
  }
];

export const getRegionFromAddress = (address: string): Region => {
  if (!address) return Region.GYEONGSANG;
  if (address.includes('경기') || address.includes('인천') || address.includes('서울')) return Region.GYEONGGI;
  if (address.includes('강원')) return Region.GANGWON;
  if (address.includes('충남') || address.includes('충북') || address.includes('대전') || address.includes('세종')) return Region.CHUNGCHEONG;
  if (address.includes('전남') || address.includes('전북') || address.includes('광주')) return Region.JEOLLA;
  if (address.includes('경남') || address.includes('경북') || address.includes('부산') || address.includes('대구') || address.includes('울산')) return Region.GYEONGSANG;
  if (address.includes('제주')) return Region.JEJU;
  return Region.GYEONGSANG;
};

export const getLocationFromAddress = (address: string): string => {
  if (!address) return '전국';
  const parts = address.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return address;
};

export const getThemeFromNameAndAddress = (name: string, address: string): Theme => {
  const n = name || '';
  const a = address || '';
  if (n.includes('신시도') || n.includes('안면도') || n.includes('석모도') || n.includes('섬') || n.includes('해안') || n.includes('바다') || a.match(/변산|진도|완도|보령/)) return Theme.OCEAN;
  if (n.includes('계곡') || n.includes('청평') || n.includes('소선암') || n.includes('호반') || n.includes('수변')) return Theme.VALLEY;
  if (n.includes('수락산') || n.includes('용인') || a.match(/서울|부산|도심|도시/)) return Theme.CITY;
  return Theme.MOUNTAIN;
};

export const mapForestSourceToForest = (item: ForestSource, index: number): Forest => {
  const address = firstString(item, ['address', 'rdnmadr']);
  const name = firstString(item, ['name', 'rcrfrstNm']) || `휴양림 ${index + 1}`;
  const phone = firstString(item, ['phone', 'telephoneNumber']);
  const closed = firstString(item, ['closed']);
  const homepage = firstString(item, ['url', 'homepageUrl']);
  const institution = firstString(item, ['institutionNm']);
  const mainFacility = firstString(item, ['mainFcltyNm']);
  const stayYn = firstString(item, ['stayngPosblYn']);
  const id = firstString(item, ['id']) || `forest_${index}`;

  const region = getRegionFromAddress(address);
  const theme = getThemeFromNameAndAddress(name, address);
  const location = getLocationFromAddress(address);
  const stayTag = stayYn === 'Y' ? '#숙박가능' : stayYn === 'N' ? '#숙박불가' : '#정보확인';

  const descriptionParts = [
    address,
    phone ? `문의: ${phone}` : '',
    institution ? `관리기관: ${institution}` : '',
    mainFacility ? `주요시설: ${mainFacility}` : '',
    closed ? `휴무: ${closed}` : ''
  ].filter(Boolean);

  return {
    id,
    name,
    region,
    theme,
    location,
    description: descriptionParts.join(' · '),
    tags: [
      `#${location.split(' ')[1] || location}`,
      stayTag,
      theme !== Theme.ALL ? `#${theme}` : ''
    ].filter(Boolean),
    imageUrl: FOREST_IMAGES[index % FOREST_IMAGES.length],
    bookingUrl: sanitizeUrl(homepage),
    isAd: false
  };
};

const rawList = Array.isArray(forestDataRaw) ? forestDataRaw : [];

export const FORESTS: Forest[] = rawList.map((item, index) => {
  const source = item as ForestSource;
  return mapForestSourceToForest(source, index);
});
