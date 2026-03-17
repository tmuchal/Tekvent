'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import EventList from '@/components/EventList'
import Footer from '@/components/Footer'
import eventsData from '../../public/events.json'
import type { TekventEvent, EventCategory } from '@/types/event'

const events = eventsData as TekventEvent[]

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all')

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const countryMatch = !selectedCountry || e.country === selectedCountry
      const catMatch =
        selectedCategory === 'all' || e.category === selectedCategory
      return countryMatch && catMatch
    })
  }, [selectedCountry, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      <Header totalCount={events.length} />

      <div className="flex flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 gap-6">
        <Sidebar
          events={events}
          selectedCountry={selectedCountry}
          selectedCategory={selectedCategory}
          onCountryChange={setSelectedCountry}
          onCategoryChange={setSelectedCategory}
        />
        <main className="flex-1 min-w-0">
          <EventList events={filtered} />
        </main>
      </div>

      <Footer />
    </div>
  )
}
