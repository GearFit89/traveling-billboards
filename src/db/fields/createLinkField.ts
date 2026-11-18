import { Field } from "payload";

export function createLinkField(): Field[] {
  return [
    {
      name: "text",
      label: "Display Text",
      type: "text",
      required: false
    },
    {
      name: "href",
      label: "Link To",
      type: "relationship",
      required: true,
      relationTo: "pages",
    },
    {
      name: "shouldOpenNewTab",
      label: "Open in a new Tab",
      type: "checkbox",
      defaultValue: true,
    },
  ];
}
