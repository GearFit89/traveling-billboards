import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import type { Nav } from "@/payload-types";
import type { LinkAppearances } from "@/db/fields/link";

export type NavLink = NonNullable<Nav["links"]>[number];
export type NavLinkItem = NonNullable<Nav["links"]>[number]['link'];

export const appearanceClasses: Record<LinkAppearances, string> = {
  default: "text-black hover:text-gray-200",
  highlighted:
    "bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-300",
  outline:
    "border border-white text-white px-4 py-2 rounded-md hover:bg-white/10",
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
export async function Links({ links, page }: LinksProps) {
  return (
    <div>
      {links.map(({ link, id }) => {
        const href = link.url ?? "#";
        // Normalize slashes so "/about" and "about" both match accurately
        const isActive =
          page.replace(/^\/|\/$/g, "") === href.replace(/^\/|\/$/g, "");

        return <LinkItem key={id} link={link} isActive={isActive} />;
      })}
    </div>
  );
}

interface LinkItemProps {
  link: NavLink["link"];
  isActive: boolean;
}

export function LinkItem({ link, isActive }: LinkItemProps) {
  const appearance = link.appearance ?? "default";
  const baseClass = appearanceClasses[appearance];

  // Yellow underline for normal links when active; white underline for yellow highlighted links
  const activeClass = isActive
    ? appearance === "highlighted"
      ? "underline decoration-white decoration-2 underline-offset-4"
      : "underline decoration-yellow-400 decoration-2 underline-offset-4"
    : "";

  return (
    <Link href={link.url ?? "#"} className={`${baseClass} ${activeClass}`}>
      {link.label}
    </Link>
  );
}
