import { Block } from "payload";

export const Section: Block = {
  slug: "Element.section",
  interfaceName: "SectionBlock",
  labels: {
    singular: "Section",
    plural: "Sections",
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      required: true,
      type: "text",
    },
    {
      name: "subtitle",
      label: "Subtitle",
      required: false,
      type: "text",
    },
  ],
};
