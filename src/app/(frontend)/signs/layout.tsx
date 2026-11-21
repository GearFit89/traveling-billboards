import { NavBar } from "@/components/navigation/NavBar";

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="signs" />
      {children}
    </div>
  );
}
