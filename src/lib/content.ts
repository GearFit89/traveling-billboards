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
export interface ToastMessageConfig {
    success: string;
    error: string;
}

export interface ToastContentRegistry {
    copy: ToastMessageConfig;
    share: ToastMessageConfig;
}

// ===========================================
// SITE CONTENT - Edit values below
// ===========================================

export const siteContent: SiteContent = {
  siteName: 'Tailgates4Jesus.com',
  tagline: 'Travel with the Gospel',
  description: 'Signs that advertise the gospel on trucks',
  
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/sgins', label: 'Signs' },
    { href: '/links', label: 'Links' },
  ],
  
  footerText: '© Traveling Billboards. - Travel with the Gospel' 
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
  backToAllText: 'Back',
  visitSiteText: 'Visit Link',
};


export interface SiteContent {
  siteName: string;
  tagline: string;
  description: string;
  navLinks: Array<{ href: string; label: string }>;
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
  stats: Array<{ value: string; label: string }>;
  features: {
    sectionTagline: string;
    sectionHeading: string;
    items: Array<{ iconKey: IconKey; title: string; description: string }>;
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

export interface MessageBoardContent {
  hero: { label: string; title: string; description: string };
  liveChatCard: { title: string; description: string; primaryBtnText: string; secondaryBtnText: string };
  textPanel: {
    headerTitle: string;
    statusBadge: string;
    messages: Array<{ type: 'incoming' | 'outgoing'; text: string }>;
    inputPlaceholder: string;
    sendBtnText: string;
  };
    submit:{
      optional: string;
      emailText:string;
      placeholder:string;
      sending:string;
      sendBtn:string;
      backBtn:string;
      requestTitle:string;
    }

}

// Master interface mapping keys to content structures
export interface FullSiteContent {
  site: SiteContent;
  home: HomePageContent;
  thoughts: ThoughtsPageContent;
  links: LinksPageContent;
  messageBoard: MessageBoardContent;
}

// ===========================================
// RAW DATA OBJECTS
// ===========================================



export const messageBoardContent: MessageBoardContent = {
  hero: {
    label: 'Need a thoughtful answer?',
    title: 'Questions',
    description: 'Choose the best way to connect. Chat live with a person or use the text-style panel for a faster message conversation.',
  },
  liveChatCard: {
    title: 'Chat with a person',
    description: 'Speak directly with someone who can help answer faith questions, explain Bible passages, and share encouragement.',
    primaryBtnText: 'Start live chat',
    secondaryBtnText: 'Chat options',
  },
  textPanel: {
    headerTitle: 'Text message panel',
    statusBadge: 'Online',
    messages: [
      { type: 'incoming', text: 'Hi there! How can we help with your question today?' },
      { type: 'outgoing', text: 'I want a clear Bible answer and a friendly response.' },
      { type: 'incoming', text: 'Great! You can send your message here and we’ll reply in chat style.' },
    ],
    inputPlaceholder: 'Talk to someone',
    sendBtnText: 'Send a message',
  },
  submit:{
    placeholder:"Write a message...",
    sendBtn:"Send a message",
    backBtn:"Close",
    sending: "Sending...",
    optional: "Optional",
    emailText: "Enter Email",
    requestTitle: "Send Message"
  }
};

// Map everything to a central registry
const contentRegistry: FullSiteContent = {
  site: siteContent,
  home: homePageContent,
  thoughts: thoughtsPageContent,
  links: linksPageContent,
  messageBoard: messageBoardContent,
};
// Create the typed object containing the actual text
export const toastContent: ToastContentRegistry = {
    copy: {
        success: "Copied to clipboard",
        error: "Failed to copy text",
    },
    share: {
        success: "Share successful",
        error: "Failed to share text",
    },
};

/**
 * Retrieves specific layout configuration context safely with type inferences
 */
