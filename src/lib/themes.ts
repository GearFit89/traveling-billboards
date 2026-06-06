// Theme configuration for Traveling Billboards
// Add new themes here - just copy an existing theme and modify the values

export interface ThemeColors {
  // Core colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  
  // Brand colors
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  
  // UI colors
  muted: string;
  mutedForeground: string;
  border: string;
  
  // // Mood badge colors (for Thoughts page)
  // moodReflective: string;
  // moodReflectiveText: string;
  // moodExcited: string;
  // moodExcitedText: string;
  // moodCurious: string;
  // moodCuriousText: string;
  // moodPeaceful: string;
  // moodPeacefulText: string;/ Mood badge colors (for Thoughts page)
  // moodReflective: string;
  // moodReflectiveText: string;
  // moodExcited: string;
  // moodExcitedText: string;
  // moodCurious: string;
  // moodCuriousText: string;
  // moodPeaceful: string;
  // moodPeacefulText: string;
}

export interface Theme {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
}

export const themes: Record<string, Theme> = {
  'light-blue': {
    id: 'light-blue',
    name: 'Light Blue',
    mode: 'light',
    colors: {
      // Core - light background with dark text
      background: 'oklch(0.98 0.01 240)',
      foreground: 'oklch(0.15 0.02 240)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 240)',
      
      // Brand - blue accent
      primary: 'oklch(0.55 0.2 240)',
      primaryForeground: 'oklch(1 0 0)',
      accent: 'oklch(0.55 0.2 240)',
      accentForeground: 'oklch(1 0 0)',
      
      // UI
      muted: 'oklch(0.95 0.01 240)',
      mutedForeground: 'oklch(0.45 0.02 240)',
      border: 'oklch(0.9 0.02 240)',
      
      // // Mood badges
      // moodReflective: 'oklch(0.92 0.08 280)',
      // moodReflectiveText: 'oklch(0.4 0.15 280)',
      // moodExcited: 'oklch(0.92 0.1 45)',
      // moodExcitedText: 'oklch(0.45 0.15 45)',
      // moodCurious: 'oklch(0.92 0.08 220)',
      // moodCuriousText: 'oklch(0.4 0.15 220)',
      // moodPeaceful: 'oklch(0.92 0.08 160)',
      // moodPeacefulText: 'oklch(0.4 0.15 160)',
    },
  },
  'dark-amber': {
    id: 'dark-amber',
    name: 'Dark Amber',
    mode: 'dark',
    colors: {
      // Core - dark background with light text
      background: 'oklch(0.12 0.01 260)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.01 260)',
      cardForeground: 'oklch(0.98 0 0)',
      
      // Brand - amber accent
      primary: 'oklch(0.75 0.15 45)',
      primaryForeground: 'oklch(0.12 0.01 260)',
      accent: 'oklch(0.75 0.15 45)',
      accentForeground: 'oklch(0.12 0.01 260)',
      
      // UI
      muted: 'oklch(0.22 0.01 260)',
      mutedForeground: 'oklch(0.65 0 0)',
      border: 'oklch(0.28 0.01 260)',
      
      // Mood badges
      // moodReflective: 'rgba(147, 112, 219, 0.2)',
      // moodReflectiveText: 'rgb(177, 156, 217)',
      // moodExcited: 'rgba(255, 180, 80, 0.2)',
      // moodExcitedText: 'oklch(0.75 0.15 45)',
      // moodCurious: 'rgba(100, 200, 255, 0.2)',
      // moodCuriousText: 'rgb(140, 210, 255)',
      // moodPeaceful: 'rgba(100, 220, 150, 0.2)',
      // moodPeacefulText: 'rgb(140, 220, 170)',
    },
  },
};

// Set the active theme here - change this value to switch themes
export const ACTIVE_THEME_ID = 'light-blue';

export function getActiveTheme(): Theme {
  return themes[ACTIVE_THEME_ID] || themes['light-blue'];
}

export function getThemeById(id: string): Theme | undefined {
  return themes[id];
}

export function getAllThemes(): Theme[] {
  return Object.values(themes);
}
