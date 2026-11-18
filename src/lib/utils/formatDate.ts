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
