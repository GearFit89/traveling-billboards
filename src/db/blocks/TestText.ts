import type { Block } from "payload";

export const TestText: Block = {
  slug: "testText",
  interfaceName: "TestTextBlock",
  labels: { singular: "Text", plural: "Text blocks" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
  ],
};
