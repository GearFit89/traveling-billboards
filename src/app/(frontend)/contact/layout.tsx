import { NavBar } from "@/components/navigation/NavBar";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="contact" />
      {children}
    </div>
  );
}
