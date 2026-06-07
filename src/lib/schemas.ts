import * as v from "valibot";

export const BaseNoteSchema = v.object({
  id: v.string(),
  date: v.string(),
  content: v.optional(v.string()),
  location: v.optional(v.string()),
  title: v.optional(v.string()),
  html: v.optional(v.string()),
});
export const ThoughtSchema = BaseNoteSchema;
export const CommentSchema = BaseNoteSchema;
export const SignDataSchema = v.object({
  id: v.string(),
  title: v.string(),
  img_key: v.string(),
  img_alt: v.string(),
  discription: v.string(),
  thoughts: v.array(ThoughtSchema),
  web_hits: v.number(),
  qr_hits: v.number(),
  metadata: v.optional(v.record(v.string(), v.any())),
});

export const LinkDataSchema = v.object({
  id: v.string(),
  link: v.string(),
  title: v.string(),
  img_key: v.string(),
  img_alt: v.string(),
  discription: v.string(),
  section: v.string(),
  hits: v.number(),
  metadata: v.optional(v.record(v.string(), v.any())),
});

export const SectionSchema = v.object({
  id: v.string(),
  name: v.string(),
  description: v.optional(v.string()),
  iconKey: v.optional(v.string()),
  icon_key: v.optional(v.string()),
  img_key: v.optional(v.string()),
  img_alt: v.optional(v.string()),
  links: v.optional(v.array(LinkDataSchema)),
});
