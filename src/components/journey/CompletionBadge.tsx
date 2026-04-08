import type { CSSProperties } from "react";

interface CompletionBadgeProps {
  children: string;
  tone?: "default" | "success" | "warning";
}

const toneStyles: Record<NonNullable<CompletionBadgeProps["tone"]>, CSSProperties> = {
  default: {
    background: "rgba(255, 255, 255, 0.08)",
    color: "var(--color-ink)",
    borderColor: "rgba(255, 255, 255, 0.08)"
  },
  success: {
    background: "rgba(139, 246, 198, 0.12)",
    color: "var(--color-success)",
    borderColor: "rgba(139, 246, 198, 0.24)"
  },
  warning: {
    background: "rgba(255, 211, 107, 0.12)",
    color: "var(--color-warning)",
    borderColor: "rgba(255, 211, 107, 0.24)"
  }
};

export function CompletionBadge({
  children,
  tone = "default"
}: CompletionBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.3rem 0.7rem",
        borderRadius: "999px",
        border: "1px solid transparent",
        fontSize: "0.76rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        fontFamily: "var(--font-display)",
        ...toneStyles[tone]
      }}
    >
      {children}
    </span>
  );
}

export default CompletionBadge;
