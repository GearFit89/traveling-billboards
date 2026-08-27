import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeStyles } from '@/components/theme/ThemeStyles'
import {  siteContent } from '@/lib/content/'
import '@/styles/globals.css'

import styles from '@/styles/Home.module.css';
import { Navigation } from '@/components/navigation/Navigation';
import DevDashboard from '@/client/DevDashboard';
import { Toaster } from '@/components/ui/toaster';

const brainJunk = "6-7";// this is not needed


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Title Template: Keeps branding consistent while making pages dynamic
  title: {
    default: `${siteContent.tagline} | Tailgates 4 Jesus`,
    template: `%s | Tailgates 4 Jesus`,
  },
  description: siteContent.description, // Ensure this is under 160 characters
  authors: [{ name: "J.S.C" }],
  keywords: [
    "tailgates 4 jesus",
    "tailgates for jesus",
    "truck tailgate gospel signs",
    "gospel signs for trucks",
    "traveling billboards",
    "christian tailgate decals",
    "faith based truck signs",
    "mobile roadside ministry",
  ],
  
  // Open Graph: Crucial for social media preview cards (Facebook, X, iMessage)
  openGraph: {
    title: `Tailgates 4 Jesus - ${siteContent.tagline}`,
    description: siteContent.description,
    url: "https://tailgates4jesus.com",
    siteName: "Tailgates 4 Jesus",
    images: [
      {
        url: "/og-image.png", // Recommended size: 1200x630px
        width: 1200,
        height: 630,
        alt: "Tailgates 4 Jesus - Traveling Billboards Ministry",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: `Tailgates 4 Jesus - ${siteContent.tagline}`,
    description: siteContent.description,
    images: ["/og-image.png"],
  },

  // Canonical URLs prevent duplicate content issues
  alternates: {
    canonical: "https://tailgates4jesus.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" }, // Fallback for older browsers
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

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
        {/* Footer */}
      {/* <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} {siteContent?.siteName ?? 'Travel with the Gospel'}. All rights reserved.
        </p>
      </footer> */}
      </body>
    
    </html>
  )
}
