
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';
export function D1Debugger({ env }: { env: any }) {
    return {
        log: (message: string) => {
            console.log(`[D1Debugger] ${message}`);
        },
        query: async (query: string, params: any[] = []) => {
            try {
                const preparedQuery = env.SQL_DB.prepare(query);
                const boundQuery = preparedQuery.bind(...params);
                const results = await boundQuery.all();
                console.log(`[D1Debugger] Query executed successfully: ${query} with params ${JSON.stringify(params)}`);
                console.log(`[D1Debugger] Results: ${JSON.stringify(results)}`);
                return results;
            } catch (error) {
                console.error(`[D1Debugger] Query execution failed: ${query} with params ${JSON.stringify(params)}`);
                console.error(`[D1Debugger] Error: ${(error as Error).message}`);
                throw error;
            }     }   };
        }

       export const debugD1Results= (results: D1Result):D1Result => {
          DEBUG_MODE &&  console.log(`[D1Debugger] Debugging D1 results (d1 meta is also there): ${JSON.stringify(results)}`);

            return results;
        }


