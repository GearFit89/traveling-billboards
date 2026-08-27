import { ImagePlus, X } from "lucide-react"
import { toast } from "sonner"
import ImageUploader from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "./rich-text-editor"
import { collections, type Field } from "./content"
import { IMAGE_UPLOAD_URL, IMAGE_URL } from "@/const"
import SignDialog from "@/components/admin/dialogs/sign"
import SectionDialog from "@/components/admin/dialogs/section";
import { useEffect } from "react"
import { useCollectionCrud } from "./use-collection-crud";


interface FieldEditorProps {
  field: Field
  fieldId: string
  value: string
  adminToken: string
  isPending: boolean
  onChange: (value: string) => void
}

export function FieldEditor({ field, fieldId, value, adminToken, isPending, onChange }: FieldEditorProps) {

  useEffect(() => {
    if (field.type === "date" && !value) {
      const today = new Date().toLocaleDateString("en-CA")
      onChange(today)
    }
  }, [field.type, value, onChange]);

  switch (field.type) {
    case "html":
      return <RichTextEditor id={fieldId} value={value ?? ""} onChange={onChange} />

    case "longtext":
      return (
        <Textarea
          id={fieldId}
          rows={3}
          placeholder={field.example}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="resize-none"
          disabled={isPending}
        />
      )

    case "image":
      return (
        <div className="space-y-3">
          {value && (
            <img src={value} alt={field.label} className="max-h-40 rounded-md border object-contain" />
          )}

          <ImageUploader
            uploadUrl={IMAGE_UPLOAD_URL}
            authToken={adminToken}
            onSuccess={({ success, data }) => {
              if (!success) return
              const url = `${IMAGE_URL}/${data.imageUrl}`
              toast.message("Image loaded successfully")
              onChange(url)
            }}
          />

          
        </div>
      )
     case "sign":
      
      return (
    

        <SignDialog value={value} onChange={onChange} />
       
      )
      case "section":
        return (
          <SectionDialog value={value} onChange={onChange} />
        )
case "date":
  return (
    
       <Input
          id={fieldId}
          type={"date"}
        
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={isPending}
        />
    
  )

    default:
      return (
        <Input
          id={fieldId}
          type={"text"}
          placeholder={field.example}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={isPending}
        />
      )
  }
}
