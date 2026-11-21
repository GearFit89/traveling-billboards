"use client";

import { createContext, useContext, useId, useRef, useState } from "react";
import { Links, type NavLink } from "./Links";
import { Icon } from "../icons";
import styles from "./Navigation.module.css";

interface NavContext {
  links: NavLink[];
  page: string;
  menuId: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const NavbarContext = createContext<NavContext | null>(null);

function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("Navbar controls must be used within a NavbarProvider");
  }
  return context;
}

export function NavbarProvider({ children, links, page }: {
  children: React.ReactNode;
  links: NavLink[];
  page: string;
}) {
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <NavbarContext.Provider value={{ links, page, menuId, isMenuOpen, closeMenu, toggleMenu }}>
      <div
        ref={controls}
        onKeyDown={(event) => {
          if (event.key === "Escape" && isMenuOpen) {
            closeMenu();
            controls.current?.querySelector("button")?.focus();
          }
        }}
      >
        {children}
      </div>
    </NavbarContext.Provider>
  );`1`
}

export function NavButton() {
  const { toggleMenu, isMenuOpen, menuId } = useNavbarContext();

  return (
    <button
      type="button"
      className={styles.mobileMenuButton}
      onClick={toggleMenu}
      aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isMenuOpen}
      aria-controls={menuId}
    >
      <Icon name={isMenuOpen ? "x" : "menu"} />
    </button>
  );
}

export function NavMenu() {
  const { isMenuOpen, closeMenu, links, page, menuId } = useNavbarContext();

  return (
    <div id={menuId} className={styles.mobileMenu} hidden={!isMenuOpen}>
      {isMenuOpen && <Links links={links} page={page} onNavigate={closeMenu} />}
    </div>
  );
}
