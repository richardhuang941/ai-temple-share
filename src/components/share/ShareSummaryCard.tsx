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
      <article className="share-summary-surface">
        <div style={{ display: "grid", gap: "0.45rem" }}>
          <h3 style={{ margin: 0, fontSize: "var(--type-heading-lg)", lineHeight: "var(--line-heading)", textAlign: "center" }}>
            {shareCopy.title}
          </h3>
          <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)", textAlign: "center" }}>
            {summary.scoreSummary}
          </p>
        </div>

        <div className="share-text-block">
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
    <article className="share-summary-surface">
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

      <div className="share-image-surface">
        <div style={{ display: "grid", gap: "0.55rem", justifyItems: "center", textAlign: "center" }}>
          <div className="challenge-grade-tile" style={{ width: "5.4rem", height: "5.4rem", fontSize: "2.4rem" }}>
            {summary.scoreGrade}
          </div>
          <strong style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 8vw, 4.4rem)", lineHeight: 0.94 }}>
            {summary.scoreSummary}
          </strong>
          <span style={{ color: "var(--color-muted)" }}>{summary.title}</span>
        </div>

        <div className="share-summary-note-block">
          {locale === "zh"
            ? `${summary.agentHeadline}${summary.factionName}阵营，已经完成 Agent 共振并投票加入阵营。`
            : `${summary.agentHeadline} ${summary.factionName}, completed resonance, and already joined the faction.`}
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          {summary.supportingFacts?.slice(0, 3).map((fact) => (
            <div key={fact} className="share-fact-chip">
              {fact}
            </div>
          ))}
        </div>

        <div className="share-link-block">
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
