import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'PAYgO Limited - Smart Digital Financial Platform',
  description: 'Smart Digital Financial Platform. Register, fund your wallet, transfer money, withdraw funds, and enjoy secure financial services.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'PAYgO Limited',
    description: 'Smart Digital Financial Platform. Register, fund your wallet, transfer money, withdraw funds, and enjoy secure financial services.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PAYgO Limited',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAYgO Limited',
    description: 'Smart Digital Financial Platform. Register, fund your wallet, transfer money, withdraw funds, and enjoy secure financial services.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  themeColor: '#1e293b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
