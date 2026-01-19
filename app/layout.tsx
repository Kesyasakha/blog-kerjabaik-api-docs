import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'Internal API Documentation',
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
