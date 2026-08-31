"use client"

import Link from "next/link"
import { Database, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"
import { collections, Ids } from "@/app/admin/dashboard/content"
import clearCache from "@/services/clearCache"

interface SideBarProps {
  activeId: Ids
  onSelectHome: () => void
  onLogout?: () => void
}

export function SideBar({
  activeId,
  onSelectHome,
  onLogout,
}: SideBarProps) {
  return (
    <aside className="flex flex-col gap-6 border-b bg-card p-5 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
      <div className="hidden items-center gap-2.5 lg:flex">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Database className="size-4" />
        </span>
        <div className="leading-tight">
          <h1 className="font-semibold">Content Manager</h1>
          <p className="text-xs text-muted-foreground">Edit your site&apos;s content</p>
        </div>
      </div>

      <nav aria-label="Content sections" className="flex flex-row flex-wrap gap-1 lg:flex-col">
        {collections.map((collection) => {
          const isActive = collection.id === activeId
          const className = cn(
            "flex flex-1 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium",
            "lg:flex-none",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:bg-muted hover:text-foreground",
          )

          if (collection.id === "home") {
            return (
              <button
                key={collection.id}
                type="button"
                onClick={onSelectHome}
                className={className}
              >
                <collection.icon className="size-4" />
                {collection.label}
              </button>
            )
          }

          return (
            <Link
              key={collection.id}
              href={`/admin/dashboard/${collection.id}`}
              className={className}
            >
              <collection.icon className="size-4" />
              {collection.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto hidden rounded-xl border bg-muted/50 p-4 lg:block">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-muted-foreground">
            Auth status
          </span>

          <span className="flex items-center gap-1 text-emerald-600">
            <Unlock className="size-3" /> Protected
          </span>
        </div>

        <button
          type="button"
          onClick={() => void clearCache()}
          className="mb-4 text-xs underline"
        >
          Wipe all R2 cache
        </button>

        {onLogout ? (
          <button onClick={onLogout} className="w-full text-left text-xs text-destructive hover:underline">
            Sign out
          </button>
        ) : null}
      </div>
    </aside>
  )
}