# Tekvent — AI · Blockchain Conference Calendar

## 프로젝트 개요
- Notion 스타일의 캘린더 뷰 / 테이블 뷰를 탭 클릭으로 전환하는 웹 서비스
- 글로벌 AI · 블록체인 컨퍼런스 정보를 한곳에 모아서 보여줌
- GitHub Pages 배포 예정

## 기술 스택
- Vite + React 19 + TypeScript
- Tailwind CSS v4
- zustand (상태관리)
- date-fns (날짜 계산)
- lucide-react (아이콘)
- framer-motion (애니메이션)
- gh-pages (배포)

## 디렉토리 구조
src/
├── components/
│   ├── layout/        # Header, Toolbar
│   ├── views/         # CalendarView, TableView
│   ├── ui/            # ViewToggle, CategoryFilter, SearchBar, TagFilter, DdayBadge
│   ├── fun/           # TRex, TRexToggle (이스터에그)
│   └── EventModal.tsx
├── store/             # zustand store (useEventStore)
├── types/             # TypeScript 타입 (event.ts)
├── lib/               # 유틸리티 (dateUtils.ts)
├── data/              # 행사 데이터 (events.ts)
├── App.tsx
└── main.tsx

## 코딩 컨벤션
- 컴포넌트: arrow function + export default
- Tailwind만 사용, CSS 파일 금지 (index.css는 @import "tailwindcss" 한 줄만)
- 모든 prop에 TypeScript 타입 명시

## 행사 추가 방법
src/data/events.ts의 EVENTS 배열에 BlockchainEvent 형태로 추가:
```ts
{
  id: 'unique-id',
  name: '행사명',
  location: '도시, 국가',
  startDate: 'YYYY-MM-DD',
  endDate: 'YYYY-MM-DD',
  color: '#hex색상',
  url: 'https://...',
  emoji: '🎯',
  description: '설명',
  tags: ['태그1', '태그2'],
  attendees: '1,000+',
  ticketPrice: '유료 또는 무료',
}
```

## 카테고리 자동 분류
tags에 따라 자동 분류됨 (getEventCategory 함수):
- AI: 'AI', 'AGI', 'MachineLearning', 'LLM', 'DeepLearning'
- FinTech: 'FinTech', 'CBDC', 'Banking', 'Finance', 'Payments'
- Developer: 'Developer', 'Hackathon', 'DevCon', 'Engineering'
- Blockchain: 그 외 모든 것
