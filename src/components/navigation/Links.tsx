import Link from "next/link";
import type { Nav } from "@/payload-types";
import type { LinkAppearances } from "@/db/fields/link";
import styles from "./Navigation.module.css";

export type NavLink = NonNullable<Nav["links"]>[number];
export type NavLinkItem = NavLink["link"];

export const appearanceClasses: Record<LinkAppearances, string> = {
  default: styles.linkDefault,
  highlighted: styles.linkHighlighted,
  outline: styles.linkOutline,
};

export function getLinkHref(link: NavLinkItem) {
  const reference = link.reference?.value;
  if (link.type === "reference" && reference && typeof reference === "object" && reference.slug) {
    return reference.slug === "home" ? "/" : `/${reference.slug.replace(/^\/+/, "")}`;
  }

  return link.url || "#";
}

export function Links({ links, page, onNavigate }: {
  links: NavLink[];
  page: string;
  onNavigate?: () => void;
}) {
  const currentPage = page.replace(/^\/+|\/+$/g, "");

  return (
    <ul className={styles.links}>
      {links.map(({ link, id }) => {
        const href = getLinkHref(link);
        const isActive = href.replace(/^\/+|\/+$/g, "") === currentPage;

        return (
          <li key={id ?? href}>
            <LinkItem href={href} link={link} isActive={isActive} onNavigate={onNavigate} />
          </li>
        );
      })}
    </ul>
  );
}

export function LinkItem({ link, href, isActive, onNavigate }: {
  link: NavLinkItem;
  href: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const appearance = link.appearance ?? "default";
  const activeClass = isActive
    ? appearance === "highlighted"
      ? styles.navLinkActiveHighlighted
      : styles.navLinkActive
    : "";

  return (
    <Link
      href={href}
      className={`${styles.link} ${appearanceClasses[appearance]} ${activeClass}`}
      aria-current={isActive ? "page" : undefined}
      target={link.newTab ? "_blank" : undefined}
      rel={link.newTab ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}
