import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const profile = searchParams.get("profile") as "layout" | "page" | null;

    if (!slug) {
      return NextResponse.json({ error: "Slug missing" }, { status: 400 });
    }

    revalidatePath(slug, profile ?? "page");

    return NextResponse.json(
      { message: `Revalidated Page \nslug: ${slug} \nprofile: ${profile}  ` },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export { GET };
