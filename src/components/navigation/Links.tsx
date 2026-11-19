import Link from "next/link";
import type { Nav, Page } from "@/payload-types";
import type { LinkAppearances } from "@/db/fields/link";
import styles from "./Navigation.module.css";

export type NavLink = NonNullable<Nav["links"]>[number];
export type NavLinkItem = NonNullable<Nav["links"]>[number]["link"];

const LINK_FALLBACK = "#";

export const appearanceClasses: Record<LinkAppearances, string> = {
  default: styles.linkDefault,
  highlighted: styles.linkHighlighted,
  outline: styles.linkOutline,
};

interface LinksProps {
  /**
   * NavProps.page NavProps.page is the current page that navbar displays as active. Can be `/slug`, `slug`,`slug/`, etc. All `/` and `\` are striped out
   */

  page: string;
  links: NavLink[];
}
/**
 *
 * @param NavProps - NavProps.page is the current page that navbar displays as active. Can be `/slug`, `slug`,`slug/`, etc. All `/` and `\` are striped out
 * @returns
 */
export function Links({ links, page }: LinksProps) {
  return (
    <div>
      {links.map(({ link, id }) => {
        const href =
          link.type === "custom"
            ? (link.url ?? LINK_FALLBACK)
            : ((link.reference?.value as Page).slug ?? LINK_FALLBACK);
        
        // Normalize slashes so "/about" and "about" both match accurately
        const isActive =
          page.replace(/^\/|\/$/g, "") === href.replace(/^\/|\/$/g, "");

        return (
          <LinkItem key={id} href={href} link={link} isActive={isActive} />
        );
      })}
    </div>
  );
}

interface LinkItemProps {
  link: NavLink["link"];
  href: string;
  isActive: boolean;
}

export function LinkItem({ link, href, isActive }: LinkItemProps) {
  const appearance = link.appearance ?? "default";
  const appearanceClass = appearanceClasses[appearance];

  // Yellow underline for normal links when active; white underline for yellow highlighted links
  const activeClass = isActive
    ? appearance === "highlighted"
      ? styles.navLinkActiveHighlighted
      : styles.navLinkActive
    : "";
  return (
    <Link
      href={href}
      className={`${styles.link} ${appearanceClass} ${activeClass}`}
      target={link.newTab ? "_blank" : "_self"}
      rel={link.newTab ? "noopener noreferrer" : undefined}
    >
      {link.label}
    </Link>
  );
}
