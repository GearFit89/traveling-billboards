"use client"

import { ReactNode, Suspense } from "react"
import { Toaster } from "sonner"
import { CollectionManager } from "./collection-manager"
import { SitePreview } from "./site-preview"
import { SideBar } from "@/components/admin/side-bar"
import NavBar from "@/components/admin/nav"
import  LoginModal  from "./Modal"
import { Ids } from "./content"
import { useAdmin } from "@/hooks/use-admin"
import { useCollections } from "@/hooks/use-collections"
import Spinner from "@/components/fallbacks/Spinner"

interface AdminPanelProps {
  initialCollectionId?: Ids
  children?: ReactNode
}

 function AdminDashboard({ initialCollectionId, children }: AdminPanelProps) {
  const admin = useAdmin()
  const collections = useCollections(initialCollectionId)

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 lg:h-screen lg:flex-row lg:overflow-hidden">
      <NavBar />

      {admin.showLoginModal && (
        <LoginModal
          adminToken={admin.adminToken}
          onSaveToken={admin.saveToken}
          onClose={() => admin.setShowLoginModal(false)}
        />
      )}

      <SideBar
        activeId={collections.activeId}
        adminToken={admin.adminToken}
        onSelectHome={() => collections.setActiveId("home")}
        onLogin={() => admin.setShowLoginModal(true)}
        onLogout={admin.logout}
      />

      <main className="min-w-0 flex-1 overflow-y-auto p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">
          {children ?? (
            <CollectionManager
              key={collections.active?.id ?? "loading"}
              collection={collections.active}
              adminToken={admin.adminToken}
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