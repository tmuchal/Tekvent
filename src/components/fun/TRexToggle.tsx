import useEventStore from '../../store/useEventStore'

const TRexToggle = () => {
  const { showTRex, toggleTRex } = useEventStore()

  return (
    <button
      onClick={toggleTRex}
      aria-label={showTRex ? '공룡 숨기기' : '공룡 보이기'}
      title={showTRex ? '🦕 공룡 숨기기' : '🦕 공룡 보이기'}
      className={`absolute bottom-3 right-3 z-20 text-xl select-none transition-all duration-200 ${
        showTRex ? 'opacity-100 scale-110 animate-bounce' : 'opacity-30 scale-100'
      } hover:scale-125 cursor-pointer`}
    >
      🦕
    </button>
  )
}

export default TRexToggle
