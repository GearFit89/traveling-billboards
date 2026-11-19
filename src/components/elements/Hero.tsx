import Link from "next/link";
import type { Page } from "@/payload-types";
import { Icon } from "../icons";
import styles from "./Hero.module.css";

export function Hero({ page }: { page: Page }) {
  const image = page.backgroundImage;
  const buttons = [page.ctaButton, page.secondaryCtaButton];

  return (
    <section className={styles.hero}>
      {image && typeof image === "object" && image.url && (
        <img className={styles.image} src={image.url} alt="" />
      )}
      <div className={styles.content}>
        {page.eyebrow && <p className={styles.eyebrow}>{page.eyebrow}</p>}
        <h1 className={styles.heading}>
          {page.heading}
          {page.headingHighlight && <> <span>{page.headingHighlight}</span></>}
        </h1>
        {page.secondaryHeading && <h2 className={styles.secondary}>{page.secondaryHeading}</h2>}
        {page.subheading && <p className={styles.subheading}>{page.subheading}</p>}
        <div className={styles.actions}>
          {buttons.map((button, index) => button?.text && button.linkTo && (
            <Link
              key={index}
              href={button.linkTo}
              className={button.isHighlighted ? styles.highlighted : styles.outline}
            >
              {button.text}
              <Icon name="arrowRight" size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
