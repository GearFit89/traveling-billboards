

export type SearchType = "signs" | "billboard" | "links" | "thoughts";
export type SignColumns = "*" | "id" | "comments" | "metadata"|"description"|"web_hits"|"qr_hits";
export type LinkColumns = "*" | "id" | "comments" | "metadata" | "description" | "web_hits"|"link";


const unSafeColumns = new Set<string>( ["auth_token"]); 
const safeTypes = new Set<SearchType>( ["signs", "billboard", "links", "thoughts"]);


 
export interface SearchParams {
    id: string;
    columns?: string[];
    type: SearchType;

}
 interface Options {
    first?:boolean; // Optional parameter to indicate if only the first result is needed, default is false
}
export interface ReturnData {
    success: boolean;
    data?: any; // Adjust this type based on your actual data structure
    error?: string;
}
interface  GetQueryReturnData <T> extends ReturnData {
    data?: T | T[] | null
}
export async function getQuery< T >(env:any, searchParams: SearchParams, options:Options={first:true}):Promise<GetQueryReturnData<T>> {
  
    const { id, columns =[] } = searchParams;
   
    if (!safeTypes.has(searchParams.type)) {
       return { success: false, error: "Invalid type parameter" };
    }
    let columnsStr = '';
    const filteredColumns = columns.filter(col => !unSafeColumns.has(col as string));
    if (filteredColumns.length === 0) {
        return { success: false, error: "Invalid columns parameter" };
    }
    try {
    // if/else here for flexibility in columns selection, later verus a ternary for simplicity and in case more code is needed in the future
    if ( filteredColumns.includes("*")) {
        columnsStr = "*";
         // Default to all columns if none specified
    }else {
        columnsStr = filteredColumns.join(", ");
    }
   const tableName = searchParams.type; //  the table name is the same as the type
    // 'MY_DATA' is the binding name from your toml
    const data =  (env.SQL_DB as D1Database).prepare(
        `SELECT ${columnsStr} FROM ${tableName} WHERE _id = ?`
    ).bind( id)
        const results = options.first
            ? (await data.first<T>() || null)
            : (await data.all()).results as T[];
    return {data:results, success: true};
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
export default getQuery;