import * as v from "valibot";

export const BaseNoteSchema = v.object({
  id: v.string( "BaseNoteSchema.id must be a string" ),
  date: v.string( "BaseNoteSchema.date must be a string" ),
  content: v.optional(v.string( "BaseNoteSchema.content must be a string" )),
  location: v.optional(v.string( "BaseNoteSchema.location must be a string" )),
  title: v.optional(v.string( "BaseNoteSchema.title must be a string" )),
 
});

export const metadataSchema = v.optional(
  v.nullable(
    v.union([
      // If it's an empty string, just treat it as an empty object (or undefined)
      v.literal(''), 
      
      // Otherwise, if it has text, run the pipeline
      v.pipe(
        v.string("metadata must be a string"),
        v.parseJson(),
        v.record(
          v.string("metadata record keys must be strings"),
          v.any()
        )
      )
    ])
  )
);
//the thought SQL table
export const ThoughtSchema = v.object({
  ...BaseNoteSchema.entries,
  sign_id: v.string("ThoughtDataScheam.sign id is bad"),
   html: v.optional(v.string( "ThoughtDataSchema.html must be a string" )),
})


//the comment  SQL table
export const CommentSchema = BaseNoteSchema;

export const SignDataSchema = v.object({
  id: v.string( "SignDataSchema.id must be a string" ),
  title: v.string( "SignDataSchema.title must be a string" ),
  img_key: v.string( "SignDataSchema.img_key must be a string" ),
  img_alt: v.string( "SignDataSchema.img_alt must be a string" ),
  description: v.string( "SignDataSchema.description must be a string" ),
 
  web_hits: v.number( "SignDataSchema.web_hits must be a number" ),
  qr_hits: v.number( "SignDataSchema.qr_hits must be a number" ),
  metadata: metadataSchema,
});
// the link SQL table
export const LinkDataSchema = v.object({
  id: v.string( "LinkDataSchema.id must be a string" ),
  link: v.string( "LinkDataSchema.link must be a string" ),
  title: v.string( "LinkDataSchema.title must be a string" ),
  img_key: v.string( "LinkDataSchema.img_key must be a string" ),
  img_alt: v.string( "LinkDataSchema.img_alt must be a string" ),
  description: v.string( "LinkDataSchema.description must be a string" ),
  section: v.string( "LinkDataSchema.section must be a string" ),
  hits: v.number( "LinkDataSchema.hits must be a number" ),
  metadata: metadataSchema,
});
// the section SQL table
export const SectionSchema = v.object({
  id: v.string( "SectionSchema.id must be a string" ),
  name: v.string( "SectionSchema.name must be a string" ),
  description: v.optional(v.string( "SectionSchema.description must be a string" )),
  iconKey: v.optional(v.string( "SectionSchema.iconKey must be a string" )),
  icon_key: v.optional(v.string( "SectionSchema.icon_key must be a string" )),
  img_key: v.optional(v.string( "SectionSchema.img_key must be a string" )),
  img_alt: v.optional(v.string( "SectionSchema.img_alt must be a string" )),
  links: v.optional(v.array(LinkDataSchema)),
});
