import { Calendar, Table2 } from 'lucide-react'
import useEventStore from '../../store/useEventStore'
import type { ViewMode } from '../../types/event'

const VIEWS: { mode: ViewMode; icon: typeof Calendar; label: string }[] = [
  { mode: 'calendar', icon: Calendar, label: '캘린더 뷰' },
  { mode: 'table', icon: Table2, label: '테이블 뷰' },
]

const ViewToggle = () => {
  const { viewMode, setViewMode } = useEventStore()

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-md p-0.5" role="group" aria-label="뷰 전환">
      {VIEWS.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          aria-label={label}
          aria-pressed={viewMode === mode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all duration-150 ${
            viewMode === mode
              ? 'bg-white text-gray-900 font-semibold shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Icon size={14} />
          <span className="hidden sm:inline">{label.replace(' 뷰', '')}</span>
        </button>
      ))}
    </div>
  )
}

export default ViewToggle
