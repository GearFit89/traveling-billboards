declare interface SignData {
  id: string; // Unique identifier for the sign
  comments: Comments[]; // Array of comments related to the sign
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  metadata?: Record<string, any>; // Optional field for additional metadata
}
declare interface SignDataStr {
  id: string; // Unique identifier for the sign
  comments: string; // Array of comments related to the sign
  // Add any other relevant fields as needed
  title: string;
  img_key: string;
  img_alt: string;
  discription: string;
  metadata?: string; // Optional field for additional metadata
}
declare interface Comments {
  title: string;
  date: number;
  content?: string; //plain text
  html: string; //static html saved in string format  in the db.
}
