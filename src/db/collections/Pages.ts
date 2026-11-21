import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { authenticated } from "@/access/authenticated";
import { createCTAButtonField } from "../fields/createCTAButtonField";
import { generatePreviewPath } from "@/lib/utils/generatePreviewPath";

import { NavGrid } from "@/db/blocks/elements/NavGrid";
import { Section } from "@/db/blocks/elements/Section";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { revalidateDelete, revalidatePage } from "./hooks/revilatePage";
import { TestImage } from "../blocks/TestImage";
import { TestCallToAction } from "../blocks/TestCallToAction";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // NOTE: the slug generic (CollectionConfig<'pages'>) is dropped to work around a TypeScript 6
  // regression where a slug-typed config's defaultPopulate is not assignable to buildConfig's
  // collections array. defaultPopulate falls back to SelectType (keys no longer field-checked);
  // restore the generic once the core types are fixed.
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: "pages",
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: "pages",
        req,
      }),
    useAsTitle: "title",

    hideAPIURL: process.env.NODE_ENV === "production" ? true : false,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
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
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [TestImage, TestCallToAction, NavGrid, Section],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },

    slugField({
      useAsSlug: "title", // Defaults to 'title', so this can even be omitted
    }),
  ],
  hooks: {
    afterChange: [revalidatePage],

    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
