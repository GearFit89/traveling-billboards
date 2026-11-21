import { getPayload } from "payload";
import config from "@payload-config";
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

  return <Page page={homePage} />;
}
