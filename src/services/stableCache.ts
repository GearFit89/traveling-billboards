import { safeToString } from "@/utils/strings";
import Console from "@/utils/console";

type KVGetTypes = "text" | "json" | "arrayBuffer" | "stream";

interface GetOptions {
  type?: KVGetTypes; 
  cacheTtl?: number;
}

interface PutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any; 
}

export interface Options {
  ttl?: number;
  tags?: string[];
  getOptions?: GetOptions;
  putOptions?: PutOptions;
  revalidate?: number | false;
}

const console = new Console("stable_cache");

/**
 * Passthrough wrapper that keeps function signatures working
 * while bypassing manual unstable_cache, KV caching layer.
 */
export function stableCache<F extends (...args: any[]) => any>(
  fn: F, 
  id: string, 
  options?: Options
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  return async (...args: Parameters<F>): Promise<ReturnType<F>> => {
    // Simply execute the function directly from D1/source
    return await fn(...args);
  };
}

export default stableCache;