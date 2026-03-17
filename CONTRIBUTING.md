# 🤝 Contributing to Tekvent

Thanks for helping keep the calendar accurate and up-to-date!

## How to Add or Fix an Event

1. **Fork** this repository
2. **Edit** `public/events.json`
3. **Open a PR** — describe the event briefly in the PR title

---

## Event JSON Schema

```json
{
  "id": "event-name-year",
  "name": "Full Event Name",
  "category": "ai | blockchain | both",
  "date_start": "YYYY-MM-DD",
  "date_end": "YYYY-MM-DD",
  "country": "Country Name",
  "country_flag": "🏳️",
  "city": "City Name",
  "url": "https://official-event-url.com",
  "description": "One or two sentence description.",
  "tags": ["tag1", "tag2"],
  "confirmed": true
}
```

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | ✅ | Unique slug, e.g. `token2049-sg-2026` |
| `name` | string | ✅ | Official event name |
| `category` | `"ai"` \| `"blockchain"` \| `"both"` | ✅ | |
| `date_start` | `YYYY-MM-DD` | ✅ | ISO date |
| `date_end` | `YYYY-MM-DD` | ✅ | Same as start if one day |
| `country` | string | ✅ | e.g. `"Singapore"` |
| `country_flag` | string | ✅ | Country flag emoji |
| `city` | string | ✅ | e.g. `"Singapore"` |
| `url` | string | ✅ | Official website |
| `description` | string | ✅ | Max ~200 chars |
| `tags` | string[] | ✅ | 2–5 lowercase tags |
| `confirmed` | boolean | ✅ | `false` if dates are TBD |

## Guidelines

- **Scope:** Events in Asia or the Middle East with AI / blockchain focus
- **Size:** Large-scale public events (500+ attendees preferred)
- **Dates:** Use confirmed dates; set `"confirmed": false` if TBD
- **Sources:** Link to the official event website

## Questions?

Open an issue or start a discussion on GitHub.
