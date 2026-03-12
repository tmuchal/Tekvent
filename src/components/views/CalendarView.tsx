import { memo, useRef, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEventStore from '../../store/useEventStore'
import { getCalendarDays, toDateString, isDateInRange, formatDateRange } from '../../lib/dateUtils'
import TRex from '../fun/TRex'
import TRexToggle from '../fun/TRexToggle'
import type { BlockchainEvent } from '../../types/event'

const WEEKDAYS_FULL = ['일', '월', '화', '수', '목', '금', '토']
const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

const CalendarView = memo(() => {
  const { selectedMonth, goToPrevMonth, goToNextMonth, goToToday, getMonthEvents, setSelectedEvent } = useEventStore()
  const gridRef = useRef<HTMLDivElement>(null)
  const { year, month } = selectedMonth

  const calDays = useMemo(() => getCalendarDays(year, month), [year, month])
  const events = useMemo(() => getMonthEvents(), [getMonthEvents, selectedMonth]) // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date()
  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate())

  // Build a map: dateStr -> events that include that date
  const dateEventMap = useMemo(() => {
    const map = new Map<string, BlockchainEvent[]>()
    events.forEach((e) => {
      const start = new Date(e.startDate)
      const end = new Date(e.endDate)
      // Iterate each day of the event within this month
      const d = new Date(Math.max(start.getTime(), new Date(year, month, 1).getTime()))
      const endBound = new Date(Math.min(end.getTime(), new Date(year, month + 1, 0).getTime()))
      while (d <= endBound) {
        const key = toDateString(d.getFullYear(), d.getMonth(), d.getDate())
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(e)
        d.setDate(d.getDate() + 1)
      }
    })
    return map
  }, [events, year, month])

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            aria-label="이전 달"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-base font-semibold text-gray-900 min-w-[100px] text-center">
            {year}년 {MONTH_NAMES[month]}
          </h2>
          <button
            onClick={goToNextMonth}
            aria-label="다음 달"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <button
          onClick={goToToday}
          aria-label="오늘로 이동"
          className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        >
          Today
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {WEEKDAYS_FULL.map((day, i) => (
          <div
            key={day}
            className={`py-2 text-center text-xs font-medium ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div ref={gridRef} className="relative grid grid-cols-7">
        {calDays.map((day, idx) => {
          const dateStr = day ? toDateString(year, month, day) : ''
          const isToday = dateStr === todayStr
          const dayEvents = day ? (dateEventMap.get(dateStr) ?? []) : []
          const MAX_VISIBLE = 3
          const visibleEvents = dayEvents.slice(0, MAX_VISIBLE)
          const extra = dayEvents.length - MAX_VISIBLE

          return (
            <div
              key={idx}
              className={`min-h-24 sm:min-h-24 p-1 border-b border-r border-gray-100 ${
                !day ? 'bg-gray-50/30' : 'bg-white'
              } ${idx % 7 === 0 ? 'border-l-0' : ''}`}
            >
              {day && (
                <>
                  <div className="flex justify-end mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full ${
                        isToday
                          ? 'bg-blue-500 text-white'
                          : idx % 7 === 0
                          ? 'text-red-400'
                          : idx % 7 === 6
                          ? 'text-blue-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {visibleEvents.map((event) => {
                      const isStart = isDateInRange(event.startDate, dateStr, dateStr)
                      return (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          aria-label={`${event.name} 상세 보기`}
                          className="w-full text-left px-1.5 py-0.5 rounded text-white text-xs leading-tight truncate transition-all hover:brightness-110 active:scale-95"
                          style={{ backgroundColor: event.color }}
                          title={`${event.name} (${formatDateRange(event.startDate, event.endDate)})`}
                        >
                          {isStart ? `${event.emoji} ${event.name}` : ''}
                        </button>
                      )
                    })}
                    {extra > 0 && (
                      <div className="text-xs text-gray-400 px-1">+{extra} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}

        {/* T-Rex overlay */}
        <TRex areaRef={gridRef} />
      </div>

      <TRexToggle />
    </div>
  )
})

CalendarView.displayName = 'CalendarView'

export default CalendarView
