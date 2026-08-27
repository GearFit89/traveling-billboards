export * from "./content"

import rawContent  from './content.json';
import type { FullSiteContent, ToastContentRegistry } from './content.d';

// Type assertion ensuring JSON matches the interfaces
export const contentRegistry = rawContent as unknown as FullSiteContent;
export const siteContent = contentRegistry.site;
export const homePageContent = contentRegistry.home;
export const thoughtsPageContent = contentRegistry.thoughts;
export const linksPageContent = contentRegistry.links;
export const messageBoardContent = contentRegistry.messageBoard;
export const toastContent: ToastContentRegistry = contentRegistry.toasts

/**
 * Helper utility to replace function logic inside JSON for dynamic QR code label matching
 */
export const getQrDynamicLabel = (path: string) => {
    const match = path.match(/\/signs\/(\d+)/);
    return  match ?  `Sign  ${match[1]} found! ` : "Oops no sign found";
  }

