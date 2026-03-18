import type { LogoProps } from "sanity";

export function StudioLogo({ title }: LogoProps) {
  // COLOR PALETTE UPDATE
  return (
    <div style={{ alignItems: "center", display: "flex", gap: "0.75rem" }}>
      <div
        style={{
          height: 28,
          width: 28,
          borderRadius: 999,
          background:
            "linear-gradient(135deg, var(--color-darkest), var(--color-dark))",
          boxShadow: "inset 0 0 0 1px var(--color-secondary)",
        }}
      />
      <div style={{ display: "grid", gap: "0.15rem" }}>
        <span
          style={{
            color: "var(--card-muted-fg-color)",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
          }}
        >
          ADMIN CMS
        </span>
        <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{title}</span>
      </div>
    </div>
  );
}
