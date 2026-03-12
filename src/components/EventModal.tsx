import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import useEventStore from '../store/useEventStore'
import { formatDateRange } from '../lib/dateUtils'
import DdayBadge from './ui/DdayBadge'
import { getEventCategory } from '../types/event'

const CATEGORY_STYLES: Record<string, string> = {
  Blockchain: 'bg-blue-50 text-blue-700',
  AI: 'bg-violet-50 text-violet-700',
  FinTech: 'bg-emerald-50 text-emerald-700',
  Developer: 'bg-amber-50 text-amber-700',
}

const EventModal = () => {
  const { selectedEvent, setSelectedEvent } = useEventStore()

  const close = useCallback(() => setSelectedEvent(null), [setSelectedEvent])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  // Lock body scroll when open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedEvent])

  return (
    <AnimatePresence>
      {selectedEvent && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Side panel (desktop) / Bottom sheet (mobile) */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={selectedEvent.name}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Hero */}
            <div
              className="relative px-5 pt-10 pb-5"
              style={{ backgroundColor: `${selectedEvent.color}18` }}
            >
              <button
                onClick={close}
                aria-label="모달 닫기"
                className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-white/60 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="text-4xl mb-3">{selectedEvent.emoji}</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(() => {
                  const cat = getEventCategory(selectedEvent.tags)
                  return (
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${CATEGORY_STYLES[cat] ?? 'bg-gray-100 text-gray-600'}`}>
                      {cat}
                    </span>
                  )
                })()}
                {selectedEvent.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/70 text-gray-600 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">
                {selectedEvent.name}
              </h2>
            </div>

            {/* Properties */}
            <div className="px-5 py-4 space-y-3 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm w-20 shrink-0 mt-0.5">📅 날짜</span>
                <span className="text-sm text-gray-700">{formatDateRange(selectedEvent.startDate, selectedEvent.endDate)}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm w-20 shrink-0 mt-0.5">📍 장소</span>
                <span className="text-sm text-gray-700">{selectedEvent.location || '🌐 온라인'}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm w-20 shrink-0 mt-0.5">👥 규모</span>
                <span className="text-sm text-gray-700">{selectedEvent.attendees}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm w-20 shrink-0 mt-0.5">🎟 티켓</span>
                <span className="text-sm text-gray-700">{selectedEvent.ticketPrice}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 text-sm w-20 shrink-0 mt-0.5">⏱ 상태</span>
                <DdayBadge startDate={selectedEvent.startDate} endDate={selectedEvent.endDate} />
              </div>
            </div>

            {/* Description */}
            <div className="px-5 py-4 flex-1 overflow-y-auto">
              <p className="text-sm text-gray-600 leading-relaxed">{selectedEvent.description}</p>
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-gray-100">
              <a
                href={selectedEvent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: selectedEvent.color }}
              >
                공식 사이트 방문 <ExternalLink size={14} />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default EventModal
