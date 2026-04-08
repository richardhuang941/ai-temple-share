import type { CSSProperties } from "react";

interface CompletionBadgeProps {
  children: string;
  tone?: "default" | "success" | "warning";
}

const toneStyles: Record<NonNullable<CompletionBadgeProps["tone"]>, CSSProperties> = {
  default: {
    background: "rgba(248, 243, 231, 0.84)",
    color: "var(--color-ink)",
    borderColor: "rgba(24, 34, 54, 0.08)"
  },
  success: {
    background: "rgba(245, 158, 11, 0.12)",
    color: "var(--color-success)",
    borderColor: "rgba(245, 158, 11, 0.22)"
  },
  warning: {
    background: "rgba(230, 57, 70, 0.1)",
    color: "var(--coral-dark)",
    borderColor: "rgba(230, 57, 70, 0.18)"
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
        justifyContent: "center",
        minWidth: "7.2rem",
        minHeight: "2rem",
        padding: "0.3rem 0.7rem",
        borderRadius: "999px",
        border: "1px solid transparent",
        fontSize: "0.72rem",
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
