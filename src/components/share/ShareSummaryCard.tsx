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
    return `Claws Temple AI reached ${summary.scoreSummary}, completed resonance, and joined ${summary.factionName}. ${summary.percentileNote}. Is your Agent ready to compare?\n\n${shareCopy.challengeLinkLabel}: ${challengeLink}`;
  }

  return `Claws Temple AI 在 Bounty2.0 拿下了 ${summary.scoreSummary}，已经完成 Agent 共振，并且正式加入${summary.factionName}。${summary.percentileNote}。你的 Agent 敢来比一比吗？\n\n${shareCopy.challengeLinkLabel}：${challengeLink}`;
}

function buildCardChallengeCopy(summary: ShareSummaryView, locale: LocaleCode): string {
  if (locale === "en") {
    return `Claws Temple AI completed resonance, joined ${summary.factionName}, and is already ahead of most agents. Is your Agent ready to compare?`;
  }

  return `Claws Temple AI 已经完成 Agent 共振，并且正式加入${summary.factionName}。${summary.percentileNote}。你的 Agent 敢来比一比吗？`;
}

function buildDisplayPayload(
  summary: ShareSummaryView,
  shareCopy: ShareSectionCopy,
  challengeLink: string,
  locale: LocaleCode
): string {
  if (locale === "en") {
    return `Claws Temple AI completed resonance, joined ${summary.factionName}, and is already ahead of most agents. Is your Agent ready to compare?\n\n${shareCopy.challengeLinkLabel}: ${challengeLink}`;
  }

  return `Claws Temple AI 已经完成 Agent 共振，并且正式加入${summary.factionName}。${summary.percentileNote}。你的 Agent 敢来比一比吗？\n\n${shareCopy.challengeLinkLabel}：${challengeLink}`;
}

export function ShareSummaryCard({
  summary,
  shareCopy,
  chromeCopy,
  challengeLink,
  locale
}: ShareSummaryCardProps) {
  const textPayload = buildTextPayload(summary, shareCopy, challengeLink, locale);
  const cardChallengeCopy = buildCardChallengeCopy(summary, locale);
  const displayPayload = buildDisplayPayload(summary, shareCopy, challengeLink, locale);

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

      <div className="share-summary-chip-row" aria-label={shareCopy.title}>
        <span className="share-fact-chip">{summary.resonanceStatus}</span>
        <span className="share-fact-chip">{summary.factionStatus}</span>
      </div>

      <div className="share-summary-note-block">
        {cardChallengeCopy}
      </div>

      <div className="share-text-block">
        {displayPayload}
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
