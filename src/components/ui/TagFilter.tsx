import useEventStore from '../../store/useEventStore'

const TagFilter = () => {
  const { selectedTags, toggleTag, getAllTags } = useEventStore()
  const tags = getAllTags()

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide" role="group" aria-label="태그 필터">
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            aria-pressed={isActive}
            aria-label={`${tag} 태그 필터`}
            className={`shrink-0 px-2.5 py-1 rounded text-xs font-medium transition-all duration-150 ${
              isActive
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}

export default TagFilter
