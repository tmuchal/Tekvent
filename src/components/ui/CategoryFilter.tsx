import useEventStore from '../../store/useEventStore'
import type { EventCategory } from '../../types/event'

const CATEGORIES: { value: EventCategory; label: string; color: string; bg: string; border: string }[] = [
  { value: 'All', label: 'All', color: 'text-gray-600', bg: 'bg-gray-600', border: 'border-gray-300' },
  { value: 'Blockchain', label: '⛓ Blockchain', color: 'text-blue-600', bg: 'bg-blue-500', border: 'border-blue-400' },
  { value: 'AI', label: '🤖 AI', color: 'text-violet-600', bg: 'bg-violet-500', border: 'border-violet-400' },
  { value: 'FinTech', label: '💳 FinTech', color: 'text-emerald-600', bg: 'bg-emerald-500', border: 'border-emerald-400' },
  { value: 'Developer', label: '💻 Developer', color: 'text-amber-600', bg: 'bg-amber-500', border: 'border-amber-400' },
]

const CategoryFilter = () => {
  const { categoryFilter, setCategoryFilter } = useEventStore()

  return (
    <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="카테고리 필터">
      {CATEGORIES.map(({ value, label, color, bg, border }) => {
        const isActive = categoryFilter === value
        return (
          <button
            key={value}
            onClick={() => setCategoryFilter(value)}
            aria-pressed={isActive}
            aria-label={`${label} 카테고리 필터`}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
              isActive
                ? `${bg} text-white border-transparent`
                : `bg-white ${color} ${border} hover:bg-gray-50`
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
