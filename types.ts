
export enum Region {
  ALL = '전체',
  GYEONGGI = '경기/수도권',
  GANGWON = '강원',
  CHUNGCHEONG = '충청',
  JEOLLA = '전라',
  GYEONGSANG = '경상',
  JEJU = '제주'
}

export interface Forest {
  id: string;
  name: string;
  region: Region;
  location: string;
  description: string;
  tags: string[];
  imageUrl: string;
  bookingUrl: string;
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
