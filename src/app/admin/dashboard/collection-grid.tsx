import type { Collection, Field } from "./content"
import type { Row } from "./use-collection-crud"
import { CollectionCard } from "./collection-card"
import { CollectionEmptyState } from "./collection-empty-state"

interface CollectionGridProps {
  collection: Collection
  rows: Row[]
  titleField: Field
  isPending: boolean
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}

export function CollectionGrid({ collection, rows, titleField, isPending, onEdit, onDelete }: CollectionGridProps) {
  if (rows.length === 0) {
    return <CollectionEmptyState collection={collection} />
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((row, index) => (
        <CollectionCard
          key={index}
          collection={collection}
          row={row}
          titleField={titleField}
          isPending={isPending}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  )
}
