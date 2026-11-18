import type { Block } from "payload";

export const TestImage: Block = {
  slug: "testImage",
  interfaceName: "TestImageBlock",
  labels: { singular: "Image", plural: "Image blocks" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "caption", type: "text" },
  ],
};
