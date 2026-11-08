import Cloudflare from "cloudflare";
import db, { tables } from ".";


export const cfClient = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_D1_API_TOKEN,
});

export async function httpCFQuery(sql: string, params: string[]) {
  let results = [];
  for await (const queryResult of cfClient.d1.database.query(
    process.env.CLOUDFLARE_D1_ID,
    {
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID,
      sql,
      params,
    },
  )) {
    console.log(queryResult.meta);
    results.push(...(queryResult.results || []));
  }

  return results
}
interface RunnableQuery {
  toSQL: () => {
    sql: string;
    params: unknown[];
  };
}

export async function runCFQuery<Q extends RunnableQuery>(query: Q) {
  const sqlQuery = query.toSQL();

  return await httpCFQuery(sqlQuery.sql, sqlQuery.params as string[]);
}
runCFQuery(db.select().from(tables.links));
