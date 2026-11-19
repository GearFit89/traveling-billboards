import { NavBar } from "@/components/navigation/NavBar";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="links" />
      {children}
    </div>
  );
}
