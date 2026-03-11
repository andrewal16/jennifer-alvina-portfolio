import type { CSSProperties } from "react";
import type { NavbarProps } from "sanity";

const shortcutLinkStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 999,
  color: "inherit",
  display: "inline-flex",
  fontSize: 12,
  letterSpacing: "0.12em",
  padding: "0.55rem 0.9rem",
  textDecoration: "none",
  textTransform: "uppercase" as const,
};

export function StudioNavbar(props: NavbarProps) {
  return (
    <div>
      <div
        style={{
          color: "rgb(250, 250, 249)",
          background:
            "linear-gradient(135deg, rgb(28, 25, 23), rgb(68, 64, 60) 55%, rgb(168, 162, 158))",
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                color: "rgba(250,250,249,0.72)",
                fontSize: "0.75rem",
                marginBottom: "0.2rem",
              }}
            >
              Jennifer Atelier Studio
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>
              Manage homepage, portfolio projects, and contact content.
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <a
              href="/"
              rel="noreferrer"
              style={shortcutLinkStyle}
              target="_blank"
            >
              Open Website
            </a>
            <a
              href="/portfolio"
              rel="noreferrer"
              style={shortcutLinkStyle}
              target="_blank"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
