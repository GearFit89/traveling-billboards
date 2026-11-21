
import { type IconKey, ICON_KEYS } from "@/lib/icons";

export function generateIconOptions(): { label: string; value: string }[] {
  return ICON_KEYS.map((iconKey) => ({
    label: iconKey,
    value: iconKey,
  }));
}

export default generateIconOptions;
