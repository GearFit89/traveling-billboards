import { CollectionConfig } from 'payload'

export const Signs: CollectionConfig = {
  slug: 'signs',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'imgKey',
      type: 'text',
    },
    {
      name: 'imgAlt',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'webHits',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'qrHits',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'metadata',
      type: 'json',
    },
  ],
}