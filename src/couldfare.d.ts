import type { D1Database, KVNamespace } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    // 👈 Your database bindings go here manually
    D1: D1Database;     
    KV: KVNamespace; 
  }
  
}

