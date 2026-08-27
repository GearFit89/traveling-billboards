import { formatDate } from "@/lib/utils";
import { Row } from "./use-collection-crud";

export *   from "@/lib/utils"



export function nextKey(rows: Row[], fieldKey: string): number {
  const keys = rows.map(row => Number(row[fieldKey])).filter(fk => !isNaN(fk));
  return Math.max(...keys, 0) + 1;
}

/**
 * Returns today's date in the format "YYYY-MM-DD".
 * @returns - Today's date in the from "YYYY-MM-DD"
 * 
 * @example const today = todayDateString();
 * console.log(today); // Output: "2023-01-01" (for example)
 */
export function todayDateString(): string {
  return new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
}