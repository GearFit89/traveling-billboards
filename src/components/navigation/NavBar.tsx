import { getPayload } from "payload";
import config from "@payload-config";

import { Links } from "./Links";
import { Icon } from "../icons";
import { getActiveTheme } from "@/lib/themes";
import { NavbarProvider, NavButton, NavMenu } from "./NavBarClient";
import styles from "./Navigation.module.css";

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
  const theme = getActiveTheme();
  return (
    <nav className={styles.nav}>
      <NavbarProvider links={nav.links} page={page}>
        <div className={styles.navInner}>
          <div>
            <h3 style={{ color: nav.navBrandColor ?? theme.colors.foreground }}>
              {nav.navBrandWord1}
              <span style={{ color: theme.colors.accent }}>{nav.accentedWord}</span>
              {nav.navBrandWord2}
            </h3>
          </div>
          <NavButton className={styles.mobileMenuButton} displayXIcon>
            <Icon name="menu" />
          </NavButton>
          <div className={styles.navLinks}>
            <Links page={page} links={nav.links} />
          </div>
          <NavMenu />
        </div>
      </NavbarProvider>
    </nav>
  );
}
