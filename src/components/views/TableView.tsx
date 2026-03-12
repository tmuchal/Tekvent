import { memo, useState } from 'react'
import { ArrowUp, ArrowDown, ArrowUpDown, RotateCcw } from 'lucide-react'
import useEventStore from '../../store/useEventStore'
import { formatDateKorean, getDdayText } from '../../lib/dateUtils'
import DdayBadge from '../ui/DdayBadge'
import { getEventCategory } from '../../types/event'

type SortField = 'name' | 'startDate' | 'attendees'
type SortDir = 'asc' | 'desc'

const CATEGORY_STYLES: Record<string, string> = {
  Blockchain: 'bg-blue-50 text-blue-700',
  AI: 'bg-violet-50 text-violet-700',
  FinTech: 'bg-emerald-50 text-emerald-700',
  Developer: 'bg-amber-50 text-amber-700',
}

const TableView = memo(() => {
  const { getFilteredEvents, setSelectedEvent, resetFilters, categoryFilter, searchQuery, selectedTags } = useEventStore()
  const [sortField, setSortField] = useState<SortField>('startDate')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const events = getFilteredEvents()
  const hasFilters = categoryFilter !== 'All' || searchQuery !== '' || selectedTags.length > 0

  const sorted = [...events].sort((a, b) => {
    let cmp = 0
    if (sortField === 'name') cmp = a.name.localeCompare(b.name)
    else if (sortField === 'startDate') cmp = a.startDate.localeCompare(b.startDate)
    else if (sortField === 'attendees') cmp = a.attendees.localeCompare(b.attendees)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortDir('asc') }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-30" />
    return sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
  }

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-5xl">🔍</div>
        <p className="text-gray-500 text-sm">조건에 맞는 행사가 없습니다</p>
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={13} />
            필터 초기화
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="w-10 px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  행사명 <SortIcon field="name" />
                </button>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">카테고리</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <button onClick={() => handleSort('startDate')} className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  날짜 <SortIcon field="startDate" />
                </button>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">장소</th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                <button onClick={() => handleSort('attendees')} className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  규모 <SortIcon field="attendees" />
                </button>
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">D-day</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sorted.map((event) => {
              const isPast = getDdayText(event.startDate, event.endDate).status === 'past'
              const cat = getEventCategory(event.tags)
              return (
                <tr
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`group cursor-pointer hover:bg-gray-50/80 transition-colors ${isPast ? 'opacity-40' : ''}`}
                >
                  <td className="px-3 py-3 text-lg">{event.emoji}</td>
                  <td className="px-3 py-3">
                    <span
                      className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors"
                      style={{ borderLeft: `3px solid ${event.color}`, paddingLeft: '8px' }}
                    >
                      {event.name}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${CATEGORY_STYLES[cat] ?? 'bg-gray-100 text-gray-600'}`}>
                      {cat}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {formatDateKorean(event.startDate, event.endDate)}
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs">
                    {event.location ? `📍 ${event.location}` : '🌐 온라인'}
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs">{event.attendees}</td>
                  <td className="px-3 py-3">
                    <DdayBadge startDate={event.startDate} endDate={event.endDate} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {sorted.map((event) => {
          const isPast = getDdayText(event.startDate, event.endDate).status === 'past'
          const cat = getEventCategory(event.tags)
          return (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              aria-label={`${event.name} 상세 보기`}
              className={`w-full text-left bg-white rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors ${isPast ? 'opacity-40' : ''}`}
              style={{ borderLeft: `4px solid ${event.color}` }}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{event.emoji}</span>
                  <span className="font-semibold text-gray-900 text-sm">{event.name}</span>
                </div>
                <DdayBadge startDate={event.startDate} endDate={event.endDate} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-1.5">
                <span>{event.location ? `📍 ${event.location}` : '🌐 온라인'}</span>
                <span>🗓 {formatDateKorean(event.startDate, event.endDate)}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${CATEGORY_STYLES[cat] ?? 'bg-gray-100 text-gray-600'}`}>
                  {cat}
                </span>
                {event.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
})

TableView.displayName = 'TableView'

export default TableView
