'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import EventList from '@/components/EventList'
import CalendarView from '@/components/CalendarView'
import Footer from '@/components/Footer'
import eventsData from '../../public/events.json'
import type { TekventEvent, EventCategory } from '@/types/event'

const events = eventsData as TekventEvent[]

type ViewMode = 'list' | 'calendar'

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const countryMatch = !selectedCountry || e.country === selectedCountry
      const catMatch =
        selectedCategory === 'all' || e.category === selectedCategory
      return countryMatch && catMatch
    })
  }, [selectedCountry, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F9FF]">
      <Header totalCount={events.length} />

      <div className="flex flex-col lg:flex-row flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 gap-6">
        <Sidebar
          events={events}
          selectedCountry={selectedCountry}
          selectedCategory={selectedCategory}
          onCountryChange={setSelectedCountry}
          onCategoryChange={setSelectedCategory}
        />
        <main className="flex-1 min-w-0">
          {/* View toggle */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex bg-white border border-[#BAE6FD] rounded-xl p-1 gap-1 shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#0C4A6E] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0C4A6E]'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-[#0C4A6E] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0C4A6E]'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
                Calendar
              </button>
            </div>
            {viewMode === 'list' && filtered.length !== events.length && (
              <span className="text-xs text-[#64748B]">
                {filtered.length} of {events.length} events
              </span>
            )}
          </div>

          {viewMode === 'list' ? (
            <EventList events={filtered} />
          ) : (
            <CalendarView events={filtered} />
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
