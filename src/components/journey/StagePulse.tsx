import type { CSSProperties } from "react";
import type { DerivedTaskStage } from "../../content";

interface StagePulseProps {
  stage: DerivedTaskStage;
  isReducedMotion: boolean;
}

const paletteByStatus: Record<DerivedTaskStage["status"], string> = {
  pending: "rgba(255, 255, 255, 0.18)",
  active: "var(--color-accent)",
  done: "var(--color-success)"
};

const labelByStatus: Record<DerivedTaskStage["status"], string> = {
  pending: "待推进",
  active: "推进中",
  done: "已完成"
};

export function StagePulse({ stage, isReducedMotion }: StagePulseProps) {
  const markerStyle: CSSProperties = {
    width: "0.85rem",
    height: "0.85rem",
    flexShrink: 0,
    borderRadius: "999px",
    background: paletteByStatus[stage.status],
    boxShadow:
      stage.status === "active" && !isReducedMotion
        ? "0 0 0 0.35rem rgba(142, 228, 255, 0.16)"
        : "none",
    transition: "transform var(--step-base) var(--ease-emphatic), box-shadow var(--step-base) var(--ease-emphatic)"
  };

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "0.85rem",
    padding: "0.9rem 1rem",
    borderRadius: "var(--radius-md)",
    border: `1px solid ${stage.isCurrent ? "rgba(142, 228, 255, 0.32)" : "rgba(255, 255, 255, 0.08)"}`,
    background:
      stage.status === "active"
        ? "linear-gradient(180deg, rgba(16, 31, 50, 0.96), rgba(9, 18, 31, 0.94))"
        : "rgba(7, 14, 24, 0.66)"
  };

  return (
    <li style={rowStyle}>
      <span aria-hidden="true" style={markerStyle} />
      <div style={{ display: "grid", gap: "0.45rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "0.5rem",
            alignItems: "center"
          }}
        >
          <strong style={{ fontSize: "0.97rem" }}>{stage.label}</strong>
          <span
            style={{
              padding: "0.15rem 0.55rem",
              borderRadius: "999px",
              border: `1px solid ${paletteByStatus[stage.status]}`,
              color: paletteByStatus[stage.status],
              fontFamily: "var(--font-display)",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            {labelByStatus[stage.status]}
          </span>
        </div>
        <span style={{ color: "var(--color-muted)", lineHeight: 1.5 }}>{stage.description}</span>
        {(stage.proof || stage.externalTarget) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            {stage.proof ? (
              <span
                style={{
                  padding: "0.35rem 0.6rem",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "var(--color-ink)",
                  fontSize: "0.82rem"
                }}
              >
                证据：{stage.proof}
              </span>
            ) : null}
            {stage.externalTarget ? (
              <span
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.82rem"
                }}
              >
                外部去向：{stage.externalTarget}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </li>
  );
}

export default StagePulse;
