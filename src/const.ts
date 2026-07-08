import { SearchType } from "./types";


//cach tags for revalidation and cache clearing
export const TAGS = {
  SIGNS: "signs",
  LINKS: "links",
  SECTIONS: "sections",
  GLOBAL: "global"

} as const;

export const unSafeColumns = new Set<string>(["auth_token"]);
export const safeTypes = new Set<SearchType>([
  "signs",
  "billboard",
  "links",
  "thoughts",
]);
export const APP_IMAGE_URL = "/";


export const LOCAL_STROAGE_KEYS = {
  MESSAGE_TOKEN: 'message_token'
}

export const COOKIE_KEYS = {
  MESSAGE_TOKEN: 'message_token',
  LINK_HIT: 'link_hit',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ADMIN_COOKIE: 'admin_cookie'
}

//pages sizes
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;


export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const SORT = {
    ASC: "ASC",
    DESC : "DESC"
}