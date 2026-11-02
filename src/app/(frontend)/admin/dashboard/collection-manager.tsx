"use client"

import type { Collection } from "./content"
import { CollectionHeader } from "./collection-header"
import { CollectionGrid } from "./collection-grid"
import { EntryDialog } from "./entry-dialog"
import { useCollectionCrud } from "./use-collection-crud"

interface CollectionManagerProps {
  collection?: Collection
  adminToken: string
}

export function CollectionManager({ collection, adminToken }: CollectionManagerProps) {
  // Hook is called unconditionally (before the early return below) so it
  // never breaks the Rules of Hooks, even while `collection` is still loading.
  const {
    rows,
    dialogOpen,
    setDialogOpen,
    editingIndex,
    draft,
    isPending,
    titleField,
    openAdd,
    openEdit,
    updateDraftField,
    handleSave,
    handleDelete,
  } = useCollectionCrud(collection, adminToken)

  if (!collection || !titleField) {
    console.error("failed to load collection")
    return (
      <h4>
        Loading. If this message remains, please reset. If this still remains, an internal error has occurred.
      </h4>
    )
  }

  return (
    <section className={isPending ? "opacity-80 pointer-events-none transition-opacity" : "transition-opacity"}>
      <CollectionHeader collection={collection} count={rows.length} isPending={isPending} onAdd={openAdd} />

      <CollectionGrid
        collection={collection}
        rows={rows}
        titleField={titleField}
        isPending={isPending}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <EntryDialog
        collection={collection}
        open={dialogOpen}
        isEditing={editingIndex !== null}
        draft={draft}
        adminToken={adminToken}
        isPending={isPending}
        onOpenChange={setDialogOpen}
        onFieldChange={updateDraftField}
        onSubmit={handleSave}
      />
    </section>
  )
}
