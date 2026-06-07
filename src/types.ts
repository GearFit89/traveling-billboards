
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
  data: T;
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
// valibot schemas, mapped to types. Creates nice, clean code.
export type LinkSection = v. InferOutput<typeof s.SectionSchema>;
export type LinkData = v. InferOutput<typeof s.LinkDataSchema>;
export type SignData = v. InferOutput<typeof s.SignDataSchema>;
export type ThoughtData = v. InferOutput<typeof s.ThoughtSchema>;
export type CommentData = v. InferOutput<typeof s.CommentSchema>;
