// app/api/users/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function _GET({params}: {params: {sign: Promise<string>}}) {
    const worker = getCloudflareContext() as any; // Cast to 'any' to access env
       const env = worker.env as unknown as Record<string, D1Database>;
    // 'MY_DATA' is the binding name from your toml
    const { results } = await env.SQL_DB.prepare(
        "SELECT * FROM sign WHERE id = ?"
    ).bind(await params.sign).all();

    return Response.json(results);
}