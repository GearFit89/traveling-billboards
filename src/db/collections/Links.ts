import { CollectionConfig } from "payload";

export const Links: CollectionConfig = {
  slug: "links",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
    {
      name: "imgKey",
      type: "text",
    },
    {
      name: "imgAlt",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      label: 'Section',
      name: "section",
      type: "relationship",
      relationTo: "sections",
    },
    
  ],
};
