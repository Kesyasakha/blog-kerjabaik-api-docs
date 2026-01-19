import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog Kerjabaik AI - API Documentation',
  description: 'Dokumentasi API untuk Blog Kerjabaik AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}


