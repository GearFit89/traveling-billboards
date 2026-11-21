import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getEnvContext()  : CloudflareEnv {
  
  try {
  return getCloudflareContext().env;

  } catch(e: unknown){
    console.warn("Error with cf context... falling back to {}", `Error: ${(e as Error).message}`)
    return {
      D1: process.env.LOCAL_D1_BINDING || ({} as any),
    } as CloudflareEnv;
  }
}
