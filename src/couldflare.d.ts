import type { D1Database, KVNamespace, R2Bucket } from '@cloudflare/workers-types';

declare global {
  interface CloudflareEnv {
    //  Your database bindings go here manually
    D1: D1Database;     
    KV: KVNamespace; 
    R2_IMAGES: R2Bucket;
    NEXT_INC_CACHE_R2_BUCKET: R2Bucket;
  }
  
}

