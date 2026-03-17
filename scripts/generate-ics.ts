import * as fs from 'fs'
import * as path from 'path'
import ical, { ICalCalendarMethod } from 'ical-generator'

interface TekventEvent {
  id: string
  name: string
  category: string
  date_start: string
  date_end: string
  country: string
  country_flag: string
  city: string
  url: string
  description: string
  tags: string[]
  confirmed: boolean
}

const eventsPath = path.join(process.cwd(), 'public/events.json')
const outputPath = path.join(process.cwd(), 'public/calendar.ics')

const events: TekventEvent[] = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'))

const cal = ical({
  name: '🐻‍❄️ Tekvent — Asia AI & Blockchain Events',
  prodId: '-//Tekvent//Asia AI & Blockchain Events//EN',
  method: ICalCalendarMethod.PUBLISH,
})

for (const event of events) {
  const start = new Date(event.date_start)
  const end = new Date(event.date_end)
  // Make end date inclusive by adding 1 day (iCal DTEND is exclusive)
  end.setDate(end.getDate() + 1)

  cal.createEvent({
    id: event.id,
    summary: `${event.country_flag} ${event.name}`,
    description: `${event.description}\n\nCategory: ${event.category}\nTags: ${event.tags.join(', ')}\nURL: ${event.url}`,
    location: `${event.city}, ${event.country}`,
    url: event.url,
    start,
    end,
    allDay: true,
  })
}

fs.writeFileSync(outputPath, cal.toString())
console.log(`🐻‍❄️ Generated ${events.length} events → ${outputPath}`)
