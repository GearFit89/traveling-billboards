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
  
  //message Board colors 
  msgOnlineColor?:string
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
  'blue-white': {
    id: 'blue-white',
    name: 'Blue / White',
    mode: 'light',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#e8f1ff',
      cardForeground: '#0f172a',
      primary:  'rgb(7, 7, 102)',
      
      primaryForeground: '#ffffff',
      accent: '#60a5fa',
      accentForeground: '#288dc7',
      muted: '#eff6ff',
      mutedForeground: '#475569',
      border: '#dbeafe',
      msgOnlineColor:  'rgb(39, 148, 6)',
    },
  },
  'blue-sky': {
    id: 'blue-sky',
    name: 'Sky Blue',
    mode: 'light',
    colors: {
      background: 'oklch(0.97 0.01 240)',
      foreground: 'oklch(0.10 0.03 240)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.10 0.03 240)',
      primary: 'oklch(0.48 0.20 220)',
      primaryForeground: 'oklch(1 0 0)',
      accent: 'oklch(0.55 0.18 210)',
      accentForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.93 0.03 240)',
      mutedForeground: 'oklch(0.42 0.02 240)',
      border: 'oklch(0.88 0.02 240)',
    },
  },
  'red-white': {
    id: 'red-white',
    name: 'Red / White',
    mode: 'light',
    colors: {
      background: 'oklch(0.98 0.01 90)',
      foreground: 'oklch(0.12 0.02 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.12 0.02 260)',
      primary: 'oklch(0.66 0.22 35)',
      primaryForeground: 'oklch(1 0 0)',
      accent: 'oklch(0.53 0.20 30)',
      accentForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.95 0.01 80)',
      mutedForeground: 'oklch(0.40 0.02 260)',
      border: 'oklch(0.88 0.02 35)',
    },
  },
  'white-black': {
    id: 'white-black',
    name: 'White / Black',
    mode: 'light',
    colors: {
      background: 'oklch(0.99 0.01 80)',
      foreground: 'oklch(0.07 0.01 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.07 0.01 260)',
      primary: 'oklch(0.06 0.01 260)',
      primaryForeground: 'oklch(1 0 0)',
      accent: 'oklch(0.10 0.01 260)',
      accentForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.95 0.01 80)',
      mutedForeground: 'oklch(0.45 0.02 260)',
      border: 'oklch(0.84 0.01 260)',
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
export const ACTIVE_THEME_ID = 'blue-white';

export function getActiveTheme(): Theme {
  return themes[ACTIVE_THEME_ID] || themes['blue-white'];
}

export function getThemeById(id: string): Theme | undefined {
  return themes[id];
}

export function getAllThemes(): Theme[] {
  return Object.values(themes);
}
