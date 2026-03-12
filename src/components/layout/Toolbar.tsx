import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import useEventStore from '../../store/useEventStore'
import ViewToggle from '../ui/ViewToggle'
import CategoryFilter from '../ui/CategoryFilter'
import SearchBar from '../ui/SearchBar'
import TagFilter from '../ui/TagFilter'

const Toolbar = () => {
  const { categoryFilter, searchQuery, selectedTags, resetFilters } = useEventStore()
  const [showTags, setShowTags] = useState(true)

  const hasFilters =
    categoryFilter !== 'All' || searchQuery !== '' || selectedTags.length > 0

  return (
    <div className="space-y-2">
      {/* Row 1: ViewToggle + SearchBar */}
      <div className="flex items-center gap-3 flex-wrap">
        <ViewToggle />
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>
      </div>

      {/* Row 2: CategoryFilter + Reset */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <CategoryFilter />
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={resetFilters}
              aria-label="필터 초기화"
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-500 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={11} />
              초기화
            </button>
          )}
          <button
            onClick={() => setShowTags((v) => !v)}
            aria-label={showTags ? '태그 필터 닫기' : '태그 필터 열기'}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            태그
            {showTags ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Row 3: TagFilter */}
      {showTags && (
        <div className="pt-0.5">
          <TagFilter />
        </div>
      )}
    </div>
  )
}

export default Toolbar
