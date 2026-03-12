import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import useEventStore from '../../store/useEventStore'

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useEventStore()
  const [localValue, setLocalValue] = useState(searchQuery)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSearchQuery(localValue)
    }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [localValue, setSearchQuery])

  // Keep in sync if reset externally
  useEffect(() => {
    if (searchQuery === '') setLocalValue('')
  }, [searchQuery])

  const handleClear = () => {
    setLocalValue('')
    setSearchQuery('')
  }

  return (
    <div className="relative flex items-center">
      <Search size={14} className="absolute left-3 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="행사명, 장소, 태그 검색..."
        aria-label="행사 검색"
        className="w-full sm:w-64 pl-8 pr-8 py-1.5 text-sm bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-150 placeholder-gray-400"
      />
      {localValue && (
        <button
          onClick={handleClear}
          aria-label="검색어 초기화"
          className="absolute right-2.5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
