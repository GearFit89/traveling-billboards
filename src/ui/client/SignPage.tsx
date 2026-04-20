"use client";

import { useEffect, useState } from "react";
import useSWR from "swr"
export default function SignPage({ params }: { params: { sign: string } }) {
  const [signContent, setSignContent] = useState<string>("Loading...");

  useEffect(() => {
    // Simulate fetching content based on the sign parameter
    const fetchSignContent = useSWR(`/api/query/${params.sign}`, async (url) => {
        // Simulate an API call with a delay
        const response = await fetch(url, {method: "GET"});
        if (!response.ok) {
          throw new Error(`Failed to fetch content for ${params.sign}`);
        }
        const data = await response.json();
        return ;
        });

    if (fetchSignContent.data) {
      setSignContent(fetchSignContent.data);
    } else if (fetchSignContent.error) {
      setSignContent("Failed to load content.");
    }
  }, [params.sign]);

  return (
    <div>
      <h1>{signContent}</h1>
    </div>
  );
}