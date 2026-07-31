"use client"

import React, { useState, useTransition } from "react"
import { toast } from "sonner"
import ImageUploader from "@/components/image-uploader"
import type { Collection, Field } from "./content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RichTextEditor } from "./rich-text-editor"
import { Pencil, Plus, Save, Trash2, Inbox, Loader2, ImagePlus } from "lucide-react"

// Import your actual D1 server actions
import {
  upsertSection, deleteSection,
  upsertLink, deleteLink,
  upsertSign, deleteSign,
  upsertThought, deleteThought
} from "@/lib/admin-actions" // Adjust this path if your actions file name varies
import { IMAGE_UPLOAD_URL } from "@/const";
import { useToast } from "@/hooks/use-toast";

type Row = Record<string, string>

// Map collection string IDs directly to your backend server functions
const ACTION_REGISTRY = {
  sections: { upsert: upsertSection, delete: deleteSection },
  links: { upsert: upsertLink, delete: deleteLink },
  signs: { upsert: upsertSign, delete: deleteSign },
  thoughts: { upsert: upsertThought, delete: deleteThought },
} as const;

function emptyRow(fields: Field[]): Row {
  if(!fields){
    console.warn("Fields is not defined")
    
  }
  return Object.fromEntries(fields?.map((f) => [f.key, ""]))
}

interface CollectionManagerProps {
  collection?: Collection
  adminToken: string
}

export function CollectionManager({ collection, adminToken }: CollectionManagerProps) {
  
  if(!collection){
    console.error("failed to load collection")
    return <h4>
      Loaging
      If this message remains, please reset.
       If this still remains, an interal error has occured
       </h4>
  }
  
  const [rows, setRows] = useState<Row[]>(collection.sampleRows)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState<Row>(emptyRow(collection.fields))
  
  const [isPending, startTransition] = useTransition()

  const titleField = collection.fields[1] ?? collection.fields[0]
  const collectionKey = collection.id as keyof typeof ACTION_REGISTRY;

  function openAdd() {
    if(!collection){
    console.error("failed to load collection")
    return 
  }
    setEditingIndex(null)
    setDraft(emptyRow(collection.fields))
    setDialogOpen(true)
  }

  function openEdit(index: number) {
    
    if(!collection){
    console.error("failed to load collection")
    return 
  }
    
    setEditingIndex(index)
    setDraft({ ...emptyRow(collection.fields), ...rows[index] })
    setDialogOpen(true)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()

    if(!collection){
    console.error("failed to load collection")
    return 
  }

    const missing = collection.fields
      .filter((f) => f.required && !draft[f.key]?.trim())
      .map((f) => f.label)

    if (missing.length > 0) {
      toast.error("Please fill in the required boxes", {
        description: missing.join(", "),
      })
      return
    }

    const actions = ACTION_REGISTRY[collectionKey];
    if (!actions) {
      toast.error("Unsupported action route targeting payload mapping.");
      return;
    }

    startTransition(async () => {
      try {
        // Cast draft data dynamically into the respective target actions handler execution path
        const res = await actions.upsert(adminToken, draft as any);
        console.warn(res)

        if (res?.success) {
          if (editingIndex === null) {
            setRows((prev) => [...prev, draft])
            toast.success(`${collection.singular} added`, {
              description: `"${draft[titleField.key] || "Untitled"}" successfully written to D1.`,
            })
          } else {
            setRows((prev) => prev.map((r, i) => (i === editingIndex ? draft : r)))
            toast.success(`${collection.singular} updated`, {
              description: `Your changes to "${draft[titleField.key] || "Untitled"}" are live.`,
            })
          }
          setDialogOpen(false)
        }
      } catch (err: any) {
        toast.error("Database upsert failed", {
          description: err.message || "An expected error caught executing D1 payload assignment.",
        })
      }
    })
  }

  function handleDelete(index: number) {
    const targetId = rows[index]["id"]
    const name = rows[index][titleField.key] || "this entry"

    if (!targetId) {
      toast.error("Deletions require an 'id' property mapping key context.");
      return
    }

    if (!confirm(`Are you sure you want to delete "${name}"? This can't be undone.`)) {
      return
    }

    const actions = ACTION_REGISTRY[collectionKey];
    if (!actions) return;

    startTransition(async () => {
      try {
        const res = await actions.delete(adminToken, targetId);
        if(!collection){
    console.warn("failed to load collection")
    return 
  }
        
        if (res?.success) {
          setRows((prev) => prev.filter((_, i) => i !== index))
          toast.success(`${collection.singular} dropped`, {
            description: `"${name}" removed from database layer rows.`,
          })
        }
      } catch (err: any) {
        toast.error("Failed to delete record context", {
          description: err.message || "Ensure dependencies (like associated thoughts) are cleared out first.",
        })
      }
    })
  }

  return (
    <section className={isPending ? "opacity-80 pointer-events-none transition-opacity" : "transition-opacity"}>
      {/* Heading row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <collection.icon className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight">{collection.label}</h2>
              <Badge variant="secondary" className="rounded-full">
                {rows.length}
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
        <Button onClick={openAdd} className="gap-1.5" disabled={isPending}>
          <Plus className="size-4" />
          Add {collection.singular}
        </Button>
      </div>

      {/* Rows Grid layout */}
      {rows.length === 0 ? (
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
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((row, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader className="gap-1">
                <CardTitle className="text-pretty text-base">
                  {row[titleField.key] || "Untitled"}
                </CardTitle>
                <Badge variant="outline" className="w-fit gap-1.5 font-mono text-xs">
                  <span className="text-muted-foreground/70">{collection.fields[0].key}:</span>
                  {row[collection.fields[0].key] || "—"}
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
  {row[field.key]?.trim() ? (
    field.type === "html" ? (
      <div
        className="prose prose-sm max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: row[field.key] }}
      />
    ) : field.type === "url" ? (
      <span className="break-all text-primary underline-offset-2">
        {row[field.key]}
      </span>
    ) : field.type === "image" ? (
      <img
        src={row[field.key]}
        alt={field.label}
        className="max-h-48 rounded-md border object-contain"
      />
    ) : (
      <span className="wrap-break-words">{row[field.key]}</span>
    )
  ) : (
    <span className="italic text-muted-foreground/60">Not set</span>
  )}
</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={() => openEdit(index)}
                  disabled={isPending}
                >
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(index)}
                  disabled={isPending}
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={isPending ? undefined : setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingIndex === null ? `Add a new ${collection.singular}` : `Edit ${collection.singular}`}
            </DialogTitle>
            <DialogDescription>
              Fill in the boxes below. Boxes marked with a red star are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="grid gap-5 py-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {collection.fields.map((field) => {
                const isWide = field.type === "longtext" || field.type === "html"
                const fieldId = `${collection.id}-${field.key}`
                return (
                  <div key={field.key} className={isWide ? "sm:col-span-2" : ""}>
                    <Label htmlFor={fieldId} className="mb-1.5 flex flex-wrap items-center gap-1.5">
                      <field.icon className="size-3.5 text-muted-foreground" />
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                      <code className="rounded bg-muted px-1 py-px font-mono text-[10px] font-normal text-muted-foreground/70">
                        {field.key}
                      </code>
                    </Label>
                    {field.type === "html" ? (
                      <RichTextEditor
                        id={fieldId}
                        value={draft[field.key] ?? ""}
                        onChange={(html) =>
                          setDraft((d) => ({ ...d, [field.key]: html }))
                        }
                      />
                    ) : field.type === "longtext" ? (
                      <Textarea
                        id={fieldId}
                        rows={3}
                        placeholder={field.example}
                        value={draft[field.key] ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                        }
                        className="resize-none"
                        disabled={isPending}
                      />
                  ) : field.type === "image" ? (
  <div className="space-y-3">
    {draft[field.key] && (
      <img
        src={draft[field.key]}
        alt={field.label}
        className="max-h-40 rounded-md border object-contain"
      />
    )}

    <ImageUploader
      uploadUrl={IMAGE_UPLOAD_URL}
      authToken={adminToken}
      onSuccess={({ success, data }) => {
        const url = `${IMAGE_UPLOAD_URL}/${data.imageUrl}`;
        console.warn("succes", success, data, url)

        if (!success) return;
        toast.message("Image loaded successfully")
        setDraft((d) => ({
          ...d,
          [field.key]: url
        }));
      }}
    >
      <Button type="button" variant="outline">
        <ImagePlus className="mr-2 h-4 w-4" />
        {draft[field.key] ? "Replace Image" : "Upload Image"}
      </Button>
    </ImageUploader>
  </div>
) : (
                      <Input
                        id={fieldId}
                        type={field.type === "date" ? "date" : "text"}
                        placeholder={field.example}
                        value={draft[field.key] ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                        }
                        disabled={isPending}
                      />
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
                  </div>
                )
              })}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" className="gap-1.5" disabled={isPending}>
                {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {editingIndex === null ? `Save ${collection.singular}` : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}