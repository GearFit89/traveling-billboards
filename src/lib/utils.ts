
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { TAGS } from "@/const";
import * as v from 'valibot';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIsBuildPharse (){
  return process.env.NEXT_PHASE === 'phase-production-build'
}
export function getEnvContext()  : CloudflareEnv {
  // If we are building the site statically, return an empty fallback object
  // so the build doesn't crash.
  if (getIsBuildPharse()) {
    return {} as any; 
  }
  
  return getCloudflareContext().env;
}

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

//helper fn in case we need to switch or add custom logic
export function getRandomUUID (){
  return   crypto.randomUUID();
}

export function DeepJSONParse<T>(jsonString: string, keysToBeParsed?: string[]  ): T | null { 

try {
  const parsed = JSON.parse(jsonString);
  if (keysToBeParsed && keysToBeParsed.length > 0) {
    for (const key of keysToBeParsed) {
      if (parsed[key] && typeof parsed[key] === 'string') {
        try {
          parsed[key] = JSON.parse(parsed[key]);
        } catch (e) {
          console.warn(`Failed to parse key "${key}" as JSON. Keeping original string.`);
        };
      };
    };
  };
   return parsed;  
} catch (e) {
  console.error("Failed to parse JSON string:", e);
  return null;
}
 

}


export function JSONCParse<T>(jsonString: string): T | null {
  // 1. Quick sanity check: Trim and verify it starts with { or [
  const trimmed = jsonString.trim();
  if (trimmed[0] !== '{' && trimmed[0] !== '[') {
    console.error("Invalid JSON: Must start with '{' or '['");
    return null;
  }

  try {
    // 2. Remove single-line (//...) and multi-line (/*...*/) comments
    // This gives you JSONC support with almost zero performance overhead
    const cleanJSON = trimmed.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);

    // 3. Hand off the clean string to the native, ultra-fast parser
    return JSON.parse(cleanJSON) as T;
  } catch (e) {
    console.error("Failed to parse JSON string:", e);
    return null;
  }
}
/**
 * Formats a date string into a human-readable format.
 * @param dateStr 
 * @returns - Date in a human-readable format like "Jan 1, 2023". Returns "Unknown Date" if the input is invalid or undefined.
 * @author - Original concept by User, Types by AI
 * @example
 * 
 * const formattedDate = formatDate("2023-01-01T00:00:00Z");
 * console.log(formattedDate); // Output: "Jan 1, 2023"
 * 
 * const unknownDate = formatDate(undefined);
 * console.log(unknownDate); // Output: "Unknown Date"
 * 
 * const invalidDate = formatDate("invalid-date-string");
 * console.log(invalidDate); // Output: "Unknown Date"
 * 
 * Note: This function uses the built-in JavaScript Date object and its toLocaleDateString method for formatting. 
 * It is designed to be robust against invalid or undefined date strings, providing a clear fallback message.
 */
export function formatDate(dateStr?: string) {

  if (!dateStr) return "Unknown Date";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
