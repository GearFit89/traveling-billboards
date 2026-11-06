import  { CollectionConfig } from 'payload'

export const Thoughts: CollectionConfig = {
  slug: 'thoughts',
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'sign',
      type: 'relationship',
      relationTo: 'signs',
      required: true,
    },
    {
      name: 'content',
      type: 'richText', //TODO or 'textarea' / 'html' depending on how you want to render HTML content
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
}