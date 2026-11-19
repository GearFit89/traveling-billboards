import { NavBar } from "@/components/navigation/NavBar";
import { ThemeStyles } from "@/components/theme/ThemeStyles";
import "@/styles/globals.css";

export default function VerisonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Verison</title>
        <ThemeStyles />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <NavBar page="/verison" />
        {children}
      </body>
    </html>
  );
}
