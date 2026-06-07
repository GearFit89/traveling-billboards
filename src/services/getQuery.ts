
import { D1Database } from "@cloudflare/workers-types";

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

const unSafeColumns = new Set<string>(["auth_token"]);
const safeTypes = new Set<SearchType>([
  "signs",
  "billboard",
  "links",
  "thoughts",
]);

export interface SearchParams {
  id: string;
  columns?: string[];
  tables: SearchType[];
}
interface Options {
  first?: boolean;
  extraSql?: string; // Optional parameter to indicate if only the first result is needed, default is false
  values?: string[];
}
export interface ReturnData {
  success: boolean;
  data?: any; // Adjust this type based on your actual data structure
  error?: string;
}
interface GetQueryReturnData<T> extends ReturnData {
  data?: T | T[] | null;
}
export async function getQuery<T>(
  env: any,
  searchParams: SearchParams,
  options: Options = {
    first: true,
    extraSql: "",
    values: [],
  },
): Promise<GetQueryReturnData<T>> {
  const { id, columns = [] } = searchParams;

  if (searchParams.tables.every((table) => safeTypes.has(table))) {
    return { success: false, error: "Invalid type parameter" };
  }
  let columnsStr = "";
  const filteredColumns = columns.filter(
    (col) => !unSafeColumns.has(col as string),
  );
  if (filteredColumns.length === 0) {
    return { success: false, error: "Invalid columns parameter" };
  }
  try {
    // if/else here for flexibility in columns selection, later verus a ternary for simplicity and in case more code is needed in the future
    if (filteredColumns.includes("*")) {
      columnsStr = "*";
      // Default to all columns if none specified
    } else {
      columnsStr = filteredColumns.join(", ");
    }
    const tableName = searchParams.tables.join(", "); //  the table name is the same as the type
    // 'MY_DATA' is the binding name from your toml
    console.log("[getQuery] executing\n");
    const query = `SELECT ${columnsStr} FROM ${tableName} WHERE 1=1
              ${id || id != "*" ? `AND id = ${id}` : ""}
              ${options.extraSql ? options.extraSql : ""}
              `;
    console.log("[getQuery] running sql \n", query, "\n [end]");
    const data = (env.SQL_DB as D1Database)
      .prepare(query)
      .bind([id, ...(options.values || [])]);
    const results = options.first
      ? (await data.first<T>()) || null
      : ((await data.all()).results as T[]);
    return { data: results, success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
export default getQuery;
