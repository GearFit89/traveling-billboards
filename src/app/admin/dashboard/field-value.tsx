import type { Field } from "./content"
import type { Row } from "./use-collection-crud"

interface FieldValueProps {
  field: Field
  row: Row
}

export function FieldValue({ field, row }: FieldValueProps) {
  const value = row[field.key]

  if (!value?.trim()) {
    return <span className="italic text-muted-foreground/60">Not set</span>
  }

  switch (field.type) {
    case "html":
      return (
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )
    case "url":
      return <span className="break-all text-primary underline-offset-2">{value}</span>
    case "image":
      return <img src={value} alt={field.label} className="max-h-48 rounded-md border object-contain" />
    default:
      return <span className="wrap-break-words">{value}</span>
  }
}
