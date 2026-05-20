import setQuery from "@/services/setQuery";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<Record<string, string>> },
) {
  // Await params because Next.js route parameters are promises in recent versions
  const resolvedParams = await params;
  const { section, id } = resolvedParams;

  // Type-safe extraction check
  const data = setQuery(
    {
      columns: ["hits"],
      tables: ["links"],
      id,
    },
    {
      action: "UPDATE",
    },
  );
  return NextResponse.json({
    success: true,
    error: "",
  });
}
