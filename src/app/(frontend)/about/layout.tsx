import { NavBar } from "@/components/navigation/NavBar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="about" />
      {children}
    </div>
  );
}
