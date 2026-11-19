import { Page, NavGridBlock } from "@/payload-types";
import { Icon } from "../icons";
import Link from "next/link";

interface NavGridProps {
  data: NavGridBlock;
}

export function NavGrid({ data: { items } }: NavGridProps) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
      {items.map((item, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", backgroundColor: item.color ?? "#ffffff" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{item.heading}</h3>
          {item.description && <p style={{ marginTop: "0.5rem" }}>{item.description}</p>}
          {item.link && (
            <Link
              href={item.link.url ?? "/"}
              style={{ display: "inline-block", marginTop: "0.5rem", color: "#0070f3", textDecoration: "underline" }}
            >
              {item.link.label}
            </Link>
          )}
          {item.icon && (
            <div style={{ marginTop: "0.5rem" }}>
              <Icon name={item.icon} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
