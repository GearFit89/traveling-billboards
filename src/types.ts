export interface SignData {
  id: string; // Unique identifier for the sign
  comments: Comments[]; // Array of comments related to the sign
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  metadata?: Record<string, any>; // Optional field for additional metadata
}
export interface SignDataStr {
  id: string; // Unique identifier for the sign
  comments: string; // Array of comments related to the sign
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  metadata?: string; // Optional field for additional metadata
}
export interface Comments {
  title: string;
  date: number;
  content?: string; //plain text
  html: string; //static html saved in string format  in the db.
}
export interface LinkData {
  id: string; // Unique identifier for the sign
  link: string;
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  section: string;
  metadata?: Record<string, any>; // Optional field for additional metadata
}
export type SearchType = "signs" | "billboard" | "links" | "thoughts";
export type SignColumns =
  | "*"
  | "id"
  | "comments"
  | "metadata"
  | "description"
  | "web_hits"
  | "qr_hits";
export type LinkColumns =
  | "*"
  | "id"
  | "comments"
  | "metadata"
  | "description"
  | "web_hits"
  | "link"
  | "qr_hits"
  | "section"
  | "title";

export interface SearchParams {
  id: string;
  columns?: string[];
  tables: SearchType[];
}
export interface QueryOptions {
  first?: boolean;
  extraSql?: string; // Optional parameter to indicate if only the first result is needed, default is false
  values?: string[];
}
export interface ReturnData<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface setQueryReturnData {
  success: boolean;

  error?: string;
}
export type SetAction = "UPDATE" | "UPSERT" | "INSERT" | "DELETE";
export interface SetQueryOptions extends QueryOptions {
  action: SetAction;
  insertValues?: string;
}
