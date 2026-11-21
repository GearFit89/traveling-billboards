import { NavBar } from "@/components/navigation/NavBar";

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="resources" />
      {children}
    </div>
  );
}
