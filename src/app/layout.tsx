import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tekvent — Asia AI & Blockchain Events',
  description: 'Curated calendar of major AI and blockchain events across Asia and the Middle East.',
  openGraph: {
    title: 'Tekvent — Asia AI & Blockchain Events',
    description: 'Curated calendar of major AI and blockchain events across Asia and the Middle East.',
    url: 'https://tmuchal.github.io/Tekvent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
