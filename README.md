<div align="center">

# 🌏 Tekvent

**글로벌 AI · 블록체인 컨퍼런스 일정을 Notion 스타일로**

캘린더 뷰와 테이블 뷰를 원클릭으로 전환하며 행사를 탐색하세요.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://tmuchal.github.io/Tekvent/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📅 **캘린더 뷰** | Notion 캘린더처럼 월별 행사 일정을 한눈에 |
| 📊 **테이블 뷰** | 행사명·날짜·장소·규모를 정렬 가능한 테이블로 |
| 🔀 **뷰 전환** | 캘린더 ↔ 테이블 원클릭 전환 + 부드러운 애니메이션 |
| 🔍 **통합 검색** | 행사명·장소·태그 실시간 검색 (300ms 디바운스) |
| 🏷️ **카테고리 필터** | Blockchain / AI / FinTech / Developer 필터 |
| 🔖 **태그 다중 필터** | Web3, DeFi, NFT, Hackathon 등 태그 복수 선택 |
| 🗂️ **행사 상세 모달** | 클릭 시 Notion side-peek 스타일 상세 패널 |
| 🦕 **이스터에그** | 픽셀 공룡 🦕이 캘린더 위를 뛰어다님 (토글 가능) |
| 📱 **반응형** | 모바일에서 카드 리스트로 자동 전환 |

---

## 🗓 수록 행사 (2026)

| 이모지 | 행사명 | 장소 | 날짜 | 카테고리 |
|--------|--------|------|------|----------|
| 🟢 | [NVIDIA GTC 2026](https://www.nvidia.com/en-us/gtc/) | San Jose, USA | 3.16–3.19 | AI |
| 🏮 | [Hong Kong Web3 Festival](https://web3festival.org) | Hong Kong | 4.06–4.09 | Blockchain |
| 🗾 | [ETHGlobal Tokyo](https://ethglobal.com/events/tokyo) | Tokyo, Japan | 4.18–4.20 | Developer |
| 🏙️ | [TOKEN2049 Dubai](https://www.token2049.com) | Dubai, UAE | 4.28–4.29 | Blockchain |
| 🗽 | [NFT.NYC 2026](https://www.nft.nyc) | New York, USA | 4.13–4.15 | Blockchain |
| 🌐 | [Consensus 2026](https://consensus.coindesk.com) | Austin, USA | 5.11–5.13 | Blockchain |
| 🔵 | [Google I/O 2026](https://io.google) | Mountain View, USA | 5.18–5.20 | AI |
| 🎡 | [AI Summit London](https://theaisummit.com/london) | London, UK | 6.10–6.11 | AI |
| 🏔️ | [DeFi Summit 2026](https://defisummit.com) | Zurich, Switzerland | 6.22–6.23 | Blockchain |
| 🗼 | [EthCC 2026](https://ethcc.io) | Paris, France | 7.06–7.10 | Developer |
| ₿ | [Bitcoin Conference 2026](https://b.tc/conference) | Nashville, USA | 7.22–7.24 | Blockchain |
| 🐻 | [Web3 Summit Berlin](https://web3summit.com) | Berlin, Germany | 8.24–8.26 | Blockchain |
| 🇰🇷 | [Korea Blockchain Week](https://koreablockchainweek.com) | Seoul, Korea | 9.07–9.13 | Blockchain |
| 🦁 | [TOKEN2049 Singapore](https://www.token2049.com/singapore) | Singapore | 9.15–9.16 | Blockchain |
| ◎ | [Solana Breakpoint](https://solana.com/breakpoint) | Amsterdam, NL | 9.19–9.21 | Blockchain |
| 🌉 | [ETHGlobal San Francisco](https://ethglobal.com) | San Francisco, USA | 10.16–10.18 | Developer |
| 🌍 | [Web Summit 2026](https://websummit.com) | Lisbon, Portugal | 11.02–11.05 | Blockchain |
| 🐘 | [Devcon 8](https://devcon.org) | Bangkok, Thailand | 11.09–11.13 | Developer |
| 🏦 | [Singapore FinTech Festival](https://www.fintechfestival.sg) | Singapore | 11.09–11.11 | FinTech |
| 🕌 | [India Blockchain Week](https://indiablockchainweek.com) | Bangalore, India | 12.07–12.13 | Blockchain |

---

## 🚀 로컬 실행

```bash
git clone https://github.com/tmuchal/Tekvent.git
cd Tekvent
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## ➕ 행사 추가하기

`src/data/events.ts`의 `EVENTS` 배열에 아래 형태로 추가:

```ts
{
  id: 'my-event-2026',           // 고유 ID
  name: 'My Conference 2026',    // 행사명
  location: '서울, 대한민국',    // 장소 (비어있으면 🌐 온라인으로 표시)
  startDate: '2026-09-01',       // 시작일 (YYYY-MM-DD)
  endDate: '2026-09-03',         // 종료일
  color: '#4f6ef7',              // 행사 대표 색상 (hex)
  url: 'https://example.com',    // 공식 사이트
  emoji: '🎯',                   // 대표 이모지
  description: '행사 설명...',   // 상세 설명
  tags: ['Web3', 'Korea'],       // 태그 배열
  attendees: '1,000+',           // 예상 참가자 수
  ticketPrice: '유료',           // 유료 또는 무료
}
```

**카테고리 자동 분류** (`tags` 기반):
- **AI**: `AI`, `AGI`, `MachineLearning`
- **FinTech**: `FinTech`, `CBDC`
- **Developer**: `Developer`, `Hackathon`
- **Blockchain**: 그 외 모든 태그

---

## 🛠 기술 스택

- **React 19** + **TypeScript** — UI 및 타입 안전성
- **Vite** — 빠른 번들러
- **Tailwind CSS v4** — 스타일링
- **Zustand** — 전역 상태관리
- **date-fns** — 날짜 계산
- **Framer Motion** — 애니메이션
- **lucide-react** — 아이콘

---

## 📂 프로젝트 구조

```
src/
├── components/
│   ├── layout/         # Header, Toolbar
│   ├── views/          # CalendarView, TableView
│   ├── ui/             # ViewToggle, CategoryFilter, SearchBar, TagFilter, DdayBadge
│   ├── fun/            # TRex 🦕 이스터에그
│   └── EventModal.tsx  # 행사 상세 모달
├── store/              # Zustand 전역 스토어
├── types/              # TypeScript 타입 정의
├── lib/                # 날짜 유틸리티
└── data/               # 행사 데이터
```

---

## 🗺 로드맵

- [ ] 다크모드
- [ ] Google Calendar `.ics` 내보내기
- [ ] 행사 제보 폼 (GitHub Issues 연동)
- [ ] Supabase 연동 실시간 데이터
- [ ] 알림 구독
- [ ] AI 행사 데이터 추가 확충

---

<div align="center">

MIT License · Made with 🦕 by [@tmuchal](https://github.com/tmuchal)

</div>
