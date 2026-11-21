import * as v from 'valibot';

/**
 * Dynamically creates a picklist schema based on the keys of a Valibot Object Schema.
 * Useful for validating dynamic SQL column selections. It turns an object with a column that represents keys to 
 * an actual picklist. So that a program can vaildate a column from the client. To avoid SQL interjection.
 * @author Original concept by User, Types by AI
 * @example
 * 
 *import * as v from 'valibot';
import { createColumnSchema } from './your-file-path'; // Path to your function

// 1. Define your standard database row schema
const UserSchema = v.object({
  id: v.number(),
  username: v.string(),
  email: v.string(),
  password_hash: v.string(), // A column you might want to protect, but it exists
  created_at: v.string(),
});

// 2. Dynamically generate the picklist schema from UserSchema keys
// This will only allow: 'id' | 'username' | 'email' | 'password_hash' | 'created_at'
const AllowedColumnSchema = createColumnSchema(UserSchema);

// 3. Simulate client requests
const validClientInput = 'username';
const maliciousClientInput = 'id; DROP TABLE users; --';

// --- Validation Implementation ---

try {
  // This will PASS because 'username' is a valid key of UserSchema
  const validatedColumn = v.parse(AllowedColumnSchema, validClientInput);
  console.log(` Safe to use in SQL query: SELECT ${validatedColumn} FROM users;`);
  
} catch (error) {
  console.error("Validation failed:", error.message);
}

try {
  // This will FAIL and throw a Valibot issue, blocking SQL injection completely
  const validatedColumn = v.parse(AllowedColumnSchema, maliciousClientInput);
  
} catch (error) {
  console.log(` Blocked potential SQL injection! Error: ${error.message}`);
}
 */
export function createColumnSchema<TEntries extends v.ObjectEntries>(
  objectSchema: v.ObjectSchema<TEntries, undefined>
) {
  // Get the keys from the object entries at runtime
  const keys = Object.keys(objectSchema.entries) as Array<keyof TEntries & string>;
  
  //  Fallback check just in case an empty schema is passed
  if (keys.length === 0) {
    throw new Error("Schema must have at least one property to extract columns.");
  }

  // Return a picklist schema using the extracted keys
  // We cast it to a tuple because v.picklist expects a read-only array/tuple
  return v.picklist(keys as [string, ...string[]]);
}
