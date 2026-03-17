export type EventCategory = 'ai' | 'blockchain' | 'both'

export interface TekventEvent {
  id: string
  name: string
  category: EventCategory
  date_start: string
  date_end: string
  country: string
  country_flag: string
  city: string
  url: string
  description: string
  tags: string[]
  confirmed: boolean
}
