
export enum Region {
  ALL = '전체',
  GYEONGGI = '경기/수도권',
  GANGWON = '강원',
  CHUNGCHEONG = '충청',
  JEOLLA = '전라',
  GYEONGSANG = '경상',
  JEJU = '제주'
}

export enum Theme {
  ALL = '모든 테마',
  MOUNTAIN = '깊은숲·산',
  OCEAN = '바다·섬',
  VALLEY = '계곡·수변',
  CITY = '도심인근'
}
export interface Forest {
  id: string;
  name: string;
  region: Region;
  theme: Theme;
  location: string;
  description: string;
  tags: string[];
  imageUrl: string;
  bookingUrl: string;
  isAd?: boolean;
  fee?: string;
  capacity?: string;
  lat?: number;
  lng?: number;
}

export interface ReservationStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface QuickLink {
  title: string;
  url: string;
  icon: string;
  color: string;
}

export interface ExperienceSection {
  title: string;
  description: string;
  link: string;
  icon: string;
  bgImage: string;
}
