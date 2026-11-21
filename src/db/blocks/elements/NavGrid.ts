import type { Block } from "payload";
import { link } from "@/db/fields/link";
import { generateIconOptions } from "@/lib/utils/generateIconOptions";

export const NavGrid: Block = {
  slug: "navGrid",
  interfaceName: "NavGridBlock",
  fields: [
    {
      type: "array",
      name: "items",
      minRows: 1,
      maxRows: 12,
      labels: {
        plural: "Items",
        singular: "Item",
      },
      fields: [
        {
          name: "heading",
          label: "Heading",
          required: true,
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          required: false,
          type: "text",
        },
        {
          name: "color",
          label: "Background Color",
          type: "text",
          required: false,
          defaultValue: "#ffffff", // Default to white if not specified
        },

        link({
          overrides: {
            label: "Link",
            name: "link",
            required: true,
          },
        }),
        {
          name: "icon",
          label: "Icon",
          type: "select",
          required: true,
          options: generateIconOptions(),
        },
      ],
    },
  ],
};
