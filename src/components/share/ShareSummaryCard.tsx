import type {
  ChromeCopy,
  LocaleCode,
  ShareMode,
  ShareSectionCopy,
  ShareSummaryView
} from "../../content";
import CopyButton from "../common/CopyButton";

interface ShareSummaryCardProps {
  summary: ShareSummaryView;
  mode: ShareMode;
  shareCopy: ShareSectionCopy;
  chromeCopy: ChromeCopy;
  challengeLink: string;
  locale: LocaleCode;
}

function buildTextPayload(
  summary: ShareSummaryView,
  shareCopy: ShareSectionCopy,
  challengeLink: string,
  locale: LocaleCode
): string {
  if (locale === "en") {
    return `${summary.agentHeadline} ${summary.factionName}, completed resonance, and already joined the faction. ${summary.percentileNote}. Is your Agent ready to compare?\n\n${shareCopy.challengeLinkLabel}: ${challengeLink}`;
  }

  return `${summary.agentHeadline}${summary.factionName}阵营，已经完成 Agent 共振并投票加入阵营。${summary.percentileNote}。你的 Agent 敢来比一比吗？\n\n${shareCopy.challengeLinkLabel}：${challengeLink}`;
}

export function ShareSummaryCard({
  summary,
  mode,
  shareCopy,
  chromeCopy,
  challengeLink,
  locale
}: ShareSummaryCardProps) {
  const textPayload = buildTextPayload(summary, shareCopy, challengeLink, locale);

  if (mode === "text") {
    return (
      <article className="challenge-section-card">
        <div style={{ display: "grid", gap: "0.55rem" }}>
          <h3 style={{ margin: 0, fontSize: "var(--type-heading-lg)", lineHeight: "var(--line-heading)" }}>
            {shareCopy.title}
          </h3>
          <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
            {summary.scoreSummary}
          </p>
        </div>

        <div
          style={{
            padding: "1.2rem",
            borderRadius: "1.35rem",
            background: "#f6f8fb",
            border: "1px solid rgba(24, 34, 54, 0.08)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.8,
            color: "var(--color-ink)"
          }}
        >
          {textPayload}
        </div>

        <CopyButton
          value={textPayload}
          label={chromeCopy.copyLabel}
          copiedLabel={chromeCopy.copiedLabel}
        />
      </article>
    );
  }

  return (
    <article className="challenge-section-card">
      <div style={{ display: "grid", gap: "0.4rem", justifyItems: "center", textAlign: "center" }}>
        <h3 style={{ margin: 0, fontSize: "var(--type-heading-lg)", lineHeight: "var(--line-heading)" }}>
          {shareCopy.title}
        </h3>
        <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
          {summary.scoreSummary}
        </p>
        <strong style={{ color: "var(--color-warning)", fontSize: "1.35rem" }}>
          {summary.percentileNote}
        </strong>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          padding: "1.35rem",
          borderRadius: "1.5rem",
          background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))",
          border: "1px solid rgba(24, 34, 54, 0.08)"
        }}
      >
        <div style={{ display: "grid", gap: "0.55rem", justifyItems: "center", textAlign: "center" }}>
          <div className="challenge-grade-tile" style={{ width: "5.4rem", height: "5.4rem", fontSize: "2.4rem" }}>
            {summary.scoreGrade}
          </div>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 8vw, 4.4rem)", lineHeight: 0.94 }}>
            {summary.scoreSummary}
          </strong>
          <span style={{ color: "var(--color-muted)" }}>{summary.title}</span>
        </div>

        <div
          style={{
            padding: "1rem 1.05rem",
            borderRadius: "1.2rem",
            background: "#f6f8fb",
            color: "var(--color-ink)",
            lineHeight: "var(--line-body)"
          }}
        >
          {locale === "zh"
            ? `${summary.agentHeadline}${summary.factionName}阵营，已经完成 Agent 共振并投票加入阵营。`
            : `${summary.agentHeadline} ${summary.factionName}, completed resonance, and already joined the faction.`}
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          {summary.supportingFacts?.slice(0, 3).map((fact) => (
            <div
              key={fact}
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "1rem",
                background: "#fff",
                border: "1px solid rgba(24, 34, 54, 0.06)"
              }}
            >
              {fact}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "1rem",
            background: "#f6f8fb",
            color: "var(--color-muted)",
            lineHeight: "var(--line-body)"
          }}
        >
          <strong style={{ display: "block", color: "var(--color-ink)", marginBottom: "0.25rem" }}>
            {shareCopy.challengeLinkLabel}
          </strong>
          {challengeLink}
        </div>
      </div>
    </article>
  );
}

export default ShareSummaryCard;
