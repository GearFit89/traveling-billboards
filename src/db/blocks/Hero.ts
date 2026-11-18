import type { Block } from "payload";

import { createCTAButtonField } from "../fields/createCTAButtonField";

export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Heroes",
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "You saw our sign. Now hear our message.",
    },
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "It’s all about",
    },
    {
      name: "headingHighlight",
      type: "text",
      defaultValue: "Jesus.",
      admin: {
        description: "Highlighted text shown after the heading.",
      },
    },
    {
      name: "secondaryHeading",
      type: "text",
      defaultValue: "Truth welcomes questions.",
    },
    {
      name: "subheading",
      type: "textarea",
      defaultValue:
        "Explore, question, fact-check, and decide for yourself.",
    },

    createCTAButtonField({
      name: "ctaButton",
      label: "Primary CTA Button",
      defaultValues: {
        text: "Explore the message",
        linkTo: "/#explore",
        isHighlighted: true,
      },
    }),

    createCTAButtonField({
      name: "secondaryCtaButton",
      label: "Secondary CTA Button",
      defaultValues: {
        text: "View our signs",
        linkTo: "/our-signs",
        isHighlighted: false,
      },
    }),

    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};