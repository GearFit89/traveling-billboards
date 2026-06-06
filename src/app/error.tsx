
"use client"

import ErrorPage from "@/components/ErrorPage";


import { redirect } from "next/navigation";
export default function GlobalError({ error, code }: { error: Error , code?: number }) {
   
  console.error("Global error:", error);
  return <ErrorPage 
     message={error.message || "An unexpected error occurred. Please try again later."}
    reset={redirect('/')}
    code={code || 500}
  />
}
  
