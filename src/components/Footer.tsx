import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-[#334155] mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Calendar subscribe */}
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">📆 Subscribe (iCal)</h4>
            <p className="text-sm text-[#64748B] mb-3">
              Add all events to your calendar app.
            </p>
            <a
              href="https://raw.githubusercontent.com/tmuchal/Tekvent/main/public/calendar.ics"
              className="inline-block text-xs px-3 py-1.5 rounded-lg bg-[#1E293B] border border-[#334155] text-[#93C5FD] hover:border-[#475569] transition-colors font-mono"
            >
              calendar.ics
            </a>
          </div>

          {/* JSON data */}
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">📋 Use the Data</h4>
            <p className="text-sm text-[#64748B] mb-3">
              All events available as JSON — free to use.
            </p>
            <div className="flex flex-col gap-1.5">
              <code className="text-xs text-[#94A3B8] bg-[#0F172A] border border-[#334155] px-2 py-1 rounded font-mono block">
                curl https://tmuchal.github.io/Tekvent/events.json
              </code>
            </div>
          </div>

          {/* Contributing */}
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-3">🤝 Contributing</h4>
            <p className="text-sm text-[#64748B] mb-3">
              Missing an event? Fork the repo, edit{' '}
              <code className="text-[#93C5FD] text-xs">events.json</code>, and open a PR.
            </p>
            <a
              href="https://github.com/tmuchal/Tekvent/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs px-3 py-1.5 rounded-lg bg-[#1E293B] border border-[#334155] text-[#93C5FD] hover:border-[#475569] transition-colors"
            >
              CONTRIBUTING.md →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#334155] pt-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[#64748B] text-sm">
            <Image
              src="/Tekvent/penguin.svg"
              alt="Tekvent mascot"
              width={20}
              height={20}
              className="opacity-60"
              unoptimized
            />
            <span>Built with 🐻‍❄️ by the community · MIT License</span>
          </div>
          <a
            href="https://github.com/tmuchal/Tekvent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors"
          >
            github.com/tmuchal/Tekvent
          </a>
        </div>
      </div>
    </footer>
  )
}
