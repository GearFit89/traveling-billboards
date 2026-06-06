'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteContent } from '@/lib/content';
import { Icon } from '@/lib/icons';
import styles from './Navigation.module.css';


const  navLinks = [
    { href: '/', label: 'Home' },
    { href: '/signs', label: 'Signs' },
    { href: '/links', label: 'Links' },
  ];


export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          {siteContent.siteName.split(' ')[0]}
          <span className={styles.logoAccent}>.</span>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <Icon name="close" />
          ) : (
            <Icon name="menu" />
          )}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        {siteContent.navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
