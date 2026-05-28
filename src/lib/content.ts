// Site-wide content configuration
// Edit this file to change text, labels, and metadata across the site

import type { IconKey } from './icons';

export interface SiteContent {
  // Brand
  siteName: string;
  tagline: string;
  description: string;
  
  // Navigation
  navLinks: Array<{
    href: string;
    label: string;
  }>;
  
  // Footer
  footerText: string;
}

export interface HomePageContent {
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  features: {
    sectionTagline: string;
    sectionHeading: string;
    items: Array<{
      iconKey: IconKey;
      title: string;
      description: string;
    }>;
  };
}

export interface ThoughtsPageContent {
  badge: string;
  title: string;
  subtitle: string;
  badgeIconKey: IconKey;
}

export interface LinksPageContent {
  title: string;
  subtitle: string;
  backToAllText: string;
  visitSiteText: string;
}

// ===========================================
// SITE CONTENT - Edit values below
// ===========================================

export const siteContent: SiteContent = {
  siteName: 'Traveling Billboards',
  tagline: 'Ideas on the Move',
  description: 'Capturing thoughts from the endless road. [More brand description goes here to explain the overarching mission of Traveling Billboards].',
  
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/links', label: 'Links' },
  ],
  
  footerText: '© Traveling Billboards. Ideas on the move.',
};

export const homePageContent: HomePageContent = {
  hero: {
    tagline: 'Ideas on the Move',
    titleLine1: 'Traveling',
    titleLine2: 'Billboards',
    description: 'A curated collection of reflections, signs, and resources gathered from journeys across America. [More hero description goes here to capture user attention].',
    primaryButtonText: 'Read Thoughts',
    primaryButtonHref: '/thoughts',
    secondaryButtonText: 'Browse Links',
    secondaryButtonHref: '/links',
  },
  stats: [
    { value: '12K+', label: 'Miles Traveled' },
    { value: '48', label: 'States Visited' },
    { value: '200+', label: 'Signs Shared' },
    { value: '50+', label: 'Curated Links' },
  ],
  features: {
    sectionTagline: 'What You\'ll Find',
    sectionHeading: 'Road-Tested Content',
    items: [
      {
        iconKey: 'thought',
        title: 'Fresh Thoughts',
        description: 'Reflections captured straight from the pavement. [More body description goes here to flesh out the thought card mockup].',
      },
      {
        iconKey: 'link',
        title: 'Curated Links',
        description: 'Handpicked resources and tools trusted on the journey. [More body description goes here to fill out the link card layout].',
      },
      {
        iconKey: 'location',
        title: 'Sign Context',
        description: 'Every idea tied back to its physical origin and location. [More body description goes here to explain map and sign data].',
      },
    ],
  },
};

export const thoughtsPageContent: ThoughtsPageContent = {
  badge: 'QR Landing Page',
  title: 'Roadside Thoughts',
  subtitle: 'Short reflections captured directly from the highway. [More subtitle description goes here to introduce the feed of scanned sign thoughts].',
  badgeIconKey: 'qrCode',
};

export const linksPageContent: LinksPageContent = {
  title: 'Curated Links',
  subtitle: 'Resources organized by travel and tech categories. [More subtitle description goes here to explain how these links help drivers].',
  backToAllText: 'All Sections',
  visitSiteText: 'Visit Link',
};