import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache, // Keep R2 for HTML files
  queue: doQueue,                       // Keep the DO queue for re-rendering
  
  // Swap D1 for Durable Objects tag tracking
  tagCache: doShardedTagCache({
    baseShardSize: 12,
  }),
});
