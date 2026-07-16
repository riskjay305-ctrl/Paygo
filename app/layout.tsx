import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'PAYgO Limited - Smart Digital Financial Platform',
  description: 'Smart Digital Financial Platform. Register, Fund Wallet, Transfer Money, Buy Airtime, Buy Data and enjoy seamless digital financial services.',
  metadataBase: new URL('https://paygo-financial-app.vercel.app'),
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
    description: 'Smart Digital Financial Platform. Register, Fund Wallet, Transfer Money, Buy Airtime, Buy Data and enjoy seamless digital financial services.',
    images: [
      {
        url: 'https://paygo-financial-app.vercel.app/og-image.jpg',
        width: 1280,
        height: 1280,
        type: 'image/jpeg',
        alt: 'PAYgO Limited - Smart Digital Financial Platform',
      },
    ],
    type: 'website',
    locale: 'en_US',
    url: 'https://paygo-financial-app.vercel.app/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAYgO Limited',
    description: 'Smart Digital Financial Platform.',
    image: 'https://paygo-financial-app.vercel.app/og-image.jpg',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
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
