import { Inbox } from "lucide-react"
import type { Collection } from "./content"

interface CollectionEmptyStateProps {
  collection: Collection
}

export function CollectionEmptyState({ collection }: CollectionEmptyStateProps) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="size-6" />
      </span>
      <div>
        <p className="font-medium">No {collection.label.toLowerCase()} yet</p>
        <p className="text-sm text-muted-foreground">
          Click &ldquo;Add {collection.singular}&rdquo; to create your first one.
        </p>
      </div>
    </div>
  )
}
