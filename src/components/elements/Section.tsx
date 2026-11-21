import type { SectionBlock } from "@/payload-types";
import type { BlockProps } from '@/types';

export function Section({ block }: BlockProps<SectionBlock> ) {
  return (
    <section>
      <h2>{block.heading}</h2>
      {block.subtitle && <p>{block.subtitle}</p>}
    </section>
  );
}   
