import { Sign } from "@/payload-types";
import { CollectionConfig } from "payload";
import { revalidatePage } from "./hooks/revilatePage";
import { upload } from "payload/shared";

export const Signs: CollectionConfig = {
  slug: "signs",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      label: "Sign Image",
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imgAlt",
      type: "text",
      required: true, 
      admin: {
        description: "Describe the image for screen readers and SEO.",
      },
    },
    
    
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
};
