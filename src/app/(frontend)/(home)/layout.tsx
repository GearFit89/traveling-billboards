import { NavBar } from "@/components/navigation/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="/" />
      {children}
    </div>
  );
}
