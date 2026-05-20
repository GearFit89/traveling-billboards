import {
  SearchType,
  SearchParams,
  SetQueryOptions as Options,
  setQueryReturnData,
} from "@/types";
import { safeTypes, unSafeColumns } from "@/const";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Console from "@/utils/console";
const console = new Console("setQuery");
export async function setQuery(
  searchParams: SearchParams,
  options: Options = {
    first: true,
    extraSql: "",
    values: [],
    action: "UPDATE",
  },
): Promise<setQueryReturnData> {
  const { env } = getCloudflareContext() as { env: any };
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
    console.log(" executing\n");
    const updateStr = filteredColumns.map((col, i) => `${col} = ?`).join(", ");

    let queryAction = "";
    // Each case builds the specific SQL string for the action
    switch (options.action) {
      case "INSERT":
        {
          // Standard INSERT syntax
          queryAction = `
            INSERT INTO ${tableName}
            (${columnsStr})
            VALUES (${filteredColumns.map(() => `?`).join(", ")})`; //creates a  bunch of "?, n  "
        }
        break;

      case "UPSERT":
        {
          /*
           SQLite UPSERT: Attempts to insert, but if the 'id' (or primary key)
           already exists, it updates the row instead.
        */
          queryAction = `
          INSERT INTO ${tableName} ${columnsStr}
          VALUES (${filteredColumns.map(() => `?`).join(", ")})
          ON CONFLICT(id) DO UPDATE SET ${updateStr}
        `;
        }
        break;

      case "UPDATE":
        {
          // Standard UPDATE syntax with a WHERE clause
          queryAction = `
            UPDATE ${tableName}
            SET ${updateStr}
            WHERE 1=1
           ${id || id != "*" ? `AND id = ${id}` : ""}`; // makes use of the"*" sysmbol as a wildcard
        }
        break;

      default: {
        throw new Error(`Invalid action: ${options.action}`);
      }
    }

    // Combine the action with any extra SQL (like WHERE clauses or LIMITs)
    const query = `${queryAction} ${options.extraSql ? options.extraSql : ""}`;

    console.log("[setQuery] running sql \n", query, "\n [end]");
    await (env.SQL_DB as D1Database)
      .prepare(query)
      .bind(id, ...(options.values || []))
      .run();

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
export default setQuery;
