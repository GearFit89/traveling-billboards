/** Wrap a query in the same discriminated result at every call site. */
export async function runQuery<T>(
  query: () => Promise<T>,
): Promise<{ data: T; success: true } | { success: false; error: string }> {
  try {
    return { data: await query(), success: true };
  } catch (error: unknown) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "Failed to run query",
      success: false,
    };
  }
}
