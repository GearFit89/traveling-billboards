import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeStyles } from '@/components/theme/ThemeStyles'
import { siteContent } from '@/lib/content'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteContent.siteName} | ${siteContent.tagline}`,
  description: siteContent.description,
  authors: [{ name: "J.S.C" }],
  keywords: [
    "gospel signs",
    "traveling ministry",
    "traveling billboards",
    "christian outreach",
    "faith based signs",
    "gospel message",
    "roadside ministry",
    "mobile billboards",
  ],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <ThemeStyles />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}

      </body>
    </html>
  )
}
