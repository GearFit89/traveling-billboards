import type { GroupField } from "payload";

type CTAButtonFieldOptions = {
  name: string;
  label?: string;
  defaultValues: {
    text: string;
    linkTo: string;
    isHighlighted: boolean;
  };
};

export function createCTAButtonField({
  name,
  label,
  defaultValues,
}: CTAButtonFieldOptions): GroupField {
  return {
    name,
    label,
    type: "group",
    fields: [
      {
        name: "text",
        type: "text",
        required: true,
        defaultValue: defaultValues.text,
      },
      {
        name: "linkTo",
        type: "text",
        required: true,
        defaultValue: defaultValues.linkTo,
      },
      {
        name: "isHighlighted",
        type: "checkbox",
        defaultValue: defaultValues.isHighlighted,
      },
    ],
  };
}