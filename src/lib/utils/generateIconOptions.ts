import { iconComponents } from '@/components/icons';
import { type IconKey } from '@/lib/icons';



const availableIcons = Object.keys(iconComponents) as IconKey[];

export function generateIconOptions(): { label: string; value: string }[] {
  return availableIcons.map((iconKey) => ({
    label: iconKey,
    value: iconKey,
  }));
}

export default generateIconOptions;