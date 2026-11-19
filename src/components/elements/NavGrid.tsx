import type { CSSProperties } from "react";
import type { NavGridBlock } from "@/payload-types";
import { Icon } from "../icons";
import { getLinkHref } from "../navigation/Links";
import Link from "next/link";
import styles from "./NavGrid.module.css";

export function NavGrid({ block: { items } }: { block: NavGridBlock }) {
  if (!items?.length) return null;

  return (
    <div className={styles.grid} id="explore">
      {items.map((item) => {
        const color = item.color?.trim();
        const style = color && !["#fff", "#ffffff", "white"].includes(color.toLowerCase())
          ? ({ "--card-color": color } as CSSProperties)
          : undefined;

        return (
          <article className={styles.card} key={item.id ?? item.heading} style={style}>
            <div className={styles.heading}>
              {item.icon && <Icon name={item.icon} size={48} className={styles.icon} />}
              <h3>{item.heading}</h3>
            </div>
            <div className={styles.details}>
              {item.description && <p>{item.description}</p>}
              {item.link && (
                <Link
                  className={styles.link}
                  href={getLinkHref(item.link)}
                  aria-label={item.link.label || item.heading}
                  target={item.link.newTab ? "_blank" : undefined}
                  rel={item.link.newTab ? "noopener noreferrer" : undefined}
                >
                  <Icon name="arrowRight" size={22} />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
