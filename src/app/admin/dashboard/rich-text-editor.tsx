"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { useEffect, useMemo, useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Unlink,
} from "lucide-react"
import { LinkDialog } from "./link-dialouge"
import styles from "@/styles/rich-text-editor.module.css"

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  id?: string
}

export function RichTextEditor({ value, onChange, id }: RichTextEditorProps) {
  // Every hook lives here, above any conditional return — this is what
  // was crashing before (useState was declared after `if (!editor) return`,
  // which changes how many hooks run between renders and React does not
  // allow that).
  const [linkOpen, setLinkOpen] = useState(false)

  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Link.configure({
        openOnClick: false,
        protocols: ["http", "https", "mailto"],
        HTMLAttributes: { class: styles.editorLink },
      }),
    ],
    []
  )

  const editorProps = useMemo(
    () => ({
      attributes: {
        ...(id ? { id } : {}),
        class: styles.editorContent,
      },
    }),
    [id]
  )

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value || "",
    editorProps,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html === "<p></p>" ? "" : html)
    },
  })

  // Keep the editor in sync when the incoming value changes (e.g. switching rows).
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value !== current && !(value === "" && current === "<p></p>")) {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) {
    return <div className="min-h-40 rounded-md border bg-muted/30" aria-hidden="true" />
  }

  return (
    <div className="overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring/50">
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/40 p-1.5">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
        >
          <Strikethrough className="size-4" />
        </Toggle>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Large heading"
        >
          <Heading2 className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Small heading"
        >
          <Heading3 className="size-4" />
        </Toggle>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bulleted list"
        >
          <List className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
        >
          <ListOrdered className="size-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Quote"
        >
          <Quote className="size-4" />
        </Toggle>

        <Separator orientation="vertical" className="mx-1 h-6" />

        {/* Add link is a real toggle-able state (cursor is either inside a
            link or not), so Toggle is correct here. */}
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={() => setLinkOpen(true)}
          aria-label="Add link"
        >
          <LinkIcon className="size-4" />
        </Toggle>

        {/* Undo/Redo/Unlink are one-shot actions, not on/off states —
            plain buttons are the correct component here. */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          disabled={!editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
          aria-label="Remove link"
        >
          <Unlink className="size-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
        >
          <Undo2 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      <LinkDialog
        open={linkOpen}
        onOpenChange={setLinkOpen}
        initialUrl={editor.getAttributes("link").href ?? ""}
        onSubmit={(url) => {
          if (!url) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            return
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
        }}
      />

      <EditorContent editor={editor} />
    </div>
  )
}
