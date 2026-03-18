'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import EventCard from './EventCard'
import type { TekventEvent } from '@/types/event'

interface EventListProps {
  events: TekventEvent[]
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isEnded(endDate: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(endDate) < today
}

export default function EventList({ events }: EventListProps) {
  const [pastOpen, setPastOpen] = useState(false)

  const { upcoming, past } = useMemo(() => {
    const u: TekventEvent[] = []
    const p: TekventEvent[] = []
    for (const e of events) {
      if (isEnded(e.date_end)) p.push(e)
      else u.push(e)
    }
    u.sort((a, b) => a.date_start.localeCompare(b.date_start))
    p.sort((a, b) => b.date_start.localeCompare(a.date_start))
    return { upcoming: u, past: p }
  }, [events])

  const upcomingGroups = useMemo(() => {
    const map = new Map<string, TekventEvent[]>()
    for (const e of upcoming) {
      const d = new Date(e.date_start)
      const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    }
    return Array.from(map.entries())
  }, [upcoming])

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <Image
          src="/Tekvent/penguin.svg"
          alt="No events"
          width={64}
          height={64}
          className="opacity-40"
          unoptimized
        />
        <p className="text-[#64748B] text-lg font-medium">No events found</p>
        <p className="text-[#475569] text-sm">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Upcoming events by month */}
      {upcomingGroups.length === 0 && past.length > 0 && (
        <p className="text-[#64748B] text-sm">No upcoming events match your filters.</p>
      )}

      {upcomingGroups.map(([monthLabel, monthEvents]) => (
        <section key={monthLabel}>
          <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block" />
            {monthLabel}
            <span className="text-[#475569] font-normal normal-case tracking-normal">
              {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
            </span>
          </h2>
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-3">
              {monthEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </AnimatePresence>
        </section>
      ))}

      {/* Past events toggle */}
      {past.length > 0 && (
        <section>
          <button
            onClick={() => setPastOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#94A3B8] transition-colors mb-3"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              className={`transition-transform ${pastOpen ? 'rotate-90' : ''}`}
            >
              <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
            <span className="font-medium uppercase tracking-wider text-xs">
              Past Events
            </span>
            <span className="text-[#475569] font-normal normal-case tracking-normal text-xs">
              {past.length} event{past.length !== 1 ? 's' : ''}
            </span>
          </button>

          <AnimatePresence>
            {pastOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3">
                  {past.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </div>
  )
}
