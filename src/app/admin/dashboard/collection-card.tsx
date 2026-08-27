import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Collection, Field } from "./content"
import type { Row } from "./use-collection-crud"
import { FieldValue } from "./field-value"

interface CollectionCardProps {
  collection: Collection
  row: Row
  titleField: Field
  isPending: boolean
  onEdit: () => void
  onDelete: () => void
}

export function CollectionCard({ collection, row, titleField, isPending, onEdit, onDelete }: CollectionCardProps) {
  const idField = collection.fields[0]

  return (
    <Card className="flex flex-col">
      <CardHeader className="gap-1">
        <CardTitle className="text-pretty text-base">{row[titleField.key] || "Untitled"}</CardTitle>
        <Badge variant="outline" className="w-fit gap-1.5 font-mono text-xs">
          <span className="text-muted-foreground/70">{idField.key}:</span>
          {row[idField.key] || "—"}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1">
        <dl className="grid gap-3">
          {collection.fields.slice(1).map((field) => (
            <div key={field.key} className="grid gap-0.5">
              <dt className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <field.icon className="size-3.5" />
                {field.label}
                <code className="rounded bg-muted px-1 py-px font-mono text-[10px] text-muted-foreground/70">
                  {field.key}
                </code>
              </dt>
              <dd className="text-sm">
                <FieldValue field={field} row={row} />
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={onEdit} disabled={isPending}>
          <Pencil className="size-3.5" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onDelete}
          disabled={isPending}
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
