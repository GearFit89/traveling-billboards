import { getCloudflareContext } from "@opennextjs/cloudflare";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getEnvContext(){
  return getCloudflareContext().env
}