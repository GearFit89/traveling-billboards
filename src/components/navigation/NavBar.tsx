import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { Links, type NavLink } from "./Links";
import { NavbarProvider, NavButton, NavMenu } from "./NavBarClient";
import styles from "./Navigation.module.css";

export async function NavBar({ page }: { page: string }) {
  const payload = await getPayload({ config });
  const nav = await payload.findGlobal({ slug: "nav" });
  
  if(!links || links.length === 0){
    return null
  }

  const links: NavLink[] = nav.links;
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <NavbarProvider links={links} page={page}>
        <div className={styles.navInner}>
          <Link
            href="/"
            className={styles.logo}
            style={nav.navBrandColor ? { color: nav.navBrandColor } : undefined}
          >
            {nav.navBrandWord1 || "Tailgates"}
            <span className={styles.logoAccent}>{nav.accentedWord ?? "4"}</span>
            {nav.navBrandWord2 ?? "Jesus"}
          </Link>
          <div className={styles.navLinks}>
            <Links page={page} links={links} />
          </div>
          <NavButton />
        </div>
        <NavMenu />
      </NavbarProvider>
    </nav>
  );
}
