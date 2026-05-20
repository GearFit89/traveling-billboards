import Link from "next/link";
import {
  Link as LinkIcon,
  Home,
  SignpostIcon,
  LucideIcon,
} from "lucide-react";
import { capitalizeFirstLetter } from "@/utils/strings";
import styles from "./NavBar.module.css";
import { Suspense } from "react";

export interface LinkItem {
  name: string;
  icon: LucideIcon;
  suspense?: boolean;
}

export default function NavBar({
  links = [
    { name: "home",  icon: Home },
    { name: "signs", icon: SignpostIcon },
    { name: "links", icon: LinkIcon },
  ],
}: {
  links?: LinkItem[];
}) {
  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.navBrand}>
        Traveling Billboards
      </Link>

      <div className={styles.navLinks}>
        {links.map((link) =>
          link.suspense ? (
            <Suspense key={link.name} fallback={null}>
              <Link href={"/" + link.name} className={styles.navLinkItem}>
                <link.icon size={16} aria-hidden="true" />
                <span>{capitalizeFirstLetter(link.name)}</span>
              </Link>
            </Suspense>
          ) : (
            <Link
              key={link.name}
              href={"/" + link.name}
              className={styles.navLinkItem}
            >
              <link.icon size={16} aria-hidden="true" />
              <span>{capitalizeFirstLetter(link.name)}</span>
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}
