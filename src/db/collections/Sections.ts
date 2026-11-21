import { CollectionConfig } from 'payload'

export const Sections: CollectionConfig = {
  slug: 'sections',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'iconKey',
      type: 'text',
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
      name: 'linkCount',
      type: 'number',
    },
  ],
}