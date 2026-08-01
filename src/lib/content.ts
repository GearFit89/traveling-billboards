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
      iconKey?: IconKey;
      link: string;
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
  noThoughtsMessage: string;
  thankYouMessage: string;
}

export interface LinksPageContent {
  title: string;
  subtitle: string;
  backToAllText: string;
  visitSiteText: string;
  searchHeaderTitle: string;
  searchHeaderDescription: string;
  searchPlaceholder: string;
  searchPanelTitle: string;
  searchPanelSubtitle: string;
  searchNoResults: string;
  searchHint: string;
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
    tagline: siteContent.tagline,
    titleLine1: 'The Gospel',
    titleLine2: 'On the Road',
    description: `

    Let's spead the message of hope and faith across the highways.
     By puting the gospel on your tailgate, we can reach people on the road with a message of encouragement and inspiration. 
     Join us in this journey to share the good news  with travelers everywhere.


    `
    
    ,
    primaryButtonText: 'Explore Signs',
    primaryButtonHref: '/signs',
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
        title: 'Inspiring Thoughts',
        description: 'We put thoghts related to each sign made. To share the gospel in new ways.',
        link: '/signs',
      },
      {
        iconKey: 'link',
        title: 'Curated Links',
        description: 'Handpicked resources and tools trusted on the journey. ',
        link: '/links',
      },
      // {
        
      //   title: 'Questions & Answers',
      //   description: 'We have a live chat and text panel to answer questions about the gospel and faith.',
      //   link: '/chat',
      // },
      {
        title: "Join the Journey",
        iconKey: 'users',
        link: '/join',
        description: 'Be part of the movement to share the gospel on the road. Join us in spreading hope and faith. Join the Tailgate Club and add our signs to your tailgate, and help us reach more travelers with the message of the gospel.',
      }

    ],
  },
};

export const thoughtsPageContent: ThoughtsPageContent = {
  badge: 'QR Landing Page',
  title: 'Roadside Thoughts',
  subtitle: 'Short reflections captured directly from the highway. [More subtitle description goes here to introduce the feed of scanned sign thoughts].',
  badgeIconKey: 'qrCode',
  noThoughtsMessage: 'No thoughts found for this sign.',
  thankYouMessage: 'Thanks for scanning the QR code!',
};

export const linksPageContent: LinksPageContent = {
  title: 'Gospel Links',
  subtitle: 'Explore all gospel links.',
  backToAllText: 'Back',
  visitSiteText: 'Visit Link',
  searchHeaderTitle: 'Search the entire links library',
  searchHeaderDescription: 'Search by title or description in real time, with instant results as you type.',
  searchPlaceholder: 'Search all links...',
  searchPanelTitle: 'Find links quickly',
  searchPanelSubtitle: 'Type a keyword and we’ll show matching resources immediately.',
  searchNoResults: 'No matching links found. Try another keyword.',
  searchHint: 'Search any link from the current list.'
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
    items: Array<{ iconKey?: IconKey; title: string; description: string, link: string }>;
  };
}

export interface ThoughtsPageContent {
  badge: string;
  title: string;
  subtitle: string;
  badgeIconKey: IconKey;
  noThoughtsMessage: string;
  
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
