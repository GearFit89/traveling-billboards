import { getPayload } from "payload";
import config from "@payload-config";
import { Media } from "@/payload-types";

interface HeroProps {
  slug: string;
}

export async function Hero({ slug }: HeroProps) {
  const payload = await getPayload({ config });
  const {
    docs: [hero],
  } = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    pagination: false,
  });
  const { url, alt } = hero.backgroundImage as Media;
  return (
    <div>
      <img src={url ?? ""} alt={alt}>
        <h5>{hero.eyebrow}</h5>
        <h2>
          {hero.heading}
          <span style={{ color: "yellow" }}>{hero.headingHighlight}</span>
        </h2>
        <h3>{hero.secondaryHeading}</h3>
        <h4>{hero.subheading}</h4>
      </img>
    </div>
  );
}
