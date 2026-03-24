<p align="center">
  <img src="public/penguin.svg" width="80" alt="Tekvent mascot — baby penguin"/>
</p>

<h1 align="center">🐧 Tekvent</h1>

<p align="center">
  <strong>아시아 · 중동 AI & 블록체인 행사 캘린더</strong><br/>
  <sub>Asia & Middle East AI · Blockchain Events Calendar</sub>
</p>

<p align="center">
  <a href="https://tmuchal.github.io/Tekvent/"><strong>🌐 tmuchal.github.io/Tekvent</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/events-29-blue?style=flat-square" alt="events"/>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/></a>
  <a href="https://github.com/tmuchal/Tekvent/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"/></a>
</p>

아시아·중동의 주요 AI·블록체인 행사를 모아두는 오픈소스 캘린더입니다.

## 📋 데이터

| | 링크 |
|---|---|
| 📋 Events JSON | [raw.githubusercontent.com/.../events.json](https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/events.json) |
| 📆 iCal 구독 | [raw.githubusercontent.com/.../calendar.ics](https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/calendar.ics) |
| 🤝 기여하기 | [CONTRIBUTING.md](CONTRIBUTING.md) |

## 🗓️ 2026 주요 행사

| 날짜 | 행사 | 장소 | 분류 |
|------|------|------|------|
| Apr 7–8 | [Dubai AI Festival 2026](https://dubaiaifestival.com/) | 🇦🇪 Dubai | AI |
| Apr 7–8 | [TEAMZ Summit 2026](https://www.teamz.co.jp/) | 🇯🇵 Tokyo | Blockchain |
| Apr 9 | [GITEX AI Asia 2026](https://gitexasia.com/) | 🇸🇬 Singapore | AI |
| Apr 15–18 | [NexTech Week Tokyo](https://www.nextech-week.jp/hub/en-gb.html) | 🇯🇵 Tokyo | AI |
| Apr 16–17 | [BUIDL Asia 2026](https://www.buidl.asia/) | 🇸🇬 Singapore | Blockchain |
| Apr 20–23 | [HK Web3 Festival 2026](https://www.web3festival.org/) | 🇭🇰 Hong Kong | Blockchain |
| May 8–9 | [Conviction 2026](https://conviction.events/) | 🇸🇬 Singapore | Blockchain |
| May 20–21 | [SEABW 2026](https://seablockchainweek.org/) | 🇹🇭 Bangkok | Blockchain |
| Jun 10–11 | [SuperAI 2026](https://superai.com/) | 🇸🇬 Singapore | AI |
| Jul 13–14 | [WebX 2026](https://webx-asia.com/) | 🇯🇵 Tokyo | Blockchain |
| Aug 1–2 | [Asia Blockchain Summit](https://abs.io/) | 🇹🇼 Taipei | Blockchain |
| Aug 20–21 | [Coinfest Asia 2026](https://coinfest.asia/) | 🇮🇩 Bali | Blockchain |
| Sep 19 | [ETHTokyo 2026](https://www.ethtokyo.org/) | 🇯🇵 Tokyo | Blockchain |
| Sep 25–27 | [ETHGlobal Tokyo 2026](https://ethglobal.com/events/tokyo2026) | 🇯🇵 Tokyo | Blockchain |
| Sep 29–Oct 2 | [KBW 2026](https://koreablockchainweek.com/) | 🇰🇷 Seoul | Blockchain |
| Oct 7–8 | [TOKEN2049 Singapore](https://www.token2049.com/singapore) | 🇸🇬 Singapore | Blockchain |
| Nov 3–6 | [Devcon 8 Mumbai](https://devcon.org/) | 🇮🇳 Mumbai | Blockchain |
| Nov 6–7 | [ETHGlobal Mumbai](https://ethglobal.com/events/mumbai) | 🇮🇳 Mumbai | Blockchain |
| Dec 1–2 | [Blockchain Life 2026](https://blockchain-life.com/) | 🇹🇭 Bangkok | Blockchain |
| Dec 7–11 | [GITEX Global 2026](https://www.gitex.com/) | 🇦🇪 Dubai | AI |

## 💻 데이터 사용

**curl:**
```bash
curl https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/events.json
```

**JavaScript:**
```js
const res = await fetch('https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/events.json')
const events = await res.json()
```

**Python:**
```python
import requests
events = requests.get('https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/events.json').json()
```

## 🤝 기여하기

1. 이 레포 Fork
2. `public/events.json` 수정 — 행사 추가 또는 수정
3. PR 오픈

스키마는 [CONTRIBUTING.md](CONTRIBUTING.md) 참고.

## 📄 License

MIT — [LICENSE](LICENSE)

---

<p align="center">
  <img src="public/penguin.svg" width="32" alt="Tekvent mascot"/>
  <br/>
  <sub>Built with 🐧 by tmuchal</sub>
</p>
