import { getCloudflareContext } from "@opennextjs/cloudflare";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getEnvContext() {
  // If we are building the site statically, return an empty fallback object
  // so the build doesn't crash.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {} as any; 
  }
  
  return getCloudflareContext().env;
}