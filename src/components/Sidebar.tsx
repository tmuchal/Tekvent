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
  { value: 'ai', label: 'AI', color: '#3B82F6' },
  { value: 'blockchain', label: 'Blockchain', color: '#8B5CF6' },
  { value: 'both', label: 'AI + Blockchain', color: '#6366F1' },
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
        <div>
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 px-1">
            Category
          </h3>
          <div className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  selectedCategory === cat.value
                    ? 'bg-[#1E293B] text-[#F8FAFC] font-medium'
                    : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-[#F8FAFC]'
                }`}
              >
                {cat.color && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                )}
                {cat.value === 'all' && (
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#475569]" />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Countries */}
        <div>
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 px-1">
            Countries
          </h3>
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => onCountryChange(null)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCountry === null
                  ? 'bg-[#1E293B] text-[#F8FAFC] font-medium'
                  : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-[#F8FAFC]'
              }`}
            >
              <span>All Countries</span>
              <span className="text-xs text-[#64748B]">{events.length}</span>
            </button>
            {countryCounts.map(({ country, flag, count }) => (
              <button
                key={country}
                onClick={() =>
                  onCountryChange(selectedCountry === country ? null : country)
                }
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCountry === country
                    ? 'bg-[#1E293B] text-[#F8FAFC] font-medium'
                    : 'text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-[#F8FAFC]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span className="truncate max-w-[100px]">{country}</span>
                </span>
                <span className="text-xs text-[#64748B]">{count}</span>
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-[#1E293B] border-[#334155] text-[#F8FAFC]'
                  : 'border-[#334155]/50 text-[#94A3B8] hover:border-[#334155]'
              }`}
            >
              {cat.color && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
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
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
              selectedCountry === null
                ? 'bg-[#1E293B] border-[#334155] text-[#F8FAFC]'
                : 'border-[#334155]/50 text-[#94A3B8]'
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                selectedCountry === country
                  ? 'bg-[#1E293B] border-[#334155] text-[#F8FAFC]'
                  : 'border-[#334155]/50 text-[#94A3B8]'
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
