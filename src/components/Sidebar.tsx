'use client'

import { useMemo } from 'react'
import type { TekventEvent, EventCategory } from '@/types/event'

interface SidebarProps {
  events: TekventEvent[]
  selectedCountry: string | null
  selectedCategory: EventCategory | 'all'
  onCountryChange: (country: string | null) => void
  onCategoryChange: (cat: EventCategory | 'all') => void
}

const CATEGORIES: { value: EventCategory | 'all'; label: string; color?: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'ai', label: 'AI', color: '#2563EB' },
  { value: 'blockchain', label: 'Blockchain', color: '#7C3AED' },
]

export default function Sidebar({
  events,
  selectedCountry,
  selectedCategory,
  onCountryChange,
  onCategoryChange,
}: SidebarProps) {
  const countryCounts = useMemo(() => {
    const map = new Map<string, { flag: string; count: number }>()
    for (const e of events) {
      const existing = map.get(e.country)
      if (existing) {
        existing.count++
      } else {
        map.set(e.country, { flag: e.country_flag, count: 1 })
      }
    }
    return Array.from(map.entries())
      .map(([country, data]) => ({ country, ...data }))
      .sort((a, b) => b.count - a.count)
  }, [events])

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col gap-5 w-52 shrink-0">
        {/* Category */}
        <div className="bg-white border border-[#BAE6FD] rounded-2xl p-3 shadow-sm">
          <h3 className="text-xs font-semibold text-[#0C4A6E] uppercase tracking-wider mb-2 px-1">
            Category
          </h3>
          <div className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors text-left ${
                  selectedCategory === cat.value
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium'
                    : 'text-[#475569] hover:bg-[#F0F9FF] hover:text-[#0C4A6E]'
                }`}
              >
                {cat.color && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                )}
                {cat.value === 'all' && (
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#BAE6FD]" />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div className="bg-white border border-[#BAE6FD] rounded-2xl p-3 shadow-sm">
          <h3 className="text-xs font-semibold text-[#0C4A6E] uppercase tracking-wider mb-2 px-1">
            Countries
          </h3>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => onCountryChange(null)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                selectedCountry === null
                  ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium'
                  : 'text-[#475569] hover:bg-[#F0F9FF] hover:text-[#0C4A6E]'
              }`}
            >
              <span>All Countries</span>
              <span className="text-xs text-[#94A3B8] bg-[#F0F9FF] px-1.5 py-0.5 rounded-full">{events.length}</span>
            </button>
            {countryCounts.map(({ country, flag, count }) => (
              <button
                key={country}
                onClick={() =>
                  onCountryChange(selectedCountry === country ? null : country)
                }
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                  selectedCountry === country
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] font-medium'
                    : 'text-[#475569] hover:bg-[#F0F9FF] hover:text-[#0C4A6E]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span className="truncate max-w-[100px]">{country}</span>
                </span>
                <span className="text-xs text-[#94A3B8] bg-[#F0F9FF] px-1.5 py-0.5 rounded-full">{count}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile horizontal scroll filters */}
      <div className="lg:hidden w-full flex flex-col gap-3 mb-4">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors font-medium ${
                selectedCategory === cat.value
                  ? 'bg-[#0C4A6E] border-[#0C4A6E] text-white shadow-sm'
                  : 'bg-white border-[#BAE6FD] text-[#475569] hover:border-[#7DD3FC]'
              }`}
            >
              {cat.color && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: selectedCategory === cat.value ? 'white' : cat.color }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
        {/* Country pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => onCountryChange(null)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors font-medium ${
              selectedCountry === null
                ? 'bg-[#0C4A6E] border-[#0C4A6E] text-white shadow-sm'
                : 'bg-white border-[#BAE6FD] text-[#475569]'
            }`}
          >
            All
          </button>
          {countryCounts.map(({ country, flag }) => (
            <button
              key={country}
              onClick={() =>
                onCountryChange(selectedCountry === country ? null : country)
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors font-medium ${
                selectedCountry === country
                  ? 'bg-[#0C4A6E] border-[#0C4A6E] text-white shadow-sm'
                  : 'bg-white border-[#BAE6FD] text-[#475569]'
              }`}
            >
              {flag} {country}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
