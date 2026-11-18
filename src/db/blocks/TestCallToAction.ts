import type { Block } from "payload";

export const TestCallToAction: Block = {
  slug: "testCallToAction",
  interfaceName: "TestCallToActionBlock",
  labels: { singular: "Call to action", plural: "Call to action blocks" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "buttonLabel", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
};
