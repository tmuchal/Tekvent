import { getDdayText } from '../../lib/dateUtils'

interface DdayBadgeProps {
  startDate: string
  endDate: string
}

const DdayBadge = ({ startDate, endDate }: DdayBadgeProps) => {
  const { text, status } = getDdayText(startDate, endDate)

  const styles = {
    upcoming: 'bg-blue-50 text-blue-600',
    today: 'bg-amber-50 text-amber-600 animate-pulse',
    ongoing: 'bg-green-50 text-green-600',
    past: 'bg-gray-100 text-gray-400',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}
      aria-label={`행사 상태: ${text}`}
    >
      {text}
    </span>
  )
}

export default DdayBadge
