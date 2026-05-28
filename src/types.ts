export interface SignData {
  id: string; // Unique identifier for the sign
  comments: Thought[]; // Array of comments related to the sign
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  web_hits:number;
  qr_hits:number;
  metadata?: Record<string, any>; // Optional field for additional metadata
}

export interface Thought {
  title: string;
  date: string;
  id:string;
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
  hits:number;
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
