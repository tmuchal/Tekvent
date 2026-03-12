import {
  format,
  parseISO,
  differenceInCalendarDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * Format a date range as "2026.04.20 ~ 04.23"
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  if (startDate === endDate) {
    return format(start, 'yyyy.MM.dd')
  }
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'dd')}`
  }
  return `${format(start, 'yyyy.MM.dd')} ~ ${format(end, 'MM.dd')}`
}

/**
 * Format a date range in Korean: "4월 20일 ~ 23일"
 */
export function formatDateKorean(startDate: string, endDate: string): string {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  if (startDate === endDate) {
    return format(start, 'M월 d일', { locale: ko })
  }
  if (start.getMonth() === end.getMonth()) {
    return `${format(start, 'M월 d일', { locale: ko })} ~ ${format(end, 'd일', { locale: ko })}`
  }
  return `${format(start, 'M월 d일', { locale: ko })} ~ ${format(end, 'M월 d일', { locale: ko })}`
}

/**
 * Returns the number of days until the given date (positive = future, negative = past)
 */
export function getDaysUntil(startDate: string): number {
  return differenceInCalendarDays(parseISO(startDate), new Date())
}

/**
 * Returns d-day text and status for display
 */
export function getDdayText(
  startDate: string,
  endDate: string
): { text: string; status: 'upcoming' | 'today' | 'ongoing' | 'past' } {
  const now = new Date()
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  const daysUntilStart = differenceInCalendarDays(start, now)
  const daysUntilEnd = differenceInCalendarDays(end, now)

  if (daysUntilEnd < 0) {
    return { text: '종료', status: 'past' }
  }
  if (daysUntilStart <= 0 && daysUntilEnd >= 0) {
    return { text: '진행 중', status: 'ongoing' }
  }
  if (daysUntilStart === 0) {
    return { text: 'TODAY', status: 'today' }
  }
  return { text: `D-${daysUntilStart}`, status: 'upcoming' }
}

/**
 * Returns an array of calendar cells for a month grid.
 * Leading nulls represent days before the 1st, trailing nulls pad to complete the last row.
 */
export function getCalendarDays(year: number, month: number): (number | null)[] {
  const start = startOfMonth(new Date(year, month))
  const end = endOfMonth(new Date(year, month))
  const days = eachDayOfInterval({ start, end }).map((d) => d.getDate())

  const leadingNulls = Array<null>(getDay(start)).fill(null)
  const total = leadingNulls.length + days.length
  const trailingNulls = Array<null>(total % 7 === 0 ? 0 : 7 - (total % 7)).fill(null)

  return [...leadingNulls, ...days, ...trailingNulls]
}

/**
 * Check if a YYYY-MM-DD date string falls within [startDate, endDate] inclusive
 */
export function isDateInRange(date: string, startDate: string, endDate: string): boolean {
  return date >= startDate && date <= endDate
}

/**
 * Format a date as YYYY-MM-DD string
 */
export function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
