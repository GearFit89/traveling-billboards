import payload from 'payload'
import { should, it , describe, expect } from 'vitest'
import { db, tables, } from '../src/db'

describe("The db should use drizzle types", () => {
    db.select().from =(tables.users)
})