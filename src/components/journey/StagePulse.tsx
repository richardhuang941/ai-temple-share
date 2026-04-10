import type { CSSProperties } from "react";
import type { DerivedTaskStage, LocaleCode } from "../../content";

interface StagePulseProps {
  stage: DerivedTaskStage;
  isReducedMotion: boolean;
  locale: LocaleCode;
  isExpanded?: boolean;
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

export function StagePulse({ stage, isReducedMotion, locale, isExpanded = false }: StagePulseProps) {
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
      data-expanded={isExpanded ? "true" : undefined}
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
          <span
            className="journey-stage-status"
            data-status={stage.status}
            style={{ color: paletteByStatus[stage.status] }}
          >
            {stage.status === "active" ? <span aria-hidden="true" className="journey-stage-spinner" /> : null}
            {labelByStatus[stage.status]}
          </span>
        </div>
        {isExpanded ? <span className="journey-stage-description">{stage.description}</span> : null}
        {(stage.proof || (isExpanded && stage.externalTarget)) && (
          <div className="journey-stage-meta">
            {stage.proof && (isExpanded || stage.status === "done") ? (
              <span className="journey-stage-proof">
                {locale === "zh" ? "证据" : "Proof"}: {stage.proof}
              </span>
            ) : null}
            {isExpanded && stage.externalTarget ? (
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
