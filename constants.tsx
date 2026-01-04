
import { Region, Forest, ReservationStep, QuickLink, ExperienceSection } from './types';

// forest_data.js의 원시 데이터를 기반으로 한 FOREST_RAW_DATA 정의를 상단에 배치하거나 
// 실제 프로젝트 환경에 따라 별도 파일에서 가져오는 것이 좋으나, 
// 여기서는 직접 매핑 로직을 구현합니다.

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
    bgImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: '산림 레포츠',
    description: '도전과 힐링! 자연에서 즐기는 색다른 체험을 즐겨보세요.',
    link: 'https://www.foresttrip.go.kr/mnfrsLeportsMain.do',
    icon: '🚵',
    bgImage: 'https://onnuriinfo.com/wp-content/uploads/2025/12/Cypress-Trunks-Perspective.png'
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

// forest_data.js의 데이터를 직접 삽입하거나 가져오는 로직이 필요합니다.
// 여기서는 forest_data.js의 내용을 기반으로 FORESTS 상수를 생성합니다.

import forestDataRaw from './forest_data.js';

const getRegionFromAddress = (address: string): Region => {
  if (!address) return Region.GYEONGSANG;
  if (address.includes('경기') || address.includes('인천') || address.includes('서울')) return Region.GYEONGGI;
  if (address.includes('강원')) return Region.GANGWON;
  if (address.includes('충남') || address.includes('충북') || address.includes('대전') || address.includes('세종')) return Region.CHUNGCHEONG;
  if (address.includes('전남') || address.includes('전북') || address.includes('광주')) return Region.JEOLLA;
  if (address.includes('경남') || address.includes('경북') || address.includes('부산') || address.includes('대구') || address.includes('울산')) return Region.GYEONGSANG;
  if (address.includes('제주')) return Region.JEJU;
  return Region.GYEONGSANG; // 기본값
};

const getLocationFromAddress = (address: string): string => {
  if (!address) return '전국';
  const parts = address.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return address;
};

// forestDataRaw가 배열인지 확인하고, 아닐 경우 빈 배열로 처리하여 초기화 오류 방지
const rawList = Array.isArray(forestDataRaw) ? forestDataRaw : [];

export const FORESTS: Forest[] = rawList.map((f, index) => {
  const address = f.address || '';
  const name = f.name || `휴양림 ${index}`;
  const region = getRegionFromAddress(address);
  const location = getLocationFromAddress(address);
  const tags = [
    `#${location.split(' ')[1] || location}`,
    f.closed ? `#${f.closed}` : '#예약가능'
  ];

  return {
    id: f.id || `forest_${index}`,
    name: name,
    region: region,
    location: location,
    description: `${address}. ${f.phone || ''}. ${f.closed ? `휴무: ${f.closed}.` : ''}`,
    tags: tags,
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`,
    bookingUrl: f.url || 'https://www.foresttrip.go.kr/',
    isAd: !!f.isAd
  };
});
