import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeStyles } from '@/components/theme/ThemeStyles'
import { siteContent } from '@/lib/content'
import '@/styles/globals.css'

import styles from '@/styles/Home.module.css';
import { Navigation } from '@/components/navigation/Navigation';
import DevDashboard from '@/client/DevDashboard';
import { Toaster } from '@/components/ui/toaster';

const brainJunk = "6-7";// this is not needed


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ` ${siteContent.tagline}`,
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
        <Navigation />
        {children}
        {process.env.NODE_ENV === 'development' && <DevDashboard /> }

        <Toaster />
        
        
 <footer className={styles.footer}>
        <p className={styles.footerText}>
          {siteContent.siteName.split(' ')[0]}
          {/* <span className={styles.footerAccent}>.</span>{' '} */}
          {siteContent.siteName.split(' ').slice(1).join(' ')} — {siteContent.footerText}
        </p>
      </footer>
      </body>
    
    </html>
  )
}
