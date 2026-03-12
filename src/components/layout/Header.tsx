import { Github } from 'lucide-react'

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-[1100px] mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌏</span>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-none">Tekvent</h1>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5 hidden sm:block">
              AI · Blockchain Conference Calendar
            </p>
          </div>
        </div>
        <a
          href="https://github.com/tmuchal/Tekvent"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub 레포지토리"
          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded"
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  )
}

export default Header
