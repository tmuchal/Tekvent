/**
 * archive-past-events.ts
 *
 * 오늘 이전에 종료된 행사를 events.json에서 events-archive.json으로 이동합니다.
 * GitHub Actions에서 매월 실행됩니다.
 */

import * as fs from 'fs'
import * as path from 'path'

const eventsPath = path.join(process.cwd(), 'public/events.json')
const archivePath = path.join(process.cwd(), 'public/events-archive.json')

interface Event {
  id: string
  name: string
  date_start: string
  date_end?: string
  [key: string]: unknown
}

function loadJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
}

function main() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const events = loadJson<Event[]>(eventsPath, [])
  const archive = loadJson<Event[]>(archivePath, [])

  const archiveIds = new Set(archive.map((e) => e.id))

  const toArchive: Event[] = []
  const remaining: Event[] = []

  for (const event of events) {
    const endDate = new Date(event.date_end ?? event.date_start)
    endDate.setHours(0, 0, 0, 0)

    if (endDate < today) {
      if (!archiveIds.has(event.id)) {
        toArchive.push(event)
      }
    } else {
      remaining.push(event)
    }
  }

  if (toArchive.length === 0) {
    console.log('아카이브할 행사가 없습니다.')
    return
  }

  const updatedArchive = [...archive, ...toArchive].sort((a, b) =>
    b.date_start.localeCompare(a.date_start)
  )

  fs.writeFileSync(eventsPath, JSON.stringify(remaining, null, 2) + '\n')
  fs.writeFileSync(archivePath, JSON.stringify(updatedArchive, null, 2) + '\n')

  console.log(`✅ ${toArchive.length}개 행사 아카이브 완료:`)
  toArchive.forEach((e) => console.log(`  - ${e.name} (${e.date_end ?? e.date_start})`))
  console.log(`📋 남은 행사: ${remaining.length}개`)
}

main()
