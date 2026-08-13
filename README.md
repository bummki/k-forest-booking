# 🌲 숲으로 (k-forest-booking)

전국 자연휴양림 정보를 한눈에 확인하고 [숲나들e](https://www.foresttrip.go.kr) 예약 페이지로 바로 이동할 수 있는 민간 안내 사이트 「숲으로」입니다.
운영 주소: <https://forest.onnuriinfo.com>

## ✨ 주요 기능

- **전국 휴양림 목록**: 이름·주소·연락처·휴무일을 카드 형태로 제공
- **실시간 검색**: 휴양림 이름 또는 지역명으로 즉시 검색
- **지역 / 테마 필터**: 강원·경기/수도권·충청·전라·경상·제주 및 깊은숲·바다·계곡·도심 테마별 분류
- **휴양림 포스팅 178편**: 정적 HTML로 사전 생성되어 검색엔진에 그대로 노출
- **공공데이터 연동**: 공공데이터포털 Open API를 우선 사용하고 실패 시 로컬 데이터로 자동 폴백
- **반응형 디자인**: PC·모바일 모두 대응

## 🛠 기술 스택

- **React 19 + TypeScript**
- **Vite 6** (번들러 / 개발 서버)
- **Tailwind CSS 3** (PostCSS 빌드, CDN 미사용)
- 이미지: WebP (최대 폭 1200px, quality 80)

## 🚀 실행 방법

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 🔑 환경 변수

`.env.example`를 `.env`로 복사한 뒤 값을 채웁니다.

| 변수 | 설명 |
| --- | --- |
| `VITE_PUBLIC_DATA_API_KEY` | 공공데이터포털 전국휴양림표준데이터 서비스키. 미설정 시 `forest_data.js` 로컬 데이터 사용 |

> `VITE_` 접두사 값은 클라이언트 번들에 그대로 포함됩니다. 비공개 키는 절대 넣지 마세요.

## 📁 구조

```
App.tsx              메인 페이지 (전 섹션)
constants.tsx        데이터 매핑 · 퀵링크 · 가이드 상수
forest_data.js       휴양림 원본 데이터 (로컬 폴백)
forestApi.ts         공공데이터포털 API 클라이언트
posts.ts             포스팅 목록 (제목 · 경로)
public/posts/        포스팅 정적 HTML 178편
public/img/          포스팅 이미지 (WebP)
public/images/       카드 · 배너 이미지 (WebP)
public/sitemap.xml   사이트맵 (자동 생성물)
vercel.json          캐시 · 보안 헤더
```

## 📝 배포

Vercel에 연결되어 있으며 `main` 브랜치 푸시 시 자동 배포됩니다.
포스팅을 추가할 때는 `public/posts/`에 HTML을 넣고 `posts.ts`와 `public/sitemap.xml`에 항목을 추가하세요.

---

*「숲으로」는 공공데이터를 기반으로 제작된 민간 안내 사이트이며, 산림청 및 숲나들e와 관련이 없습니다. 예약 및 법적 고지는 공식 홈페이지를 따릅니다.*
