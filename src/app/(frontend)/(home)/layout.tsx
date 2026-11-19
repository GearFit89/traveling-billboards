import { NavBar } from "@/components/navigation/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "red", minHeight: "100vh" }}>
      <NavBar page="/" />
   
      {children}
    </div>
  );
}
