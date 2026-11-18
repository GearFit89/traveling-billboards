import type { CollectionConfig } from "payload";
import { TestText } from "../blocks/TestText";
import { TestImage } from "../blocks/TestImage";
import { TestQuote } from "../blocks/TestQuote";
import { TestCallToAction } from "../blocks/TestCallToAction";

export const Testbut: CollectionConfig = {
  slug: "testbut",
  labels: { singular: "Block test", plural: "Block tests" },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "blocks",
      type: "blocks",
      blocks: [TestText, TestImage, TestQuote, TestCallToAction],
    },
  ],
};
