// src/stubs/drizzle-kit-api.ts
const unavailable = () => {
  throw new Error('drizzle-kit is not available at runtime')
}
export const generateSQLiteDrizzleJson = unavailable
export const generateSQLiteMigration = unavailable
export const pushSQLiteSchema = unavailable
