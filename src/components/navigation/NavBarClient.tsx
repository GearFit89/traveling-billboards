
"use client";

import { createContext, useContext, useState } from "react";
import { Links, NavLink } from "./Links";
import { Icon } from "../icons";


interface NavContext {
    links: NavLink[];
    page: string;
    isMenuOpen: boolean;
    onMenuClose: () => void;
    toggleMenu: () => void;
}
export const NavbarContext = createContext<NavContext | null>(null);


export function useNavbarContext() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbarContext must be used within a NavbarProvider");
    }
    return context;
}   
interface NavbarProviderProps {
    children: React.ReactNode;
    links: NavLink[];
    page: string;
}   


export function NavbarProvider({ children, links, page }: NavbarProviderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuClose = () => {
        setIsMenuOpen(false);
    };
const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }
    return (
        <NavbarContext.Provider value={{ links, page, isMenuOpen, onMenuClose, toggleMenu }}>
            {children}
        </NavbarContext.Provider>
    );
}
export function NavButton({ displayXIcon = true, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>& { displayXIcon?: boolean }) {
    const { toggleMenu, isMenuOpen } = useNavbarContext();

    function handleClick() {
        toggleMenu();
    }
    return (
        <button onClick={handleClick} {...props}>
            {isMenuOpen && displayXIcon ? <Icon name="x" /> : <Icon name="menu" />}
        </button>
    );
}

export function NavMenu() {
    const { isMenuOpen, onMenuClose, links, page } = useNavbarContext();     

    return (
        <div
            style={{
                display: isMenuOpen ? "block" : "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: Infinity,
            }}
            onClick={onMenuClose}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Links links={links} page={page} />
            </div>
        </div>
    )
}