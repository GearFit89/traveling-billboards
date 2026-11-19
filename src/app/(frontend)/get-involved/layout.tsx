import { NavBar } from "@/components/navigation/NavBar";

export default function GetInvolvedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="get-involved" />
      {children}
    </div>
  );
}
