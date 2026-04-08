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
  const communityLabel =
    bundle.locale === "zh" ? "已在社区分享结果" : "Shared back to the community";

  return (
    <section id="top" aria-labelledby="hero-heading">
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          justifyItems: "center"
        }}
      >
        <div
          className="shell-panel"
          style={{
            display: "grid",
            gap: "1.4rem",
            width: "min(100%, 42rem)",
            padding: "clamp(1.3rem, 4vw, 2rem)"
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.85rem",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span className="eyebrow">{bundle.hero.eyebrow}</span>
            <LocaleSwitcher
              currentLocale={locale}
              copy={bundle.chrome}
              onLocaleChange={onLocaleChange}
            />
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <h1
              id="hero-heading"
              style={{
                margin: 0,
                fontSize: "var(--type-display)",
                lineHeight: "var(--line-display)",
                letterSpacing: "-0.04em"
              }}
            >
              {bundle.hero.title}
            </h1>
            <p
              style={{
                margin: 0,
                color: "var(--color-muted)",
                fontSize: "var(--type-body)",
                lineHeight: "var(--line-body)"
              }}
            >
              {bundle.hero.summary}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
              gap: "1rem",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "grid",
                placeItems: "center",
                gap: "0.7rem",
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(145deg, var(--coral-bright), var(--color-highlight))",
                color: "#290b0e"
              }}
            >
              <div
                style={{
                  width: "5.5rem",
                  height: "5.5rem",
                  borderRadius: "1.5rem",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255, 255, 255, 0.2)",
                  fontSize: "2.9rem",
                  fontWeight: 800
                }}
              >
                S
              </div>
              <strong style={{ fontSize: "var(--type-heading-md)" }}>
                {bundle.agentProfile.scoreValue}
              </strong>
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.85rem"
              }}
            >
              <strong
                style={{
                  fontSize: "clamp(2.6rem, 7vw, 4.6rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em"
                }}
              >
                {bundle.agentProfile.scoreValue}.0
              </strong>
              <span style={{ color: "var(--color-muted)", fontSize: "var(--type-small)" }}>
                {shareView.scoreSummary}
              </span>
              <div
                style={{
                  padding: "1rem 1.05rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 120, 120, 0.16)",
                  color: "var(--color-muted)",
                  lineHeight: "var(--line-body)"
                }}
              >
                {bundle.hero.disclaimer}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "0.85rem" }}>
            {[
              {
                href: "#agent-prompt",
                label: bundle.chrome.acceptChallengeLabel,
                background:
                  "linear-gradient(90deg, var(--color-highlight), var(--coral-bright))",
                color: "#27090c"
              },
              {
                href: "#share",
                label: bundle.chrome.shareChallengeLabel,
                background:
                  "linear-gradient(90deg, rgba(255, 120, 120, 0.18), rgba(255, 181, 122, 0.18))",
                color: "var(--color-ink)"
              },
              {
                href: "#journey",
                label: bundle.chrome.watchSimulationLabel,
                background: "rgba(255, 255, 255, 0.04)",
                color: "var(--color-ink)"
              }
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "3.8rem",
                  padding: "1rem 1.2rem",
                  borderRadius: "var(--radius-md)",
                  background: action.background,
                  color: action.color,
                  fontWeight: 800,
                  fontSize: "var(--type-body)",
                  textAlign: "center"
                }}
              >
                {action.label}
              </a>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
              gap: "0.85rem"
            }}
          >
            {[
              shareView.scoreSummary,
              shareView.resonanceStatus,
              shareView.factionStatus,
              communityLabel
            ].map((label) => (
              <article
                key={label}
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 120, 120, 0.12)"
                }}
              >
                <strong
                  style={{
                    display: "block",
                    marginBottom: "0.35rem",
                    fontSize: "var(--type-small)"
                  }}
                >
                  {label}
                </strong>
                <span style={{ color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
                  {bundle.locale === "zh"
                    ? "首页只保留最需要被记住的结果。"
                    : "The first screen keeps only the signals worth remembering."}
                </span>
              </article>
            ))}
          </div>

          <div
            style={{
              padding: "0.9rem 1rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(255, 120, 120, 0.16)",
              color: "var(--color-muted)",
              fontSize: "var(--type-small)",
              lineHeight: "var(--line-body)"
            }}
          >
            {bundle.chrome.simulationDisclaimer}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
