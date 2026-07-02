import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [cloudflareTest({})],
  test: {
    // This tells Vitest to use the Cloudflare Workers execution environment
    environment: "cloudflare",
    
    // Disabling parallelism here keeps your debugging session stable
    fileParallelism: false, 
  },
});