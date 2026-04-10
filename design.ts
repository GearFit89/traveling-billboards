export const designConfig:DesignConfig = { // Exporting the main design object
    layout: { // Defining the global layout rules
      display: "flex", // Using flexbox for a mobile-first approach
      flexGrow: 1, // Allowing the main container to grow and fill the screen
      width: "100%", // Setting standard width using percentages
      minHeight: "100vh", // Using pixel-based vh for minimum height
      minWidth: "320px", // Using pixels strictly for minimum width
      padding: "2rem", // Standardizing inner spacing using rem
      gap: "1.5rem" // Standardizing element separation using rem
    }, // Closing layout object
    themes: { // Opening the themes collection
      classic: { // Theme 1: Clean, trustworthy blues (Classic Gospel)
        background: "#f8fafc", // Very light blue-gray background
        text: "#0f172a", // Dark slate text for readability
        primary: "#0284c7", // Trustworthy blue for main branding
        secondary: "#38bdf8", // Lighter blue for supporting elements
        accent: "#f59e0b" // Warm amber for links and calls to action
      }, // Closing classic theme
      warm: { // Theme 2: Earthy and welcoming (Sunrise/Billboard feel)
        background: "#fffbeb", // Soft, warm cream background
        text: "#451a03", // Deep brown text for contrast
        primary: "#d97706", // Strong amber/orange for branding
        secondary: "#fcd34d", // Soft yellow for highlights
        accent: "#10b981" // Emerald green for links and buttons
      }, // Closing warm theme
      modern: { // Theme 3: High contrast and bold (Street/Traveling vibe)
        background: "#f1f5f9", // Cool gray background
        text: "#1e293b", // Slate gray text
        primary: "#4f46e5", // Vibrant indigo for a modern look
        secondary: "#818cf8", // Soft indigo for secondary elements
        accent: "#e11d48" // Rose red for high-visibility billboard elements
      }, // Closing modern theme
      dark: { // Theme 4: Dark Mode (Low Light/Nighttime)
        background: "#0f172a", // Deep slate background
        text: "#f8fafc", // Light gray/white text for contrast
        primary: "#38bdf8", // Bright blue for visibility in the dark
        secondary: "#0284c7", // Deeper blue for borders or subtle UI
        accent: "#fbbf24" // Bright yellow/gold for links to pop
      } // Closing dark theme
    } // Closing themes object
  }; // Closing export
  export const getTheme= (theme='classic')=>designConfig.themes[theme] || { }
export interface DesignConfig {
    themes:Record<string, Theme>;
    layout:Record<string, string|number>
}
  export interface Theme {
    background: string; // Deep slate background
    text: string; // Light gray/white text for contrast
    primary:string; // Bright blue for visibility in the dark
    secondary: string; // Deeper blue for borders or subtle UI
    accent: string;
  }