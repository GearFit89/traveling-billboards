import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Collection } from "./content"
import type { Row } from "./use-collection-crud"
import { FieldFormRow } from "./field-form-row"

interface EntryDialogProps {
  collection: Collection
  open: boolean
  isEditing: boolean
  draft: Row
  adminToken: string
  isPending: boolean
  onOpenChange: (open: boolean) => void
  onFieldChange: (key: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function EntryDialog({
  collection,
  open,
  isEditing,
  draft,
  adminToken,
  isPending,
  onOpenChange,
  onFieldChange,
  onSubmit,
}: EntryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit ${collection.singular}` : `Add a new ${collection.singular}`}
          </DialogTitle>
          <DialogDescription>
            Fill in the boxes below. Boxes marked with a red star are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-5 py-2">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {collection.fields.map((field) => (
              <FieldFormRow
                key={field.key}
                field={field}
                collectionId={collection.id}
                value={draft[field.key] ?? ""}
                adminToken={adminToken}
                isPending={isPending}
                onChange={(value) => onFieldChange(field.key, value)}
              />
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" className="gap-1.5" disabled={isPending}>
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isEditing ? "Save changes" : `Save ${collection.singular}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
