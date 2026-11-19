import { Block, getPayload } from "payload";
import config from "@payload-config";
import { Hero } from "@/components/elements/Hero";
import { Section } from "@/components/elements/Section";
import { NavGrid } from "@/components/elements/NavGrid";
import { getBlock } from "@/db/blocks/blockMap";
import { Page } from "@/components/page";

export default async function HomePage() {
  const payload = await getPayload({ config });

  const {
    docs: [homePage],
  } = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: "home",
      },
    },
    pagination: false,
  });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>

      <Page page={homePage} />
    </div>
  );
}
