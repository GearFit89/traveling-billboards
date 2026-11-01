
import * as s from "@/lib/schemas";
import * as v from "valibot";

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


export type SetAction = "UPDATE" | "UPSERT" | "INSERT" | "DELETE";

// valibot schemas, mapped to types. Creates nice, clean code.
export type LinkSection = v. InferOutput<typeof s.SectionSchema>;
export type LinkData = v. InferOutput<typeof s.LinkDataSchema>;
export type SignData = v. InferOutput<typeof s.SignDataSchema>;
export type ThoughtData = v. InferOutput<typeof s.ThoughtSchema>;
export type CommentData = v. InferOutput<typeof s.CommentSchema>;



export type Table = "signs" | "thoughts"| "sections" | "links";
export type MessageType = "support"|"prayer"|"question";

export interface LinkFilters {
    
    sections: string[];
    [key: string]: (string | number )[]|(string | number | null) ; // Allow any other key with an array of strings, numbers, or null values
    //TODO: Add more filters as needed
}


export interface SetQueryOptions extends QueryOptions {
  action: SetAction;
  insertValues?: string;
}


export interface QueryOptions {
  first?: boolean;
  extraSql?: string; // Optional parameter to indicate if only the first result is needed, default is false
  values?: string[];
}
export interface SuccessReturn<T> {
  success: true;
  data: T;
  error?: never;
  fullError?: never;
  message?: string;
}

export interface ErrorReturn {
  success: false;
  data?: never;
  error: string;
  fullError?: Error;
  message?: string;
}

export type ReturnData<T> = SuccessReturn<T> | ErrorReturn;

export type ReturnStatus =
  | {
      success: true;
      error?: never;
      fullError?: never;
      message?: string;
    }
  | {
      success: false;
      error: string;
      fullError?: Error;
      message?: string;
    };

export interface setQueryReturnData {
  success: boolean;

  error?: string;
}