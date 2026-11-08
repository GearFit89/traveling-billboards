// Create: src/types/my-vars.d.ts (or any name)

declare global {
    namespace NodeJS {
        // TypeScript will "merge" this with the 30k line interface
        interface ProcessEnv {
           NODE_ENV: 'development' | 'production' | 'test';

            // Security, Administration, & Cache Control
            ADMIN_KEY: string;
            ADMIN_EMAIL: string;
            CACHE_CLEAR_KEY: string;
            JWT_SECRET: string;

            // Upstash Redis Caching (Crucial for distributed Cloudflare edge cache handlers)
            UPSTASH_REDIS_REST_URL: string;
            UPSTASH_REDIS_REST_TOKEN: string;

            // Cloudflare Global & Storage Bindings
            CLOUDFLARE_ACCOUNT_ID: string;
            CLOUDFLARE_D1_API_TOKEN: string;
            CLOUDFLARE_D1_ID: string;
            CLOUDFLARE_KV_ID: string;
            R2_IMAGE_KEY: string;

            // Supabase Database Integration
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

            // Email Notifications / Transaction Services
            RESEND_API_KEY: string;


        }
    }
}

export { };