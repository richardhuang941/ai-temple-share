import type { CSSProperties } from "react";
import type { DerivedTaskStage, LocaleCode } from "../../content";

interface StagePulseProps {
  stage: DerivedTaskStage;
  isReducedMotion: boolean;
  locale: LocaleCode;
}

const paletteByStatus: Record<DerivedTaskStage["status"], string> = {
  pending: "rgba(24, 34, 54, 0.18)",
  active: "var(--coral-mid)",
  done: "var(--color-success)"
};

function getLabelByStatus(locale: LocaleCode): Record<DerivedTaskStage["status"], string> {
  if (locale === "en") {
    return {
      pending: "Pending",
      active: "Live",
      done: "Done"
    };
  }

  return {
    pending: "待推进",
    active: "推进中",
    done: "已完成"
  };
}

export function StagePulse({ stage, isReducedMotion, locale }: StagePulseProps) {
  const labelByStatus = getLabelByStatus(locale);
  const markerStyle: CSSProperties = {
    background: paletteByStatus[stage.status],
    boxShadow:
      stage.status === "active" && !isReducedMotion
        ? "0 0 0 0.35rem rgba(230, 57, 70, 0.14)"
        : "none",
    transition: "transform var(--step-base) var(--ease-emphatic), box-shadow var(--step-base) var(--ease-emphatic)"
  };

  return (
    <li
      className="journey-stage"
      data-current={stage.isCurrent ? "true" : undefined}
      data-status={stage.status}
      style={{
        borderColor: stage.isCurrent ? "rgba(230, 57, 70, 0.24)" : undefined
      }}
    >
      <span aria-hidden="true" className="journey-stage-marker" style={markerStyle} />
      <div className="journey-stage-copy">
        <div className="journey-stage-title">
          <strong>{stage.label}</strong>
          <span style={{ color: paletteByStatus[stage.status] }}>
            {labelByStatus[stage.status]}
          </span>
        </div>
        <span className="journey-stage-description">{stage.description}</span>
        {(stage.proof || stage.externalTarget) && (
          <div className="journey-stage-meta">
            {stage.proof ? (
              <span className="journey-stage-proof">
                {locale === "zh" ? "证据" : "Proof"}: {stage.proof}
              </span>
            ) : null}
            {stage.externalTarget ? (
              <span className="journey-stage-external">
                {locale === "zh" ? "外部去向" : "External handoff"}: {stage.externalTarget}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </li>
  );
}

export default StagePulse;
