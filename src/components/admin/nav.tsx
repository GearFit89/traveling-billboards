"use client"

import Link from "next/link";

import { useState } from "react";
import { collections } from "@/app/admin/dashboard/content";
import { cn } from "@/lib/utils";

export default function NavBar() {
    const [ activeId, setActiveId] = useState('home')
    return (
        <div className="flex flex-col gap-4">
         {collections.map((c) => {
                    const isActive = c.id === activeId
                    const className = cn(
                      "flex flex-1 items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors lg:flex-none",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )
        
                    if (c.id === "home") {
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setActiveId(c.id)}
                          aria-current={isActive ? "page" : undefined}
                          className={className}
                        >
                          <c.icon className="size-4 shrink-0" />
                          <span className="truncate">{c.label}</span>
                        </button>
                      )
                    }
        
                    return (
                      <Link
                        key={c.id}
                        href={`/admin/dashboard/${c.id}`}
                        aria-current={isActive ? "page" : undefined}
                        className={className}
                      >
                        <c.icon className="size-4 shrink-0" />
                        <span className="truncate">{c.label}</span>
                      </Link>
                    )
                  })}
        </div>
    );
    }
