#!/usr/bin/env python3
"""Generate calendar.ics and update README.md from events.json."""

import json
import re
from datetime import datetime, date
from pathlib import Path
from collections import defaultdict

try:
    from icalendar import Calendar, Event
except ImportError:
    print("Installing icalendar...")
    import subprocess
    subprocess.check_call(["pip", "install", "icalendar"])
    from icalendar import Calendar, Event

ROOT = Path(__file__).resolve().parent.parent
EVENTS_FILE = ROOT / "events.json"
README_FILE = ROOT / "README.md"
ICS_FILE = ROOT / "calendar.ics"

MONTH_NAMES = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

COUNTRY_ORDER = [
    "Singapore", "South Korea", "Japan", "Hong Kong", "Taiwan",
    "Thailand", "India", "UAE"
]

COUNTRY_FLAGS = {
    "Singapore": "🇸🇬",
    "South Korea": "🇰🇷",
    "Japan": "🇯🇵",
    "Hong Kong": "🇭🇰",
    "Taiwan": "🇹🇼",
    "Thailand": "🇹🇭",
    "India": "🇮🇳",
    "UAE": "🇦🇪",
}


def load_events(filter_past=True):
    with open(EVENTS_FILE, "r", encoding="utf-8") as f:
        events = json.load(f)
    if filter_past:
        today = date.today().isoformat()
        events = [e for e in events if e["date_end"] >= today]
    events.sort(key=lambda e: e["date_start"])
    return events


def save_events(events):
    with open(EVENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(events, f, indent=2, ensure_ascii=False)
        f.write("\n")


def extract_country(country_str):
    """Extract country name from '🇸🇬 Singapore' format."""
    parts = country_str.split(" ", 1)
    return parts[1] if len(parts) > 1 else country_str


def format_date_range(start_str, end_str, confirmed):
    start = datetime.strptime(start_str, "%Y-%m-%d")
    end = datetime.strptime(end_str, "%Y-%m-%d")
    warn = "" if confirmed else " ⚠️"

    if start.year == end.year and start.month == end.month:
        return f"{MONTH_NAMES[start.month]} {start.day} – {end.day}, {start.year}{warn}"
    elif start.year == end.year:
        return f"{MONTH_NAMES[start.month]} {start.day} – {MONTH_NAMES[end.month]} {end.day}, {start.year}{warn}"
    else:
        return f"{MONTH_NAMES[start.month]} {start.day}, {start.year} – {MONTH_NAMES[end.month]} {end.day}, {end.year}{warn}"


def generate_ics(events):
    cal = Calendar()
    cal.add("prodid", "-//dino-events//Asia AI & Blockchain Events//EN")
    cal.add("version", "2.0")
    cal.add("calscale", "GREGORIAN")
    cal.add("x-wr-calname", "🦖 dino-events")

    for ev in events:
        event = Event()
        event.add("summary", ev["name"])
        event.add("dtstart", datetime.strptime(ev["date_start"], "%Y-%m-%d").date())
        event.add("dtend", datetime.strptime(ev["date_end"], "%Y-%m-%d").date())
        event.add("description", ev["description"])
        event.add("location", f"{ev['city']}, {extract_country(ev['country'])}")
        event.add("url", ev["url"])
        cal.add_component(event)

    with open(ICS_FILE, "wb") as f:
        f.write(cal.to_ical())
    print(f"✅ Generated {ICS_FILE}")


def generate_events_section(events):
    grouped = defaultdict(list)
    for ev in events:
        country = extract_country(ev["country"])
        grouped[country].append(ev)

    lines = []
    for country in COUNTRY_ORDER:
        flag = COUNTRY_FLAGS.get(country, "")
        lines.append(f"## {flag} {country}")
        lines.append("")
        if country not in grouped:
            lines.append("_아직 등록된 행사가 없습니다. [PR로 추가해주세요!](./CONTRIBUTING.md)_")
        else:
            lines.append("| 행사 | 날짜 | 카테고리 | 설명 |")
            lines.append("|------|------|----------|------|")
            for ev in grouped[country]:
                name_link = f"[{ev['name']}]({ev['url']})"
                date_range = format_date_range(ev["date_start"], ev["date_end"], ev["confirmed"])
                cat = f"`{ev['category']}`"
                lines.append(f"| {name_link} | {date_range} | {cat} | {ev['description']} |")
        lines.append("")

    lines.append("> ⚠️ = 날짜 미확정 (unconfirmed)")
    return "\n".join(lines)


def generate_timeline(events):
    by_year_month = defaultdict(list)
    for ev in events:
        start = datetime.strptime(ev["date_start"], "%Y-%m-%d")
        key = (start.year, start.month)
        flag_match = ev["country"].split(" ")[0]
        by_year_month[key].append(f"{ev['name']} {flag_match}")

    years = sorted(set(k[0] for k in by_year_month.keys()))
    lines = ["```"]

    for year in years:
        lines.append(str(year))
        months = sorted(k for k in by_year_month.keys() if k[0] == year)
        for i, (y, m) in enumerate(months):
            is_last_month = (i == len(months) - 1) and (year == years[-1])
            prefix = "└──" if is_last_month else "├──"
            events_in_month = by_year_month[(y, m)]
            month_name = MONTH_NAMES[m].ljust(4)
            lines.append(f"{prefix} {month_name} {events_in_month[0]}")
            for extra in events_in_month[1:]:
                cont = "   " if is_last_month else "│  "
                lines.append(f"{cont}      {extra}")
        lines.append("")

    # Remove trailing empty line inside code block
    while lines and lines[-1] == "":
        lines.pop()
    lines.append("```")
    return "\n".join(lines)


def update_readme(events):
    readme = README_FILE.read_text(encoding="utf-8")

    # Update events section
    events_section = generate_events_section(events)
    readme = re.sub(
        r"<!-- EVENTS_START -->.*?<!-- EVENTS_END -->",
        f"<!-- EVENTS_START -->\n{events_section}\n<!-- EVENTS_END -->",
        readme,
        flags=re.DOTALL,
    )

    # Update timeline section
    timeline_section = generate_timeline(events)
    readme = re.sub(
        r"<!-- TIMELINE_START -->.*?<!-- TIMELINE_END -->",
        f"<!-- TIMELINE_START -->\n## 📅 타임라인\n\n{timeline_section}\n<!-- TIMELINE_END -->",
        readme,
        flags=re.DOTALL,
    )

    # Update event count badge
    count = len(events)
    readme = re.sub(
        r"events-\d+-",
        f"events-{count}-",
        readme,
    )

    # Update last updated badge
    now = datetime.now()
    updated = f"{now.year}--{now.month:02d}"
    readme = re.sub(
        r"updated-\d{4}--\d{2}-",
        f"updated-{updated}-",
        readme,
    )

    README_FILE.write_text(readme, encoding="utf-8")
    print(f"✅ Updated {README_FILE}")


def main():
    import sys
    no_filter = "--no-filter" in sys.argv

    all_events = load_events(filter_past=False)
    upcoming = load_events(filter_past=True)

    if no_filter:
        # Use all events for README/ICS (initial setup)
        display_events = all_events
        print(f"📋 Loaded {len(all_events)} events (no filter)")
    else:
        display_events = upcoming
        # Save filtered events (past events removed)
        save_events(upcoming)
        print(f"📋 Loaded {len(upcoming)} upcoming events (filtered from {len(all_events)})")

    generate_ics(display_events)
    update_readme(display_events)

    print("🦖 Done!")


if __name__ == "__main__":
    main()
