<p align="center">
  <img src="public/penguin.svg" width="80" alt="Tekvent mascot — baby penguin"/>
</p>

<h1 align="center">🐧 Tekvent</h1>

<p align="center">
  <strong>Asia AI & Blockchain Events Calendar</strong>
</p>

<p align="center">
  <a href="https://tmuchal.github.io/Tekvent"><img src="https://img.shields.io/badge/events-29-blue?style=flat-square" alt="events"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/></a>
  <a href="https://github.com/tmuchal/Tekvent/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"/></a>
</p>

> 🌏 **Live site:** [https://tmuchal.github.io/Tekvent](https://tmuchal.github.io/Tekvent)

Curated, open-source calendar of major AI and blockchain events across Asia and the Middle East. No ads, no paywalls — just clean data you can fork and use.

## 🗓️ Quick Links

| | Link |
|---|---|
| 📅 Live Calendar | [tmuchal.github.io/Tekvent](https://tmuchal.github.io/Tekvent) |
| 📋 Events JSON | [public/events.json](https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/events.json) |
| 📆 Subscribe (iCal) | [public/calendar.ics](https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/calendar.ics) |
| 🤝 Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |

## 🌏 Featured Events

| Date | Event | Location | Category |
|------|-------|----------|----------|
| Apr 20–23, 2026 | [HK Web3 Festival 2026](https://www.web3festival.org/) | 🇭🇰 Hong Kong | Blockchain |
| Jun 10–11, 2026 | [SuperAI 2026](https://superai.com/) | 🇸🇬 Singapore | AI |
| Sep 25–27, 2026 | [ETHGlobal Tokyo 2026](https://ethglobal.com/events/tokyo2026) | 🇯🇵 Tokyo | Blockchain |
| Oct 7–8, 2026 | [TOKEN2049 Singapore](https://www.token2049.com/singapore) | 🇸🇬 Singapore | Blockchain |
| Nov 3–6, 2026 | [Devcon 8 Mumbai](https://devcon.org/) | 🇮🇳 Mumbai | Blockchain |

## 💻 Use the Data

**curl:**
```bash
curl https://tmuchal.github.io/Tekvent/events.json
```

**JavaScript:**
```js
const res = await fetch('https://tmuchal.github.io/Tekvent/events.json')
const events = await res.json()
```

**Python:**
```python
import requests
events = requests.get('https://tmuchal.github.io/Tekvent/events.json').json()
```

**iCal subscribe URL:**
```
https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/calendar.ics
```

## 🏗️ Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Deployment | GitHub Pages |
| Calendar | ical-generator |

## 🤝 Contributing

1. Fork this repo
2. Edit `public/events.json` — add or fix an event
3. Open a PR with a brief description

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full JSON schema.

## 📄 License

MIT — see [LICENSE](LICENSE)

---

<p align="center">
  <img src="public/bear.svg" width="32" alt="Tekvent mascot"/>
  <br/>
  <sub>Built with 🐻‍❄️ by the community</sub>
</p>
