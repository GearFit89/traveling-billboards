import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import NavBar from "@/ui/NavBar";
import desktopNavStyles from "@/ui/DesktopNav.module.css";
import mobileNavStyles from "@/ui/MobileNav.module.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traveling Billboards",
  description: "A curated space for links, signs, and reflections worth sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*This is where the nav bar goes, i May change the links lateron.
				Currently it has home, thoughts, and links. Thoughts will be a page where
				 I can post my thoughts on various topics,
				 and links will be a page where I can post links to things I find interesting.

				*/}
        {/*  DESKTOP: hidden by default, visible on md screens and up */}
        {/* DESKTOP VIEW: Fixed top */}
        <nav className={desktopNavStyles.desktopWrapper}>
          <NavBar />
        </nav>

        {/* MOBILE VIEW: Fixed bottom */}
        <nav className={mobileNavStyles.mobileWrapper}>
          <NavBar />
        </nav>
        {children}
        <footer
          className="text-center p-4 text-sm text-gray-500 mb-24 md:mb-0"
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} Traveling Billboards. All rights
          reserved.
        </footer>
      </body>
    </html>
  );
}
