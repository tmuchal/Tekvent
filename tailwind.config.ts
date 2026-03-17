import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F172A',
        surface: '#1E293B',
        border: '#334155',
        text: '#F8FAFC',
        muted: '#94A3B8',
        ai: '#3B82F6',
        chain: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
export default config
