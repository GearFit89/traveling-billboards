// app/api/users/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: Promise<{sign: string}>}) {
    const resolvedParams = await params;
    const worker = getCloudflareContext() as any; // Cast to 'any' to access env
    const env = worker.env as unknown as Record<string, D1Database>;
    // 'MY_DATA' is the binding name from your toml
    const { results } = await env.SQL_DB.prepare(
        "SELECT * FROM sign WHERE id = ?"
    ).bind(resolvedParams.sign).all();

    return Response.json(results);
}
