import Link from 'next/link'; // Fixed: Link import is usually default or from 'next/link'
import { capitalizeFirstLetter } from '@src/utils'; // Fixed: Typo in function name
import { Link as LinkICon } from 'lucide-react'

export default function NavBar({ 
  // Updated to an array of objects to store icons or other metadata
  links = [
    { name: 'home', icon: '' },
    { name: 'thoughts', icon: '' },
    { name: 'links', icon: '' }
  ] 
}) {

  const navStyle = { 
    display: 'flex', // Standard for nav bars
    gap: '1rem',      // Using rem instead of px per your preference
    position: 'relative',
    backgroundColor:'blue' // Fixed: Typo in "position"
  };

  return (
    <nav style={navStyle}>
      {links.map((link) => (
        // Key is required for list rendering in React
        <Link key={link.name} href={'/' + link.name}>
          <div>{link.icon}</div> {/* Render the icon */}
          {capitalizeFirstLetter(link.name)} {/* Fixed typo */}
        </Link>
      ))}
    </nav>
  );
}