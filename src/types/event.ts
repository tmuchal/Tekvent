export interface BlockchainEvent {
  id: string
  name: string
  location: string
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
  color: string
  url: string
  emoji: string
  description: string
  tags: string[]
  attendees: string
  ticketPrice: string
}

export type ViewMode = 'calendar' | 'table'

export type EventCategory = 'All' | 'Blockchain' | 'AI' | 'FinTech' | 'Developer'

const AI_TAGS = new Set(['AI', 'AGI', 'MachineLearning', 'LLM', 'DeepLearning'])
const FINTECH_TAGS = new Set(['FinTech', 'CBDC', 'Banking', 'Finance', 'Payments'])
const DEVELOPER_TAGS = new Set(['Developer', 'Hackathon', 'DevCon', 'Engineering', 'OpenSource'])

export function getEventCategory(tags: string[]): Exclude<EventCategory, 'All'> {
  for (const tag of tags) {
    if (AI_TAGS.has(tag)) return 'AI'
  }
  for (const tag of tags) {
    if (FINTECH_TAGS.has(tag)) return 'FinTech'
  }
  for (const tag of tags) {
    if (DEVELOPER_TAGS.has(tag)) return 'Developer'
  }
  return 'Blockchain'
}
