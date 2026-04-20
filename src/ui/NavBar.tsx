import Link from 'next/link'; // Import Next.js Link for optimized navigation
import { Link as LinkICon, Home, MessagesSquare, LucideIcon } from 'lucide-react'; // Import icons from lucide
import { capitalizeFirstLetter } from '@/utils/strings'; // Import string utility
import "@/app/global.css"; // Use @ alias to point directly to global variables
import styles from "./Comments.module.css"; // Use scoped module for specific layout
import { Suspense } from 'react'; // Import Suspense for loading boundaries

export interface LinkItem { // Define link data structure
  name: string; // URL path and label
   icon: LucideIcon; // Lucide icon component
  suspense?: boolean; // Optional flag for loading states
} // End interface

export default function NavBar({
  links = [ // Set default navigation items
    { name: 'home', icon: Home }, // Home route
    { name: 'thoughts', icon: MessagesSquare }, // Thoughts route
    { name: 'links', icon: LinkICon } // Links route
  ]
}: { links?: LinkItem[] }) { // End props definition

  return ( // Render navigation structure
    <nav className={styles.navBar}> {/* Fixed: Added navBar class from styles */}
      <div className={styles.navBrand}>Logo</div> {/* Optional: added brand for layout balance */}

      <div className={styles.navLinks}> {/* Wrapper for links using flex and gap */}
        {links.map((link) => ( // Map through link definitions
          link.suspense ? ( // Render with Suspense boundary if requested
            <Suspense key={link.name} fallback={<div>Loading...</div>}>
              <Link href={'/' + link.name} className={styles.navLinkItem}> {/* Applied themed link style */}
                <link.icon size={20} /> {/* Render icon with standard size */}
                <span>{capitalizeFirstLetter(link.name)}</span> {/* Themed label */}
              </Link>
            </Suspense>
          ) : ( // Standard render without suspense
            <Link key={link.name} href={'/' + link.name} className={styles.navLinkItem}> {/* Applied themed link style */}
              <link.icon size={20} /> {/* Render icon with standard size */}
              <span>{capitalizeFirstLetter(link.name)}</span> {/* Themed label */}
            </Link>
          )
        ))}
      </div> {/* End links wrapper */}
    </nav> // End nav
  ); // End render
} // End NavBar component