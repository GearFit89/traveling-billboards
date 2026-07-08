"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, ExternalLink, Globe } from "lucide-react"


const BASE_URL = "https://tailgates4Jesus.com"

/** Turn whatever the user types into a full https:// address. */
function normalize(input: string): string {
  const trimmed = input.trim()
  if (trimmed === "") return BASE_URL + "/"
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  // Treat it as a path on the site, e.g. "signs" -> ".../signs"
  return BASE_URL + "/" + trimmed.replace(/^\/+/, "")
}

const QUICK_PAGES = [
  { label: "Home", path: "" },
  { label: "Signs", path: "signs" },
  {label: "Links", path: "links"},
  {label: "Chat", path: "chat"}
]

export function SitePreview() {
  const [urlInput, setUrlInput] = useState(BASE_URL + "/")
  const [currentUrl, setCurrentUrl] = useState(BASE_URL + "/")
  // Bumping this key forces the <iframe> to reload from scratch.
  const [reloadKey, setReloadKey] = useState(0)

  function go(url: string) {
    const full = normalize(url)
    setUrlInput(full)
    setCurrentUrl(full)
    setReloadKey((k) => k + 1)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    go(urlInput)
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b p-3">
        <Globe className="size-4 shrink-0 text-muted-foreground" />
        <h2 className="text-sm font-semibold tracking-tight">Live Site Preview</h2>
      </div>

      {/* Address bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b bg-muted/40 p-3">
        <Input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          aria-label="Page address to preview"
          placeholder={`${BASE_URL}/signs`}
          className="h-9 bg-background font-mono text-xs"
        />
        <Button type="submit" size="sm" className="h-9 shrink-0 gap-1.5">
          Go
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-9 shrink-0"
          onClick={() => setReloadKey((k) => k + 1)}
          aria-label="Refresh preview"
          title="Refresh"
        >
          <RefreshCw className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="size-9 shrink-0"
          onClick={() => window.open(currentUrl, "_blank", "noopener,noreferrer")}
          aria-label="Open in a new tab"
          title="Open in new tab"
        >
          <ExternalLink className="size-4" />
        </Button>
      </form>

      {/* Quick links */}
      <div className="flex flex-wrap items-center gap-1.5 border-b p-2">
        <span className="px-1 text-xs text-muted-foreground">Jump to:</span>
        {QUICK_PAGES.map((p) => (
          <Button
            key={p.path}
            type="button"
            size="sm"
            variant="secondary"
            className="h-7 rounded-full px-3 text-xs"
            onClick={() => go(p.path)}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* The site itself */}
      <div className="relative min-h-0 flex-1 bg-muted/20">
        <iframe
          key={reloadKey}
          src={currentUrl}
          title="Live preview of tailgates4Jesus.com"
          className="size-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  )
}
