export interface SignData {
    id: string; // Unique identifier for the sign
    comments: Comments[]; // Array of comments related to the sign
    // Add any other relevant fields as needed
    title:string;
    discription:string;
    metadata?: Record<string, any>; // Optional field for additional metadata
}
export interface Comments {
    title:string;
    date:number;
    content?:string;//plain text
    html:string;//static html saved in string format  in the db. 
}