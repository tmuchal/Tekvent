<p align="center">
  <img src="assets/dino.svg" width="64" alt="dino mascot"/>
</p>

<h1 align="center">🦖 dino-events</h1>

<p align="center">
  <strong>아시아 AI · 블록체인 대형 행사 캘린더</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/events-2-4ADE80?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRleHQgeD0iNCIgeT0iMTIiIGZvbnQtc2l6ZT0iMTIiPvCfppY8L3RleHQ+PC9zdmc+" alt="Total Events"/>
  <img src="https://img.shields.io/badge/updated-2026--03-blue?style=flat-square" alt="Last Updated"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License: MIT"/>
</p>

<p align="center">
  캘린더 구독 · JSON 데이터 · 오픈소스<br/>
  누구나 Fork해서 가져가고, PR로 행사를 추가할 수 있습니다.
</p>

---

| 📅 캘린더 구독 | 📦 JSON 데이터 | 🤝 행사 추가 |
|---|---|---|
| [구글 캘린더에 추가](https://calendar.google.com/calendar/r?cid=webcal://raw.githubusercontent.com/tmuchal/Tekvent/main/calendar.ics) | [events.json 보기](./events.json) | [기여 가이드](#-contributing) |
| [ICS 다운로드](./calendar.ics) | [Raw JSON](https://raw.githubusercontent.com/tmuchal/Tekvent/main/events.json) | [이슈 등록](https://github.com/tmuchal/Tekvent/issues) |

---

<p align="center">
🇸🇬 <a href="#-singapore">Singapore</a> · 🇰🇷 <a href="#-south-korea">South Korea</a> · 🇯🇵 <a href="#-japan">Japan</a> · 🇭🇰 <a href="#-hong-kong">Hong Kong</a> · 🇹🇼 <a href="#-taiwan">Taiwan</a> · 🇹🇭 <a href="#-thailand">Thailand</a> · 🇮🇳 <a href="#-india">India</a> · 🇦🇪 <a href="#-uae">UAE</a>
</p>

---

<!-- EVENTS_START -->
## 🇸🇬 Singapore

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

## 🇰🇷 South Korea

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

## 🇯🇵 Japan

| 행사 | 날짜 | 카테고리 | 설명 |
|------|------|----------|------|
| [ETHGlobal Tokyo](https://ethglobal.com) | Sep 15 – 17, 2026 ⚠️ | `blockchain` | World's largest Ethereum hackathon series comes to Tokyo |

## 🇭🇰 Hong Kong

| 행사 | 날짜 | 카테고리 | 설명 |
|------|------|----------|------|
| [RISE Conference Hong Kong](https://riseconf.com) | Mar 17 – 19, 2026 | `both` | Asia's largest tech conference covering AI, blockchain, and startups |

## 🇹🇼 Taiwan

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

## 🇹🇭 Thailand

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

## 🇮🇳 India

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

## 🇦🇪 UAE

_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_

> ⚠️ = 날짜 미확정 (unconfirmed)
<!-- EVENTS_END -->

---

<!-- TIMELINE_START -->
## 📅 타임라인

```
2026
├── Mar  RISE Conference Hong Kong 🇭🇰
└── Sep  ETHGlobal Tokyo 🇯🇵
```
<!-- TIMELINE_END -->

---

## 📦 데이터 사용하기

### JSON으로 가져가기

```bash
curl -s https://raw.githubusercontent.com/tmuchal/Tekvent/main/events.json
```

### JavaScript / TypeScript

```javascript
const response = await fetch(
  'https://raw.githubusercontent.com/tmuchal/Tekvent/main/events.json'
);
const events = await response.json();

// 블록체인 행사만 필터
const blockchain = events.filter(e => e.category === 'blockchain');

// 한국 행사만
const korea = events.filter(e => e.country.includes('Korea'));
```

### Python

```python
import requests

events = requests.get(
    'https://raw.githubusercontent.com/tmuchal/Tekvent/main/events.json'
).json()

# 다가오는 행사만
upcoming = [e for e in events if e['date_start'] >= '2025-03-01']
```

### 캘린더 구독

구글 캘린더에서 "URL로 캘린더 추가":

```
https://raw.githubusercontent.com/tmuchal/Tekvent/main/calendar.ics
```

---

## 📋 데이터 스키마

```typescript
interface Event {
  name: string;          // 행사명
  category: 'ai' | 'blockchain' | 'both';
  date_start: string;    // YYYY-MM-DD
  date_end: string;      // YYYY-MM-DD
  country: string;       // 국기 + 나라명
  city: string;
  url: string;           // 공식 사이트
  description: string;
  tags: string[];
  confirmed: boolean;    // 날짜 확정 여부
}
```

---

## 🤝 Contributing

### 행사 추가하기

1. 이 레포를 **Fork**
2. `events.json`에 행사 추가
3. **PR** 보내기

### 규칙

- 아시아 개최 행사만
- 참가자 500명 이상 대형 행사
- 공식 URL 필수
- 날짜 미확정 시 `confirmed: false`

### 행사 수정/삭제

이슈를 등록하거나, 직접 PR 보내주세요.

---

<p align="center">
  <img src="assets/dino.svg" width="32" alt="dino mascot"/><br/>
  Built with 🦖 by the community<br/>
  <a href="./LICENSE">MIT License</a>
</p>
