// Server-side theme style injection
// This generates the CSS variables for the active theme

import { getActiveTheme } from '@/lib/themes';

export function ThemeStyles() {
  const theme = getActiveTheme();
  const { colors, mode } = theme;
  
  const cssVariables = `
    :root {
      --theme-background: ${colors.background};
      --theme-foreground: ${colors.foreground};
      --theme-card: ${colors.card};
      --theme-card-foreground: ${colors.cardForeground};
      --theme-primary: ${colors.primary};
      --theme-primary-foreground: ${colors.primaryForeground};
      --theme-accent: ${colors.accent};
      --theme-accent-foreground: ${colors.accentForeground};
      --theme-muted: ${colors.muted};
      --theme-muted-foreground: ${colors.mutedForeground};
      --theme-border: ${colors.border};
    
      --theme-mode: ${mode};
    }
  `;
  
  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />;
}
