import { SignDataStr, SignData, LinkData } from "@/types"; // Import necessary types
import { unstable_cache } from "next/cache"; // Next.js cache utility
import getQuery from "./getQuery"; // Database query utility
import { TAGS } from "@/const"; // Revalidation constants
import rawDevData from "@/data/mock-data.json"; // Local mock data
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Console from "@/utils/console";

// Type-safe mock data access
const devData = rawDevData as Record<string, any>;
const consoler = new Console("cache", { isDebugMode: true });
consoler.log("tester"); // custom logger, replaces the built-in console
interface QueryOptions {
  values?: string[]; // binded to the sql
  extraSql?: string;
  // Optional: for WHERE or ORDER BY clauses
  table: "signs" | "links";
  id: string;
  cols?: string[];
}
/**
 * Generic helper to handle the boilerplate of fetching and parsing JSON fields.
 * This keeps the actual cache functions clean and focused.
 */
async function fetchAndParse<T extends Record<string, any>>(
  // Restrict to valid tables

  devId: string,
  jsonField: keyof T, // The field that needs JSON.parse
  { id = "", extraSql = "", table, values = [], cols = ["*"] }: QueryOptions,
  defaultValue: any = [],
  // Fallback for the parsed field
) {
  // 1. Development Mode Guard
  //
  console.log("dev id", devId);
  if (process.env.NODE_ENV === "development") {
    console.log(" dev mode on");
    const [section, selecter] = devId.split("_");
    const data =
      selecter === "*"
        ? devData[section]
        : devData[section]?.[parseInt(selecter)];
    if (!data) {
      return {
        data: {},
        success: false,
        error: "cannot find mock data",
      };
    }
    return {
      data, // Access mock data
      success: true, // Mock successful response
      error: "", // No error in dev
    };
  }
  const { env } = getCloudflareContext();
  // 2. Fetch data using the shared getQuery utility
  const rawData = await getQuery<T>(
    env,
    { id, tables: [table], columns: cols },
    { first: true, extraSql, values },
  );

  // 3. Early exit if no data found
  if (!rawData?.data) return rawData;

  try {
    // 4. Parse specific JSON field dynamically
    const rawValue = (rawData.data as T)[jsonField]; // Get the stringified field
    const parsedValue =
      typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;

    return {
      ...rawData, // Return original structure
      data: {
        ...rawData.data, // Merge original data
        [jsonField]: parsedValue ?? defaultValue, // Replace string with object/array
      },
    };
  } catch (e) {
    console.error(`Failed to parse ${String(jsonField)} for ${table}:`, id, e); // Better logging

    return {
      ...rawData, // Return partial data on failure
      data: {
        ...rawData.data,
        [jsonField]: defaultValue, // Ensure frontend doesn't crash
      },
    };
  }
}

// --- Cached Functions ---

export const getSignCache = unstable_cache(
  async (env: any, signId: string) =>
    fetchAndParse<SignDataStr>(`sign_${signId}`, "comments", {
      id: signId,
      table: "signs",
      cols: ["*"],
    }), // Delegate logic
  ["sign_data"], // Unique cache key
  { tags: [TAGS.SIGNS] }, // Revalidation
);

export const getLinkCache = unstable_cache(
  async (
    id: string,
    cols: string[] = ["*"],
    extraSql: string = "",
    values: string[] = [],
  ) =>
    fetchAndParse<SignDataStr>(`link_${id}`, "metadata", {
      id,
      table: "signs",
      cols,
      extraSql,
      values,
    }), // Delegate logic
  ["link_data"], // Unique cache key
  { tags: [TAGS.LINKS] }, // Revalidation
);
