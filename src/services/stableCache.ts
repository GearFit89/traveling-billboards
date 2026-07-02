import { getCloudflareContext } from "@opennextjs/cloudflare";
import { unstable_cache } from "next/cache";
import { safeToString } from "@/utils/strings";
import { undefined } from "valibot";
import Console from "@/utils/console";
import { TAGS } from "@/const";

type KVGetTypes = "text" | "json" | "arrayBuffer" | "stream";

interface GetOptions {
  // Use the exact union type Cloudflare expects
  type?: KVGetTypes; 
  cacheTtl?: number;
}

interface PutOptions {
  expiration?: number;
  expirationTtl?: number;
  // Cloudflare allows any metadata object, but it must be an object
  metadata?: any; 
}

export interface Options {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Shared tag for cache invalidation across multiple entries
  getOptions?: GetOptions;
  putOptions?: PutOptions;
}
// clean use of a logging system 

const console = new Console("stable_cache");

export function stableCache<F extends (...args: any[]) => any>(fn: F, id: string, options?: Options): F {
  const cachedFn = unstable_cache(
    async (...args: Parameters<F>): Promise<ReturnType<F> | null> => {
      try{
      const { env } = getCloudflareContext();
      const cacheKey = id;

      /// Determine the get type, defaulting to "text" if not specified
      const getType = (options?.getOptions?.type || "text") as KVGetTypes;


      // Try to get from cache with custom get options
      const cachedResult = await env.KV.get<any>(cacheKey, getType as unknown as any); // beacuse the get method has overloads it can't use KVgetTypes.

      if (cachedResult) {   /// Determine the get type, defaulting to "text" if not specified

        console.log("using cache ", cacheKey)
        // if the cached result is a string and the get type is json, parse it before returning
        if (getType === "json" && typeof cachedResult === "string") {
          return JSON.parse(cachedResult) as ReturnType<F>;
        }
        return cachedResult as ReturnType<F>;
      }
      console.log("no data in cache, calling the fn")
const result = await fn(...args);
      // Execute function if not cachedexport function stableCache<F extends (...args: any[]) => any>(fn: F, id: string, options?: Options): F {
 
       

   
     

      // Try to get from cache with custom get options
     
      const resultStr =  safeToString(result);
 
      // Store in cache with custom put options
      await env.KV.put(cacheKey, resultStr, {
        expirationTtl: options?.putOptions?.expirationTtl || options?.ttl ,
        ...(options?.putOptions?.metadata && { metadata: options.putOptions.metadata }),
      });

      return result;
      } catch(e){
        console.error("KV error ",e);
        return null;
  
}
    },
    [id], // Unique cache key per id
    {
      tags: [TAGS.GLOBAL, ...options?.tags || []] , // Shared tag for invalidation
      revalidate: options?.ttl,
    }
  );

  return cachedFn as F;

}
export default stableCache;