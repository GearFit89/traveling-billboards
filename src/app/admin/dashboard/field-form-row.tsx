import { Label } from "@/components/ui/label"
import type { Field } from "./content"
import { FieldEditor } from "./field-editor"

interface FieldFormRowProps {
  field: Field
  collectionId: string
  value: string
  adminToken: string
  isPending: boolean
  onChange: (value: string) => void
}

export function FieldFormRow({ field, collectionId, value, adminToken, isPending, onChange }: FieldFormRowProps) {
  const isWide = field.type === "longtext" || field.type === "html"
  const fieldId = `${collectionId}-${field.key}`

  return (
    <div className={isWide ? "sm:col-span-2" : ""}>
      <Label htmlFor={fieldId} className="mb-1.5 flex flex-wrap items-center gap-1.5">
        <field.icon className="size-3.5 text-muted-foreground" />
        {field.label}
        {field.required && <span className="text-destructive">*</span>}
        <code className="rounded bg-muted px-1 py-px font-mono text-[10px] font-normal text-muted-foreground/70">
          {field.key}
        </code>
      </Label>

      <FieldEditor
        field={field}
        fieldId={fieldId}
        value={value}
        adminToken={adminToken}
        isPending={isPending}
        onChange={onChange}
      />

      <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
    </div>
  )
}
