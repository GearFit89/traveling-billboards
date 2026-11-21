import { NavGrid } from '@/components/elements/NavGrid';
import { Section } from '@/components/elements/Section';
import { Hero } from '@/components/elements/Hero';

export const blockMap = {
  hero: Hero,
  section: Section,
  navGrid: NavGrid,
};

export type BlockMap = typeof blockMap;
export type BlockKey = keyof BlockMap;

export function getBlock (blockType: BlockKey| string){
 if(blockType in blockMap){
  return blockMap[blockType as BlockKey];
 } else {
  console.warn(`Block type "${blockType}" not found in blockMap.`);
  return null;
 }
}