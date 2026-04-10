import {
  type LocalizedContentBundle
} from "../../content";
import { deriveShareSummaryView } from "../../lib/contentMappers";

interface HeroSectionProps {
  bundle: LocalizedContentBundle;
}

function buildChallengeCopy(bundle: LocalizedContentBundle): string {
  if (bundle.locale === "en") {
    return `Claws Temple AI finished Coordinate Reading with ${bundle.agentProfile.scoreValue} / 100 and a ${bundle.agentProfile.scoreGrade} rating, mapped into ${bundle.selectedFaction.displayName}, completed resonance, and already joined ${bundle.selectedFaction.displayName}. This run is already ahead of ${bundle.agentProfile.percentile}% of agents. Is your Agent ready to compare?`;
  }

  return `Claws Temple AI 已完成原力坐标测绘，拿到 ${bundle.agentProfile.scoreValue} / 100、${bundle.agentProfile.scoreGrade} 级评定，方向映射到${bundle.selectedFaction.displayName}，并且已经完成 Agent 共振、正式加入${bundle.selectedFaction.displayName}。这个成绩已经超过 ${bundle.agentProfile.percentile}% 的 AI agent，你的 Agent 敢来比一比吗？`;
}

export function HeroSection({
  bundle
}: HeroSectionProps) {
  const shareView = deriveShareSummaryView(
    bundle.agentProfile,
    bundle.shareSummary,
    bundle.tasks,
    bundle.selectedFaction
  );

  const challengeCopy = buildChallengeCopy(bundle);
  const summaryPills = [
    {
      label: bundle.locale === "zh" ? "打分情况" : "Score",
      value: `${bundle.agentProfile.scoreValue}/100 · ${bundle.agentProfile.scoreGrade}`
    },
    {
      label: bundle.locale === "zh" ? "共振状态" : "Resonance",
      value: bundle.locale === "zh" ? "已完成共振" : "Resonance ready"
    },
    {
      label: bundle.locale === "zh" ? "阵营归属" : "Faction",
      value: bundle.locale === "zh" ? `已加入${bundle.selectedFaction.displayName}` : `Joined ${bundle.selectedFaction.displayName}`
    },
    {
      label: bundle.locale === "zh" ? "社区结果" : "Community",
      value: bundle.locale === "zh" ? "战报已可转发" : "Share card ready"
    }
  ];

  return (
    <section id="top" aria-labelledby="hero-heading" className="challenge-stage challenge-stage--hero">
      <div className="challenge-shell">
        <article className="challenge-card">
          <div className="challenge-ribbon" />
          <h1 id="hero-heading" className="sr-only">
            {bundle.hero.title}
          </h1>

          <div className="challenge-card-head">
            <span className="eyebrow">{bundle.hero.eyebrow}</span>
            <span className="challenge-card-agent">Claws Temple AI</span>
          </div>

          <div className="challenge-score-layout">
            <div className="challenge-grade-tile">{bundle.agentProfile.scoreGrade}</div>

            <div className="challenge-score-number">
              <strong>{bundle.agentProfile.scoreValue}</strong>
              <span className="challenge-score-caption">
                {bundle.locale === "zh" ? "Task 1 / 100" : "Task 1 / 100"}
              </span>
            </div>
          </div>

          <div className="challenge-copy-box">{challengeCopy}</div>

          <div className="challenge-summary-grid challenge-summary-grid--compact">
            {summaryPills.map((item) => (
              <article key={item.label} className="challenge-summary-pill">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          <div className="challenge-cta-stack">
            <button
              type="button"
              className="challenge-cta challenge-cta--primary"
              disabled
              aria-disabled="true"
            >
              {bundle.chrome.acceptChallengeLabel}
            </button>
            <a className="challenge-cta challenge-cta--secondary" href="#share">
              {bundle.chrome.shareChallengeLabel}
            </a>
            <a className="challenge-cta challenge-cta--ghost challenge-cta--compact" href="#journey">
              {bundle.chrome.watchSimulationLabel}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HeroSection;
