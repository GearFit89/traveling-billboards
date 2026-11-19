import { Block, getPayload } from "payload";
import config from "@payload-config";
import { Hero } from "@/components/elements/Hero";
import { Section } from "@/components/elements/Section";
import { NavGrid } from "@/components/elements/NavGrid";
import { getBlock } from "@/db/blocks/blockMap";
import type { Page as PageType } from "@/payload-types";

interface PageProps {
  page: PageType;
  children?: React.ReactNode;
}
export function Page({ page, children }: PageProps) {
  
  const layout = page?.layout;

  if (!layout || layout.length === 0) {
    return null;
  }
  return (
    <div>
      <Hero page={page} />
      {children}
      {layout.map((block, index) => {
        const BlockComponent = getBlock(block.blockType);
        return BlockComponent ? (
          <BlockComponent key={index} page={page} block={block as never} />
        ) : // To handle the type union without causing type errors, for now
        //TODO; FIGURE out how to get correct types
        null;
      })}
    </div>
  );
}
