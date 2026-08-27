import type {   IconKey} from  "../icons"

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
    items: Array<{
      iconKey?: IconKey;
      title: string;
      description: string;
      link: string;
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
  qrModal: {
    description: string;
    dynamicLabelTemplate: string;
    fallbackLabel: string;
  };
}

export interface LinksPageContent {
  title: string;
  subtitle: string;
  backToAllText: string;
  visitSiteText: string;
  searchHeaderTitle?: string;
  searchHeaderDescription?: string;
  searchPlaceholder?: string;
  searchPanelTitle?: string;
  searchPanelSubtitle?: string;
  searchNoResults?: string;
  searchHint?: string;
}

export interface MessageBoardContent {
  hero: { label: string; title: string; description: string };
  liveChatCard: {
    title: string;
    description: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
  textPanel: {
    headerTitle: string;
    statusBadge: string;
    messages: Array<{ type: 'incoming' | 'outgoing'; text: string }>;
    inputPlaceholder: string;
    sendBtnText: string;
  };
  submit: {
    optional: string;
    emailText: string;
    placeholder: string;
    sending: string;
    sendBtn: string;
    backBtn: string;
    requestTitle: string;
  };
}

export interface ToastMessageConfig {
  success: string;
  error: string;
}

export interface ToastContentRegistry {
  copy: ToastMessageConfig;
  share: ToastMessageConfig;
}

export interface FullSiteContent {
  site: SiteContent;
  home: HomePageContent;
  thoughts: ThoughtsPageContent;
  links: LinksPageContent;
  messageBoard: MessageBoardContent;
  toasts: ToastContentRegistry;
}

// Module declaration to automatically resolve imported JSON files as FullSiteContent
declare module '*.json' {
  const value: FullSiteContent;
  export default value;
}