"use client"

import { ReactNode, Suspense } from "react"
import { Toaster } from "sonner"
import { CollectionManager } from "./collection-manager"
import { SitePreview } from "./site-preview"
import { SideBar } from "@/components/admin/side-bar"
import NavBar from "@/components/admin/nav"
import { Ids } from "./content"

import { useCollections } from "@/hooks/use-collections"
import Spinner from "@/components/fallbacks/Spinner"
import { adminLogout } from "@/lib/admin-actions"

interface AdminPanelProps {
  initialCollectionId?: Ids
  children?: ReactNode
}

 function AdminDashboard({ initialCollectionId, children }: AdminPanelProps) {
  const collections = useCollections(initialCollectionId)

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 lg:h-screen lg:flex-row lg:overflow-hidden">
      <NavBar />

      <SideBar
        activeId={collections.activeId}
        onSelectHome={() => collections.setActiveId("home")}
        onLogout={() => void adminLogout()}
      />

      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">
          {children ?? (
            <CollectionManager
              key={collections.active?.id ?? "loading"}
              collection={collections.active}
              adminToken=""
            />
          )}
        </div>
      </main>

      <aside className="h-[70vh] shrink-0 border-t bg-card lg:h-auto lg:w-[30rem] lg:border-l lg:border-t-0">
        <SitePreview />
      </aside>

      <Toaster />
    </div>
  )
}

export default function AdminPanel(props: AdminPanelProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <AdminDashboard {...props} />
    </Suspense>
  )
}