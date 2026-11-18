import type { GlobalConfig } from "payload";
import { linkGroup } from "@/db/fields/linkGroup";

export const Nav: GlobalConfig = {
  slug: "nav",
  label: "Navigation",
  access: {
    read: () => true,
  },
  admin: {
  hideAPIURL: process.env.NODE_ENV === "production" ? true : false,
},
  fields: [
    {
      name: "navBrand",
      label: "Website Name",
      type: "text",
      required: true,
    },
    {
      name: "navBrandColor",
      label: "Website Name Color",
      type: "text",
      required: false,
      defaultValue: "red",
    },
    {
      name: "siteLogo",
      label: "Site Logo",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    linkGroup({
      appearances: ["default", "outline", "highlighted"],
      overrides: {
        admin: {
          initCollapsed: true,
        },
      },
    }),
  ],
};
