// Create: src/types/my-vars.d.ts (or any name)

declare global {
    namespace NodeJS {
        // TypeScript will "merge" this with the 30k line interface
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            SQL_KEY_SUPA: string;
            SQL_KEY_SUPA_ADMIN: string;
            URL_KEY_DB: string;
            SQL_KEY_SUPA_2: string;
            ESV_API_KEY: string;
            JWT_ACCESS_KEY: string;
            GMAIL_APP_PASS: string;
            MY_EMAIL: string;
            REDIS_URL: string;
            COOKIE_KEY: string;
        }
    }
}

export { };