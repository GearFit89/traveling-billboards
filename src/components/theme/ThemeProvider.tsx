'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { getActiveTheme, type Theme, type ThemeColors } from '@/lib/themes';

interface ThemeContextValue {
  theme: Theme;
  colors: ThemeColors;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = getActiveTheme();
  
  return (
    <ThemeContext.Provider value={{ theme, colors: theme.colors, mode: theme.mode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Generate CSS custom properties from theme
export function generateThemeCSS(theme: Theme): string {
  const { colors } = theme;
  return `
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
    --theme-mood-reflective: ${colors.moodReflective};
    --theme-mood-reflective-text: ${colors.moodReflectiveText};
    --theme-mood-excited: ${colors.moodExcited};
    --theme-mood-excited-text: ${colors.moodExcitedText};
    --theme-mood-curious: ${colors.moodCurious};
    --theme-mood-curious-text: ${colors.moodCuriousText};
    --theme-mood-peaceful: ${colors.moodPeaceful};
    --theme-mood-peaceful-text: ${colors.moodPeacefulText};
  `;
}
