import payload from 'payload';
import * as schemas from '@/payload-generated-schema'

export const db = payload.db.drizzle

export const tables = schemas

export default db;

