import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import type { Nav } from "@/payload-types";
import type { LinkAppearances } from "@/db/fields/link";
import { Links } from "./Links";

interface NavProps {
  /**
   * NavProps.page is the current page that navbar displays as active. Can be `/slug`, `slug`,`slug/`, etc. All `/` and `\` are striped out
   */
  page: string;
}
/**
 *
 * @param NavProps - NavProps.page is the current page that navbar displays as active. Can be `/slug`, `slug`,`slug/`, etc. All `/` and `\` are striped out
 * @returns
 */
export async function NavBar({ page }: NavProps) {
  const payload = await getPayload({ config });

  const nav = await payload.findGlobal({
    slug: "nav",
  });

  if (!nav.links || nav.links.length === 0) {
    return null;
  }
  return (
    <nav style={{ backgroundColor: "red" }}>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3>
            {nav.navBrandWord1}
            <h3 style={{ color: "yellow" }}>{nav.accentedWord}</h3>
            {nav.navBrandWord2}
          </h3>
        </div>
        <Links links={nav.links} page={page} />
      </div>
    </nav>
  );
}
