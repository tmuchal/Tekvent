import { create } from 'zustand'
import type { BlockchainEvent, ViewMode, EventCategory } from '../types/event'
import { getEventCategory } from '../types/event'
import EVENTS from '../data/events'

interface EventStore {
  // State
  viewMode: ViewMode
  categoryFilter: EventCategory
  searchQuery: string
  selectedMonth: { year: number; month: number }
  selectedEvent: BlockchainEvent | null
  selectedTags: string[]
  showTRex: boolean

  // Actions
  setViewMode: (mode: ViewMode) => void
  setCategoryFilter: (cat: EventCategory) => void
  setSearchQuery: (query: string) => void
  goToPrevMonth: () => void
  goToNextMonth: () => void
  goToToday: () => void
  setSelectedEvent: (event: BlockchainEvent | null) => void
  toggleTag: (tag: string) => void
  resetFilters: () => void
  toggleTRex: () => void

  // Computed
  getFilteredEvents: () => BlockchainEvent[]
  getAllTags: () => string[]
  getMonthEvents: () => BlockchainEvent[]
}

const now = new Date()

const useEventStore = create<EventStore>((set, get) => ({
  viewMode: 'calendar',
  categoryFilter: 'All',
  searchQuery: '',
  selectedMonth: { year: now.getFullYear(), month: now.getMonth() },
  selectedEvent: null,
  selectedTags: [],
  showTRex: true,

  setViewMode: (mode) => set({ viewMode: mode }),
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  goToPrevMonth: () =>
    set((state) => {
      const d = new Date(state.selectedMonth.year, state.selectedMonth.month - 1)
      return { selectedMonth: { year: d.getFullYear(), month: d.getMonth() } }
    }),

  goToNextMonth: () =>
    set((state) => {
      const d = new Date(state.selectedMonth.year, state.selectedMonth.month + 1)
      return { selectedMonth: { year: d.getFullYear(), month: d.getMonth() } }
    }),

  goToToday: () => {
    const today = new Date()
    set({ selectedMonth: { year: today.getFullYear(), month: today.getMonth() } })
  },

  setSelectedEvent: (event) => set({ selectedEvent: event }),

  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),

  resetFilters: () =>
    set({ categoryFilter: 'All', searchQuery: '', selectedTags: [] }),

  toggleTRex: () => set((state) => ({ showTRex: !state.showTRex })),

  getFilteredEvents: () => {
    const { categoryFilter, searchQuery, selectedTags } = get()
    let events = [...EVENTS]

    if (categoryFilter !== 'All') {
      events = events.filter(
        (e) => getEventCategory(e.tags) === categoryFilter
      )
    }

    if (selectedTags.length > 0) {
      events = events.filter((e) =>
        selectedTags.some((t) => e.tags.includes(t))
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return events.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  },

  getAllTags: () => {
    const tagSet = new Set<string>()
    EVENTS.forEach((e) => e.tags.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  },

  getMonthEvents: () => {
    const { selectedMonth } = get()
    return get()
      .getFilteredEvents()
      .filter((e) => {
        const start = new Date(e.startDate)
        const end = new Date(e.endDate)
        const monthStart = new Date(selectedMonth.year, selectedMonth.month, 1)
        const monthEnd = new Date(selectedMonth.year, selectedMonth.month + 1, 0)
        return start <= monthEnd && end >= monthStart
      })
  },
}))

export default useEventStore
