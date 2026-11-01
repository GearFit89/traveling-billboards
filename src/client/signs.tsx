"use client";

import { getAllSigns } from "@/lib/actions";
import { useEffect, useState } from "react";

export function TestFecth() {
  const [data, setData] = useState("no data");

  async function fetchData() {
    const res = await getAllSigns();
    setData(JSON.stringify(res));
    return data;
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return <div>Sign Data: {data}</div>;
}
