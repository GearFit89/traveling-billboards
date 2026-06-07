import { SearchType } from "./types";

export const TAGS = {
  SIGNS: "signs",
  LINKS: "links",
  SECTIONS: "sections"

} as const;

export const unSafeColumns = new Set<string>(["auth_token"]);
export const safeTypes = new Set<SearchType>([
  "signs",
  "billboard",
  "links",
  "thoughts",
]);
export const APP_IMAGE_URL = "/";


