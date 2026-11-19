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
      name: "navBrandWord1",
      label: "Word 1",
      type: "text",
      required: true,
    },
    {
      name: "accentedWord",
      label: "Text to Highlight",
      type: "text",
      required: false,
    },
    {
      name: "navBrandWord2",
      label: "Word 2",
      type: "text",
      required: false,
    },
    {
      name: "navBrandColor",
      label: "Word Color",
      type: "text",
      required: false,
      defaultValue: "red",
    },
    {
      name: "navBrandAccentColor",
      label: "Highlight Color",
      type: "text",
      required: false,
      defaultValue: "yellow",
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
