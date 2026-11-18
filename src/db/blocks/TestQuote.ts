import type { Block } from "payload";

export const TestQuote: Block = {
  slug: "testQuote",
  interfaceName: "TestQuoteBlock",
  labels: { singular: "Quote", plural: "Quote blocks" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "attribution", type: "text" },
  ],
};
