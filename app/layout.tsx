import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thief Puzzle Ritual',
  description: 'Light 20-level cartoon NFT puzzle game'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
