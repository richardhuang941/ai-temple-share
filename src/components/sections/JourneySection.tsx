import { useEffect } from "react";
import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle
} from "../../content";
import JourneyTimeline from "../journey/JourneyTimeline";
import { useJourneyTimeline } from "../../hooks/useJourneyTimeline";

interface JourneySectionProps {
  bundle?: LocalizedContentBundle;
}

export function JourneySection({
  bundle = getLocalizedLongpageContent("zh")
}: JourneySectionProps) {
  const { advance, currentHint, derivedTasks, goToTask, progress, restart, setAutoplay, start, timeline } =
    useJourneyTimeline(bundle.tasks, {
      cycleDurationMs: 3400,
      isAutoplay: false
    });

  useEffect(() => {
    const handleHashStart = (): void => {
      if (window.location.hash === "#journey" && !timeline.hasStarted) {
        start();
      }
    };

    handleHashStart();
    window.addEventListener("hashchange", handleHashStart);

    return () => {
      window.removeEventListener("hashchange", handleHashStart);
    };
  }, [start, timeline.hasStarted]);

  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "grid", gap: "0.85rem", maxWidth: "48rem" }}>
          <span className="eyebrow">{bundle.journey.eyebrow}</span>
          <h2
            id="journey-heading"
            style={{ margin: 0, fontSize: "var(--type-heading-lg)", lineHeight: "var(--line-heading)" }}
          >
            {bundle.journey.title}
          </h2>
          <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.7 }}>
            {bundle.journey.summary}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem"
          }}
        >
          {bundle.journey.helperCards.map((card) => (
            <article
              key={card.title}
              className="shell-panel"
              style={{ padding: "1rem 1.1rem", display: "grid", gap: "0.55rem" }}
            >
              <strong>{card.title}</strong>
              <span style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>{card.body}</span>
            </article>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem"
          }}
        >
          <button
            type="button"
            onClick={timeline.hasStarted ? advance : start}
            style={{
              border: "1px solid rgba(255, 120, 120, 0.24)",
              background: "rgba(28, 11, 14, 0.9)",
              color: "var(--color-ink)",
              padding: "0.85rem 1.05rem",
              borderRadius: "var(--radius-md)",
              cursor: "pointer"
            }}
          >
            {timeline.hasStarted ? bundle.journey.advanceLabel : bundle.journey.startLabel}
          </button>
          {timeline.hasStarted ? (
            <>
              <button
                type="button"
                onClick={restart}
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--color-ink)",
                  padding: "0.85rem 1.05rem",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer"
                }}
              >
                {bundle.journey.restartLabel}
              </button>
              <button
                type="button"
                onClick={() => setAutoplay(!timeline.isAutoplay)}
                style={{
                  border: "1px solid rgba(255, 211, 107, 0.24)",
                  background: "rgba(255, 211, 107, 0.08)",
                  color: "var(--color-ink)",
                  padding: "0.85rem 1.05rem",
                  borderRadius: "var(--radius-md)",
                  cursor: timeline.isReducedMotion ? "not-allowed" : "pointer",
                  opacity: timeline.isReducedMotion ? 0.5 : 1
                }}
                disabled={timeline.isReducedMotion}
              >
                {timeline.isAutoplay ? bundle.journey.pauseLabel : bundle.journey.resumeLabel}
              </button>
            </>
          ) : null}
        </div>

        <JourneyTimeline
          tasks={derivedTasks}
          progress={progress}
          currentHint={currentHint}
          hasStarted={Boolean(timeline.hasStarted)}
          idleLabel={bundle.chrome.simulationIdleLabel}
          isReducedMotion={timeline.isReducedMotion}
          locale={bundle.locale}
          onTaskSelect={goToTask}
        />
      </div>
    </section>
  );
}

export default JourneySection;
