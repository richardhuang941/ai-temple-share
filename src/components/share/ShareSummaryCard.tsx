import type {
  ChromeCopy,
  LocaleCode,
  ShareSectionCopy,
  ShareSummaryView
} from "../../content";
import CopyButton from "../common/CopyButton";

interface ShareSummaryCardProps {
  summary: ShareSummaryView;
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
    return `${summary.agentHeadline} scored ${summary.scoreSummary.split("Agent score ").at(-1) ?? summary.scoreSummary}, completed resonance, and already joined ${summary.factionName}. ${summary.percentileNote}. Is your Agent ready to compare?\n\n${shareCopy.challengeLinkLabel}: ${challengeLink}`;
  }

  return `${summary.agentHeadline} ${summary.scoreSummary}，已经完成 Agent 共振，并且正式加入${summary.factionName}。${summary.percentileNote}。你的 Agent 敢来比一比吗？\n\n${shareCopy.challengeLinkLabel}：${challengeLink}`;
}

export function ShareSummaryCard({
  summary,
  shareCopy,
  chromeCopy,
  challengeLink,
  locale
}: ShareSummaryCardProps) {
  const textPayload = buildTextPayload(summary, shareCopy, challengeLink, locale);
  const communityStatusLabel =
    locale === "zh" ? "社区战报已准备好" : "Community result ready";

  return (
    <article className="share-summary-surface">
      <div className="share-summary-lead">
        <p className="share-summary-score">
          {summary.scoreSummary}
        </p>
        <strong className="share-summary-percentile">
          {summary.percentileNote}
        </strong>
      </div>

      <div
        aria-label={shareCopy.title}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", justifyContent: "center" }}
      >
        <span className="share-fact-chip">{summary.resonanceStatus}</span>
        <span className="share-fact-chip">{summary.factionStatus}</span>
        <span className="share-fact-chip">{communityStatusLabel}</span>
      </div>

      <div className="share-summary-note-block">
        {locale === "zh"
          ? `${summary.agentHeadline} ${summary.scoreSummary}，已经完成 Agent 共振，并且正式加入${summary.factionName}。`
          : `${summary.agentHeadline} scored ${summary.scoreSummary.replace("Agent score ", "")}, completed resonance, and already joined ${summary.factionName}.`}
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        {summary.supportingFacts?.slice(0, 3).map((fact) => (
          <div key={fact} className="share-fact-chip">
            {fact}
          </div>
        ))}
      </div>

      <div className="share-text-block">
        {textPayload}
      </div>

      <div className="share-link-block">
        <strong style={{ display: "block", color: "var(--color-ink)", marginBottom: "0.25rem" }}>
          {shareCopy.challengeLinkLabel}
        </strong>
        {challengeLink}
      </div>

      <CopyButton
        value={textPayload}
        label={chromeCopy.copyLabel}
        copiedLabel={chromeCopy.copiedLabel}
      />
    </article>
  );
}

export default ShareSummaryCard;
