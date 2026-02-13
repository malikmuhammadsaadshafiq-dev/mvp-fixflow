import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FixFlow - Tenant Maintenance Coordination',
  description: 'Streamline property maintenance workflows between managers and residents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}