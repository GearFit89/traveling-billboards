import type { SectionBlock } from "@/payload-types";

export function Section({ block }: { block: SectionBlock }) {
  return (
    <section>
      <h2>{block.heading}</h2>
      {block.subtitle && <p>{block.subtitle}</p>}
    </section>
  );
}   