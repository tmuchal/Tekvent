import { AnimatePresence, motion } from 'framer-motion'
import useEventStore from './store/useEventStore'
import Header from './components/layout/Header'
import Toolbar from './components/layout/Toolbar'
import CalendarView from './components/views/CalendarView'
import TableView from './components/views/TableView'
import EventModal from './components/EventModal'

const fadeVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

const App = () => {
  const viewMode = useEventStore((s) => s.viewMode)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-[1100px] mx-auto px-4 py-6">
        <Toolbar />
        <div className="mt-4" aria-live="polite" aria-label={viewMode === 'calendar' ? '캘린더 뷰' : '테이블 뷰'}>
          <AnimatePresence mode="wait">
            {viewMode === 'calendar' ? (
              <motion.div
                key="calendar"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <CalendarView />
              </motion.div>
            ) : (
              <motion.div
                key="table"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TableView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-12 py-6 text-center text-xs text-gray-400">
        <p>🌏 Tekvent — 글로벌 AI · 블록체인 컨퍼런스 일정</p>
        <a
          href="https://github.com/tmuchal/Tekvent"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors mt-1 inline-block"
        >
          GitHub
        </a>
      </footer>

      <EventModal />
    </div>
  )
}

export default App
