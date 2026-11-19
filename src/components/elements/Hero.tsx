import { getPayload } from "payload";
import config from "@payload-config";
import { Media, Page } from "@/payload-types";

interface HeroProps {
page: Page;
}

export async function Hero({ page }: HeroProps) {
  
  const { url, alt } = page.backgroundImage as Media;
  return (
    <div>
      <img src={url ?? ""} alt={alt}>
        <h5>{page.eyebrow}</h5>
        <h2>
          {page.heading}
          <span style={{ color: "yellow" }}>{page.headingHighlight}</span>
        </h2>
        <h3>{page.secondaryHeading}</h3>
        <h4>{page.subheading}</h4>
      </img>
    </div>
  );
}
