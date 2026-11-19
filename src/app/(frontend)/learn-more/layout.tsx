import { NavBar } from "@/components/navigation/NavBar";

export default function LearnMoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar page="learn-more" />
      {children}
    </div>
  );
}
