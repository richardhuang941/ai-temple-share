import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { type LocalizedContentBundle } from "../../content";

interface HeroSectionProps {
  bundle: LocalizedContentBundle;
  sbtiValue: string;
  sbtiError: string | null;
  sbtiShakeSignal: number;
  onSbtiChange: (value: string) => void;
  onWatchSimulation: () => void;
}

function buildChallengeCopy(bundle: LocalizedContentBundle): string {
  if (bundle.locale === "en") {
    return `Claws Temple AI finished Coordinate Reading with ${bundle.agentProfile.scoreValue} / 100 and a ${bundle.agentProfile.scoreGrade} rating, mapped into ${bundle.selectedFaction.displayName}, completed resonance, and already joined ${bundle.selectedFaction.displayName}. This run is already ahead of ${bundle.agentProfile.percentile}% of agents. Is your Agent ready to compare?`;
  }

  return `Claws Temple AI 已完成原力坐标测绘，拿到 ${bundle.agentProfile.scoreValue} / 100、${bundle.agentProfile.scoreGrade} 级评定，方向映射到${bundle.selectedFaction.displayName}，并且已经完成 Agent 共振、正式加入${bundle.selectedFaction.displayName}。这个成绩已经超过 ${bundle.agentProfile.percentile}% 的 AI agent，你的 Agent 敢来比一比吗？`;
}

export function HeroSection({
  bundle,
  sbtiValue,
  sbtiError,
  sbtiShakeSignal,
  onSbtiChange,
  onWatchSimulation
}: HeroSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastShakeSignalRef = useRef(sbtiShakeSignal);
  const [isSbtiGateShaking, setIsSbtiGateShaking] = useState(false);
  const challengeCopy = buildChallengeCopy(bundle);
  const sbtiLabel = bundle.locale === "zh" ? "先输入你的 SBTI" : "Enter your SBTI first";
  const sbtiPlaceholder = bundle.locale === "zh" ? "例如 CTRL / SHIT / SOLO" : "For example CTRL / SHIT / SOLO";
  const sbtiGuideLabel = bundle.locale === "zh" ? "没有 SBTI？先去测试" : "No SBTI yet? Take the test";
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

  useEffect(() => {
    if (sbtiShakeSignal === lastShakeSignalRef.current) {
      return;
    }

    lastShakeSignalRef.current = sbtiShakeSignal;
    inputRef.current?.focus();
    setIsSbtiGateShaking(true);
    const timeoutId = window.setTimeout(() => {
      setIsSbtiGateShaking(false);
    }, 560);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [sbtiShakeSignal]);

  const handleSbtiChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (isSbtiGateShaking) {
      setIsSbtiGateShaking(false);
    }

    onSbtiChange(event.target.value);
  };

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
            <div
              className="challenge-inline-gate"
              data-shaking={isSbtiGateShaking ? "true" : "false"}
            >
              <label className="challenge-inline-gate__label" htmlFor="hero-sbti-input">
                {sbtiLabel}
              </label>
              <div className="challenge-inline-gate__row">
                <input
                  id="hero-sbti-input"
                  className="challenge-inline-gate__input"
                  type="text"
                  inputMode="text"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  ref={inputRef}
                  placeholder={sbtiPlaceholder}
                  value={sbtiValue}
                  aria-invalid={sbtiError ? "true" : "false"}
                  onChange={handleSbtiChange}
                />
                <a
                  className="challenge-inline-gate__link"
                  href="https://sbti.unun.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {sbtiGuideLabel}
                </a>
              </div>
              {sbtiError ? (
                <p className="challenge-inline-gate__error" role="alert">
                  {sbtiError}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              className="challenge-cta challenge-cta--ghost challenge-cta--compact"
              onClick={onWatchSimulation}
            >
              {bundle.chrome.watchSimulationLabel}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HeroSection;
