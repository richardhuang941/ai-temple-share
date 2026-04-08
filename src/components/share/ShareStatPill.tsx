import type { CSSProperties } from "react";

interface ShareStatPillProps {
  label: string;
  value: string;
  tone?: "accent" | "success" | "warning";
}

const tonePalette: Record<NonNullable<ShareStatPillProps["tone"]>, CSSProperties> = {
  accent: {
    borderColor: "rgba(142, 228, 255, 0.28)",
    background: "rgba(142, 228, 255, 0.1)",
    color: "var(--color-accent)"
  },
  success: {
    borderColor: "rgba(139, 246, 198, 0.24)",
    background: "rgba(139, 246, 198, 0.1)",
    color: "var(--color-success)"
  },
  warning: {
    borderColor: "rgba(255, 211, 107, 0.24)",
    background: "rgba(255, 211, 107, 0.1)",
    color: "var(--color-warning)"
  }
};

export function ShareStatPill({
  label,
  value,
  tone = "accent"
}: ShareStatPillProps) {
  return (
    <article
      style={{
        display: "grid",
        gap: "0.4rem",
        padding: "0.95rem 1rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid transparent",
        ...tonePalette[tone]
      }}
    >
      <span style={{ fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
      <strong style={{ fontSize: "1.05rem", lineHeight: 1.3, color: "var(--color-ink)" }}>{value}</strong>
    </article>
  );
}

export default ShareStatPill;
