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
