'use client'

import { motion } from 'framer-motion'
import type { TekventEvent } from '@/types/event'

interface EventCardProps {
  event: TekventEvent
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const sm = MONTH_ABBR[s.getMonth()]
  const em = MONTH_ABBR[e.getMonth()]
  const sd = s.getDate()
  const ed = e.getDate()
  const sy = s.getFullYear()
  const ey = e.getFullYear()

  if (start === end) return `${sm} ${sd}, ${sy}`
  if (s.getMonth() === e.getMonth() && sy === ey)
    return `${sm} ${sd}–${ed}, ${sy}`
  if (sy === ey) return `${sm} ${sd} – ${em} ${ed}, ${sy}`
  return `${sm} ${sd}, ${sy} – ${em} ${ed}, ${ey}`
}

function getDaysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function isEnded(endDate: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(endDate) < today
}

function categoryStyle(category: string) {
  if (category === 'ai') return { color: '#3B82F6', label: 'AI', bg: 'rgba(59,130,246,0.12)' }
  if (category === 'blockchain') return { color: '#8B5CF6', label: 'Blockchain', bg: 'rgba(139,92,246,0.12)' }
  return { color: '#6366F1', label: 'AI + Chain', bg: 'rgba(99,102,241,0.12)' }
}

export default function EventCard({ event }: EventCardProps) {
  const ended = isEnded(event.date_end)
  const daysUntil = getDaysUntil(event.date_start)
  const showDday = !ended && daysUntil >= 0 && daysUntil <= 30
  const catStyle = categoryStyle(event.category)

  const startDate = new Date(event.date_start)
  const monthLabel = MONTH_ABBR[startDate.getMonth()].toUpperCase()
  const dayLabel = startDate.getDate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      className={`group relative flex gap-4 bg-[#1E293B] border border-[#334155] rounded-xl p-4 transition-all hover:border-[#475569] hover:shadow-lg hover:shadow-black/20 ${
        ended ? 'opacity-50' : ''
      }`}
    >
      {/* Category bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: catStyle.color }}
      />

      {/* Date badge */}
      <div className="shrink-0 flex flex-col items-center justify-center w-12 h-14 bg-[#0F172A] rounded-lg border border-[#334155]">
        <span className="text-[10px] font-bold text-[#64748B] tracking-widest">{monthLabel}</span>
        <span className="text-xl font-bold text-[#F8FAFC] leading-none">{dayLabel}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F8FAFC] font-semibold text-base hover:text-[#93C5FD] transition-colors leading-snug"
            onClick={(e) => e.stopPropagation()}
          >
            {event.name}
          </a>
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
            {!event.confirmed && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#92400E]/30 text-[#FCD34D] border border-[#92400E]/50">
                TBD
              </span>
            )}
            {showDday && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                D-{daysUntil === 0 ? 'Day' : daysUntil}
              </span>
            )}
            {ended && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#334155] text-[#64748B]">
                Ended
              </span>
            )}
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
              style={{
                color: catStyle.color,
                backgroundColor: catStyle.bg,
                borderColor: catStyle.color + '40',
              }}
            >
              {catStyle.label}
            </span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-sm text-[#94A3B8] flex-wrap">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 0a.5.5 0 0 1 .5.5V2h5V.5a.5.5 0 0 1 1 0V2H13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1.5V.5A.5.5 0 0 1 5 0zm-1 4.5A1.5 1.5 0 0 0 2.5 6v7.5A1.5 1.5 0 0 0 4 15h8a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 12 4.5H4z" />
            </svg>
            {formatDateRange(event.date_start, event.date_end)}
          </span>
          <span className="text-[#475569]">·</span>
          <span className="flex items-center gap-1">
            {event.country_flag} {event.city}, {event.country}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-[#64748B] leading-snug line-clamp-2">
          {event.description}
        </p>

        {event.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {event.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[#0F172A] text-[#475569] border border-[#334155]/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
