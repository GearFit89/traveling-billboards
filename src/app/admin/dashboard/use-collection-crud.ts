"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import type { Collection, Field } from "./content"
import {
  upsertSection, deleteSection,
  upsertLink, deleteLink,
  upsertSign, deleteSign,
  upsertThought, deleteThought,
  
} from "@/lib/admin-actions" // Adjust this path if your actions file name varies
import {
  getAllLinks,
  getAllSigns,
  getAllSections,
  getAllThoughts
} from "@/lib/actions"

export type Row = Record<string, string>
type Action = "upsert"|"delete"


 
// Map collection string IDs directly to backend server functions
const ACTION_REGISTRY = {
  sections: { upsert: upsertSection, delete: deleteSection, get: getAllSections },
  links: { upsert: upsertLink, delete: deleteLink, get: getAllLinks },
  signs: { upsert: upsertSign, delete: deleteSign, get: getAllSigns },
  thoughts: { upsert: upsertThought, delete: deleteThought, get: getAllThoughts },
} as const

export function emptyRow(fields: Field[] | undefined): Row {
  if (!fields) {
    console.warn("Fields is not defined")
  }
  return Object.fromEntries(fields?.map((f) => [f.key, ""]) ?? [])
}

/**
 * Owns all the state + server-action wiring for a CollectionManager.
 * Accepts `collection` as possibly-undefined so it can be called
 * unconditionally at the top of the component (Rules of Hooks) even
 * before the "collection failed to load" guard has run.
 */
export function useCollectionCrud(collection: Collection | undefined, adminToken: string) {
  const [rows, setRows] = useState<Row[]>(collection?.sampleRows ?? [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState<Row>(emptyRow(collection?.fields))
  const [isPending, startTransition] = useTransition()

  const titleField = collection ? collection.fields[1] ?? collection.fields[0] : undefined
  const collectionKey = collection?.id as keyof typeof ACTION_REGISTRY | undefined

  function openAdd() {
    if (!collection) {
      console.error("failed to load collection")
      return
    }


    
    setEditingIndex(null)
    setDraft(emptyRow(collection.fields))
    setDialogOpen(true)
  }

  function openEdit(index: number) {
    if (!collection) {
      console.error("failed to load collection")
      return
    }
    setEditingIndex(index)
    setDraft({ ...emptyRow(collection.fields), ...rows[index] })
    setDialogOpen(true)
  }
  
async function fetchRows (key: keyof typeof ACTION_REGISTRY) {
  const action = ACTION_REGISTRY[key];

  return  await action.get();
   
  

}
  function updateDraftField(key: string, value: string) {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()

    if (!collection || !titleField || !collectionKey) {
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

    const actions = ACTION_REGISTRY[collectionKey]
    if (!actions) {
      toast.error("Unsupported action route targeting payload mapping.")
      return
    }

    startTransition(async () => {
      try {
        const res = await actions.upsert(adminToken, draft as any)

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
    if (!collection || !titleField || !collectionKey) {
      console.error("failed to load collection")
      return
    }

    const targetId = rows[index]["id"]
    const name = rows[index][titleField.key] || "this entry"

    if (!targetId) {
      toast.error("Deletions require an 'id' property mapping key context.")
      return
    }

    if (!confirm(`Are you sure you want to delete "${name}"? This can't be undone.`)) {
      return
    }

    const actions = ACTION_REGISTRY[collectionKey]
    if (!actions) return

    startTransition(async () => {
      try {
        const res = await actions.delete(adminToken, targetId)

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

  return {
    rows,
    dialogOpen,
    setDialogOpen,
    editingIndex,
    draft,
    isPending,
    titleField,
    fetchRows,
    openAdd,
    openEdit,
    updateDraftField,
    handleSave,
    handleDelete,
  }
}
