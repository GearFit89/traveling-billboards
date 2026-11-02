import { Loader2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Collection } from "./content"

interface CollectionHeaderProps {
  collection: Collection
  count: number
  isPending: boolean
  onAdd: () => void
}

export function CollectionHeader({ collection, count, isPending, onAdd }: CollectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <collection.icon className="size-5" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">{collection.label}</h2>
            <Badge variant="secondary" className="rounded-full">
              {count}
            </Badge>
            {isPending && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 text-xs text-muted-foreground animate-pulse bg-muted rounded-md border">
                <Loader2 className="size-3 animate-spin text-primary" />
                Syncing to database...
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{collection.description}</p>
        </div>
      </div>
      <Button onClick={onAdd} className="gap-1.5" disabled={isPending}>
        <Plus className="size-4" />
        Add {collection.singular}
      </Button>
    </div>
  )
}
