/**
 * content.ts
 * ------------------------------------------------------------------
 * This file is the "control center" for your admin panel.
 *
 * You DON'T need to know how to code to use it. Each block below
 * describes one type of thing you can manage (a "collection"),
 * the boxes people fill in for it (the "columns"/"fields"), and a
 * few example entries (the "rows") so you can see what real data
 * looks like.
 *
 * To change a label that shows on screen, just edit the text inside
 * the quotation marks next to `label`. To change the little grey
 * hint under a box, edit the text next to `hint`.
 * ------------------------------------------------------------------
 */

import { 
  getAllLinks, 
  getAllSections,
   getAllSigns, 
  getAllThoughts } from "@/lib/actions";

import type { LucideIcon } from "lucide-react"
import {
  LayoutGrid,
  Link2,
  SignpostBig,
  NotebookPen,
  Hash,
  Type,
  Globe,
  FolderTree,
  Image as ImageIcon,
  Text,
  Braces,
  MapPin,
  Calendar,
} from "lucide-react"


export const FnMap: Record<Ids, (id?: string)=> Promise<any>> = {
  "links": async ()=>  getAllLinks(),
  "signs": async ()=> {
    const data =  getAllSigns();
    console.warn((await data).data)
    return data;

  }
    
   ,
  "sections" : async ()=> getAllSections(),
  "thoughts": async ()=> getAllThoughts(),
  "home":async ()=>{} // TODO add something 

}
/** How a single box (column) on a form behaves. */
export type FieldType = "text" | "url" | "longtext" | "date" | "html"| "image"|"sign"|"section"

export interface Field {
  /** The real database column name. Do not change this. */
  key: string
  /** The friendly name people see on screen. Safe to edit. */
  label: string
  /** A short, plain-English hint shown under the box. Safe to edit. */
  hint: string
  /** What kind of box to show. */
  type: FieldType
  /** Whether this box must be filled in before saving. */
  required?: boolean
  /** A small example so people know what to type. */
  example?: string
  /** The icon shown next to the label. */
  icon: LucideIcon
}
export type Ids = "sections"| "links" | "signs" |"thoughts"| "home";
export interface Collection {
  /** Internal id used by the tabs. */
  id: Ids;
  /** Friendly name of this group of things. */
  label: string
  /** One sentence explaining what this group is for. */
  description: string
  /** The icon shown on the tab and headings. */
  icon: LucideIcon
  /** The word for a single entry, e.g. "Section". */
  singular: string
  /** The boxes people fill in (the columns). */
  fields: Field[]
  /** A few example entries so the screen isn't empty (the rows). */
  sampleRows: Record<string, string>[]
}

/* ------------------------------------------------------------------ */
/*  SECTIONS                                                           */
/* ------------------------------------------------------------------ */

const sections: Collection = {
  id: "sections",
  label: "Sections",
  description: "The big groups that organize everything else on your site.",
  icon: LayoutGrid,
  singular: "Section",
  fields: [
    {
      key: "id",
      label: "The id",
      hint: "use numbers",
      type: "text",
      required: true,
      example: "7",
      icon: Hash,
    },
    {
      key: "name",
      label: "Title",
      hint: "The heading people will actually see on the page.",
      type: "text",
      required: true,
      example: "Engineering Assets",
      icon: Type,
    },
    {
      key: "description",
      label: "Subtitle",
      hint: "A short line of text shown under the title.",
      type: "text",
      example: "Everything the engineering team needs in one place.",
      icon: Text,
    },
    {
      key: "icon_key",
      label: "Icon Name",
      hint: "The name of the small picture-icon to show. Leave blank if unsure.",
      type: "text",
      example: "wrench",
      icon: ImageIcon,
    },
    {
      key: "img_key",
      label: "Image File",
      hint: "The file name of the picture for this section.",
      type: "text",
      example: "engineering-cover.jpg",
      icon: ImageIcon,
    },
    {
      key: "img_alt",
      label: "Image Description",
      hint: "A sentence describing the picture, read aloud to people who can't see it.",
      type: "text",
      example: "A laptop on a desk with code on the screen.",
      icon: Text,
    },
  ],
  sampleRows: [
    {
      id: "development-links",
      name: "Engineering Assets",
      description: "Everything the engineering team needs in one place.",
      icon_key: "wrench",
      img_key: "engineering-cover.jpg",
      img_alt: "A laptop on a desk with code on the screen.",
    },
    {
      id: "design-resources",
      name: "Design Resources",
      description: "Brand files, mockups, and inspiration.",
      icon_key: "palette",
      img_key: "design-cover.jpg",
      img_alt: "A colorful set of design swatches.",
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  LINKS                                                              */
/* ------------------------------------------------------------------ */

const links: Collection = {
  id: "links",
  label: "Links",
  description: "Clickable shortcuts that send people to another web page.",
  icon: Link2,
  singular: "Link",
  fields: [
    {
      key: "id",
      label: "Short Name (ID)",
      hint: "A simple nickname used behind the scenes. Use dashes instead of spaces.",
      type: "text",
      required: true,
      example: "team-handbook",
      icon: Hash,
    },
    {
      key: "title",
      label: "Link Text",
      hint: "The words people click on.",
      type: "text",
      required: true,
      example: "Team Handbook",
      icon: Type,
    },
    {
      key: "link",
      label: "Web Address (URL)",
      hint: "The full address the link opens. It should start with https://",
      type: "url",
      required: true,
      example: "https://example.com/handbook",
      icon: Globe,
    },
    {
      key: "section",
      label: "Belongs To Section",
      hint: "The Short Name of the section this link should appear under.",
      type: "section",
      required: true,
      example: "development-links",
      icon: FolderTree,
    },
    {
      key: "img_key",
      label: "Thumbnail Image",
      hint: "The file name of a small preview picture.",
      type: "text",
      example: "handbook-thumb.jpg",
      icon: ImageIcon,
    },
    {
      key: "img_alt",
      label: "Image Description",
      hint: "A sentence describing the thumbnail for people who can't see it.",
      type: "text",
      example: "The cover of the team handbook.",
      icon: Text,
    },
    {
      key: "description",
      label: "Notes",
      hint: "A longer explanation of what this link is for.",
      type: "longtext",
      example: "Onboarding guide covering our tools, processes, and values.",
      icon: Text,
    },
  
  ],
  sampleRows: [
    {
      id: "team-handbook",
      title: "Team Handbook",
      link: "https://example.com/handbook",
      section: "development-links",
      img_key: "handbook-thumb.jpg",
      img_alt: "The cover of the team handbook.",
      description: "Onboarding guide covering our tools, processes, and values.",
      
    },
    {
      id: "status-page",
      title: "System Status",
      link: "https://status.example.com",
      section: "development-links",
      img_key: "",
      img_alt: "",
      description: "Live view of whether our services are online.",
      
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  SIGNS                                                              */
/* ------------------------------------------------------------------ */

const signs: Collection = {
  id: "signs",
  label: "Signs",
  description: "Gospel signs and their details.",
  icon: SignpostBig,
  singular: "Sign",
  fields: [
    {
      key: "id",
      label: "Short Name (ID)",
      hint: "Usually a number",
      type: "text",
      required: true,
      example: "lobby-welcome",
      icon: Hash,
    },
    {
      key: "title",
      label: "Sign Title",
      hint: "The name of this sign.",
      type: "text",
      required: true,
      example: "Lobby Welcome Board",
      icon: Type,
    },
    {
      key: "img_key",
      label: "Sign Image",
      hint: "The file name of the photo of the sign.",
      type: "image",
      example: "lobby-welcome.jpg",
      icon: ImageIcon,
    },
    {
      key: "img_alt",
      label: "Image Description",
      hint: "A sentence describing the sign photo for people who can't see it.",
      type: "text",
      example: "A wooden welcome sign in the office lobby.",
      icon: Text,
    },
    {
      key: "description",
      label: "Short Description",
      hint: "Where the sign is and anything worth remembering about it.",
      type: "longtext",
      example: "Mounted on the wall behind the front desk on the ground floor.",
      icon: MapPin,
    },
   
  ],
  sampleRows: [
    {
      id: "lobby-welcome",
      title: "Lobby Welcome Board",
      img_key: "lobby-welcome.jpg",
      img_alt: "A wooden welcome sign in the office lobby.",
      description: "Mounted on the wall behind the front desk on the ground floor.",
      
    },
  ],
}

/* ------------------------------------------------------------------ */
/*  THOUGHTS                                                           */
/* ------------------------------------------------------------------ */

const thoughts: Collection = {
  id: "thoughts",
  label: "Thoughts",
  description: "Short notes or messages attached to a sign.",
  icon: NotebookPen,
  singular: "Thought",
  fields: [
    {
      key: "id",
      label: "Short Name (ID)",
      hint: "A simple nickname used behind the scenes. Use dashes instead of spaces.",
      type: "text",
      required: true,
      example: "welcome-note-1",
      icon: Hash,
    },
    {
      key: "sign_id",
      label: "Attached To Sign",
      hint: "The Short Name of the sign this note belongs to.",
      type: "sign",
      required: true,
      example: "lobby-welcome",
      icon: SignpostBig,
    },
    {
      key: "content",
      label: "Message (HTML)",
      hint: "Write your note using the toolbar to make text bold, add headings, lists, and links. No code needed.",
      type: "html",
      required: true,
      example: "Welcome to the team! We're so glad you're here.",
      icon: Text,
    },
    // {
    //   key: "location",
    //   label: "Place",
    //   hint: "Where this thought was written or is about.",
    //   type: "text",
    //   example: "San Francisco Office",
    //   icon: MapPin,
    // },
    {
      key: "date",
      label: "Date",
      hint: "The date for this note. Leave blank to use today automatically.",
      type: "date",
      example: "2026-07-06",
      icon: Calendar,
    },
  ],
  sampleRows: [
    {
      id: "welcome-note-1",
      sign_id: "lobby-welcome",
      content: "<h3>Welcome to the team!</h3><p>We're <strong>so glad</strong> you're here. A few things to check out:</p><ul><li>Read the team handbook</li><li>Say hi in the chat</li></ul>",
      location: "San Francisco Office",
      date: "2026-07-06",
    },
  ],
}


export const dashboardContent = {
  greeting: "Greetings",
  title: "ADMIN",
  stats: [
    {
      id: "link-hits",
      label: "Link hits",
      collectionId: "links" as Ids,
      getValue: (row: any) => Number(row.hitCount ?? row.hits ?? 0),
    },
    {
      id: "sign-hits",
      label: "Sign hits",
      collectionId: "signs" as Ids,
      getValue: (row: any) => Number(row.hitCount ?? row.hits ?? 0),
    },
  ],
}

/** Everything the admin panel knows how to manage, in tab order. */
export const collections: Collection[] = [sections, links, signs, thoughts]
