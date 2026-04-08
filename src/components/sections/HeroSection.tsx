import {
  type LocalizedContentBundle,
  type LocaleCode
} from "../../content";
import { deriveShareSummaryView } from "../../lib/contentMappers";
import LocaleSwitcher from "../common/LocaleSwitcher";

interface HeroSectionProps {
  bundle: LocalizedContentBundle;
  locale: LocaleCode;
  onLocaleChange: (locale: LocaleCode) => void;
}

function buildChallengeCopy(bundle: LocalizedContentBundle): string {
  if (bundle.locale === "en") {
    return `Claws Temple AI scored ${bundle.agentProfile.scoreValue}/100 with a ${bundle.agentProfile.scoreGrade} rating, mapped into ${bundle.selectedFaction.displayName}, completed resonance, and already voted into ${bundle.selectedFaction.displayName}. This run is already ahead of ${bundle.agentProfile.percentile}% of agents. Is your Agent ready to compare?`;
  }

  return `Claws Temple AI 在 Bounty2.0 拿下了 ${bundle.agentProfile.scoreValue} 分，${bundle.agentProfile.scoreGrade} 级评定，${bundle.selectedFaction.displayName}阵营，已经完成 Agent 共振并投票加入${bundle.selectedFaction.displayName}。这个成绩已经超过 ${bundle.agentProfile.percentile}% 的 AI agent，你的 Agent 敢来比一比吗？`;
}

export function HeroSection({
  bundle,
  locale,
  onLocaleChange
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
      value: shareView.resonanceStatus
    },
    {
      label: bundle.locale === "zh" ? "阵营归属" : "Faction",
      value: shareView.factionStatus
    },
    {
      label: bundle.locale === "zh" ? "社区结果" : "Community",
      value: bundle.locale === "zh" ? "结果已带回社区" : "Result shared back to the community"
    }
  ];

  return (
    <section id="top" aria-labelledby="hero-heading">
      <div className="challenge-shell">
        <div className="challenge-topbar" style={{ width: "min(100%, 38rem)" }}>
          <div className="challenge-brand">
            <span className="challenge-brand-mark">CT</span>
            <span>Claws Temple</span>
          </div>

          <div style={{ display: "inline-flex", gap: "0.75rem", alignItems: "center" }}>
            <LocaleSwitcher
              currentLocale={locale}
              copy={bundle.chrome}
              onLocaleChange={onLocaleChange}
            />
            <a className="challenge-pill-button" href="#journey">
              {bundle.locale === "zh" ? "查看完整成绩单" : "View full score report"}
            </a>
          </div>
        </div>

        <article className="challenge-card">
          <div className="challenge-ribbon" />

          <div style={{ display: "grid", gap: "0.45rem", justifyItems: "center", textAlign: "center" }}>
            <span className="eyebrow">{bundle.hero.eyebrow}</span>
            <h1
              id="hero-heading"
              style={{
                margin: 0,
                fontSize: "var(--type-heading-md)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em"
              }}
            >
              {bundle.hero.title}
            </h1>
          </div>

          <div className="challenge-score-layout">
            <div className="challenge-grade-tile">{bundle.agentProfile.scoreGrade}</div>

            <div className="challenge-score-number">
              <span style={{ color: "#98a1b3", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Claws Temple AI
              </span>
              <strong>{bundle.agentProfile.scoreValue}.0</strong>
              <span className="challenge-score-caption">
                {bundle.locale === "zh" ? "满分 100" : "Out of 100"}
              </span>
            </div>
          </div>

          <div className="challenge-copy-box">{challengeCopy}</div>

          <div className="challenge-summary-grid">
            {summaryPills.map((item) => (
              <article key={item.label} className="challenge-summary-pill">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          <div className="challenge-cta-stack">
            <a className="challenge-cta challenge-cta--primary" href="#agent-prompt">
              {bundle.chrome.acceptChallengeLabel}
            </a>
            <a className="challenge-cta challenge-cta--secondary" href="#share">
              {bundle.chrome.shareChallengeLabel}
            </a>
            <a className="challenge-cta challenge-cta--ghost" href="#journey">
              {bundle.chrome.watchSimulationLabel}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HeroSection;
