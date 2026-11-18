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
