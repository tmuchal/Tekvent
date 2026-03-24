'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TekventEvent } from '@/types/event'

interface CalendarViewProps {
  events: TekventEvent[]
}

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function catColor(category: string) {
  if (category === 'ai') return '#2563EB'
  if (category === 'blockchain') return '#7C3AED'
  return '#0D9488'
}

function catBg(category: string) {
  if (category === 'ai') return '#DBEAFE'
  if (category === 'blockchain') return '#EDE9FE'
  return '#CCFBF1'
}

function catLabel(category: string) {
  if (category === 'ai') return 'AI'
  if (category === 'blockchain') return 'Blockchain'
  return 'AI+Chain'
}

export default function CalendarView({ events }: CalendarViewProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Build a map: dateStr -> events that span that date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, TekventEvent[]>()
    for (const e of events) {
      const start = new Date(e.date_start)
      const end = new Date(e.date_end)
      const d = new Date(start)
      while (d <= end) {
        const key = d.toISOString().split('T')[0]
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(e)
        d.setDate(d.getDate() + 1)
      }
    }
    return map
  }, [events])

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const selectedDateStr = selectedDay
    ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null
  const selectedEvents = selectedDateStr ? (eventsByDate.get(selectedDateStr) ?? []) : []

  // Unique events for selected day (dedupe since multi-day events appear multiple times)
  const uniqueSelected = useMemo(() => {
    const seen = new Set<string>()
    return selectedEvents.filter(e => {
      if (seen.has(e.id)) return false
      seen.add(e.id)
      return true
    })
  }, [selectedEvents])

  // Count how many events start in this month (for the summary)
  const monthEventCount = useMemo(() => {
    const seen = new Set<string>()
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dayEvts = eventsByDate.get(key) ?? []
      for (const e of dayEvts) seen.add(e.id)
    }
    return seen.size
  }, [eventsByDate, year, month, daysInMonth])

  // Build grid cells (null = empty, number = day)
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Month navigation */}
      <div className="flex items-center justify-between bg-white border border-[#BAE6FD] rounded-2xl px-4 py-3 shadow-sm">
        <button
          onClick={prevMonth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#E0F2FE] text-[#0C4A6E] font-medium text-sm transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
          Prev
        </button>

        <div className="text-center">
          <h2 className="text-base font-bold text-[#0C4A6E]">{MONTHS[month]} {year}</h2>
          {monthEventCount > 0 && (
            <p className="text-xs text-[#64748B]">{monthEventCount} event{monthEventCount !== 1 ? 's' : ''} this month</p>
          )}
        </div>

        <button
          onClick={nextMonth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#E0F2FE] text-[#0C4A6E] font-medium text-sm transition-colors"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-1">
        {[
          { label: 'AI', color: '#2563EB' },
          { label: 'Blockchain', color: '#7C3AED' },
          { label: 'AI + Chain', color: '#0D9488' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {label}
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_HEADERS.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="min-h-[60px] sm:min-h-[72px]" />

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayEvents = eventsByDate.get(dateStr) ?? []
          const uniqueDayEvents = Array.from(new Map(dayEvents.map(e => [e.id, e])).values())
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
          const isSelected = selectedDay === day
          const hasEvents = uniqueDayEvents.length > 0

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`relative p-1.5 sm:p-2 rounded-xl border transition-all min-h-[60px] sm:min-h-[72px] flex flex-col items-start ${
                isSelected
                  ? 'border-[#2563EB] bg-[#EFF6FF] shadow-sm'
                  : hasEvents
                    ? 'border-[#BAE6FD] bg-white hover:border-[#7DD3FC] hover:bg-[#F0F9FF] cursor-pointer shadow-sm'
                    : 'border-transparent hover:bg-[#F0F9FF] cursor-default'
              }`}
            >
              <span
                className={`text-xs sm:text-sm font-semibold leading-none mb-1 ${
                  isToday
                    ? 'w-5 h-5 sm:w-6 sm:h-6 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs'
                    : isSelected
                      ? 'text-[#1D4ED8]'
                      : 'text-[#334155]'
                }`}
              >
                {day}
              </span>
              {uniqueDayEvents.length > 0 && (
                <div className="flex flex-wrap gap-0.5 mt-0.5">
                  {uniqueDayEvents.slice(0, 3).map((e, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: catColor(e.category) }}
                    />
                  ))}
                  {uniqueDayEvents.length > 3 && (
                    <span className="text-[9px] text-[#64748B] leading-none self-center">
                      +{uniqueDayEvents.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected day detail panel */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="border border-[#BAE6FD] rounded-2xl bg-white shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#EFF6FF]">
              <h3 className="font-semibold text-[#0C4A6E] text-sm">
                {MONTHS[month]} {selectedDay}, {year}
              </h3>
              {uniqueSelected.length === 0 ? (
                <span className="text-xs text-[#94A3B8]">No events</span>
              ) : (
                <span className="text-xs text-[#64748B]">{uniqueSelected.length} event{uniqueSelected.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            {uniqueSelected.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-[#94A3B8]">
                🐧 No events on this day
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[#F0F9FF]">
                {uniqueSelected.map(e => (
                  <a
                    key={e.id}
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[#F0F9FF] transition-colors"
                  >
                    <span
                      className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: catColor(e.category) }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-[#0F172A] text-sm leading-snug">{e.name}</span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
                          style={{ backgroundColor: catBg(e.category), color: catColor(e.category) }}
                        >
                          {catLabel(e.category)}
                        </span>
                        {!e.confirmed && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium shrink-0">
                            TBD
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {e.country_flag} {e.city}, {e.country} · {e.date_start === e.date_end ? e.date_start : `${e.date_start} – ${e.date_end}`}
                      </p>
                    </div>
                    <svg className="text-[#BAE6FD] shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                      <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
