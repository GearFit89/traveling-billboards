"use client"

import ErrorPage from "@/components/ErrorPage";
import { useRouter } from "next/navigation"; // Use useRouter instead of redirect

export default function GlobalError({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void 
}) {
  const router = useRouter();
   
  console.error("Global error caught:", error);

  const handleReset = () => {
    // 1. Clear whatever state caused the error if necessary
    // 2. Navigate the user back home safely
    router.push('/');
  };

  return (
    
    
        <ErrorPage 
          message={error.message || "An unexpected error occurred."}
          reset={handleReset} 
          code={500}
        />
      
  );
}