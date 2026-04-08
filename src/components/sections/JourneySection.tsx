import { useEffect, useRef } from "react";
import {
  getLocalizedLongpageContent,
  type LocalizedContentBundle,
  type SimulationTimelineState
} from "../../content";
import JourneyTimeline from "../journey/JourneyTimeline";
import { useJourneyTimeline } from "../../hooks/useJourneyTimeline";
import {
  getFocusScrollBehavior,
  shouldAutoFocusTask,
  shouldRecenterTask
} from "../../lib/timeline";
import "../../styles/journey.css";

interface JourneySectionProps {
  bundle?: LocalizedContentBundle;
}

export function JourneySection({
  bundle = getLocalizedLongpageContent("zh")
}: JourneySectionProps) {
  const journeyIntentRef = useRef<"start" | "view" | null>(null);
  const taskElementsRef = useRef<Record<string, HTMLElement | null>>({});
  const previousTimelineRef = useRef<SimulationTimelineState | null>(null);
  const lastFocusSignatureRef = useRef<string | null>(null);
  const { advance, currentHint, derivedTasks, goToTask, progress, restart, setAutoplay, start, timeline } =
    useJourneyTimeline(bundle.tasks, {
      cycleDurationMs: 4300,
      isAutoplay: false
    });

  useEffect(() => {
    const handleJourneyIntent = (event: MouseEvent): void => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const journeyLink = target.closest('a[href="#journey"]');

      if (!(journeyLink instanceof HTMLAnchorElement)) {
        return;
      }

      const shouldStartSimulation = journeyLink.classList.contains("challenge-cta--ghost");
      journeyIntentRef.current = shouldStartSimulation ? "start" : "view";

      if (shouldStartSimulation && window.location.hash === "#journey" && !timeline.hasStarted) {
        window.requestAnimationFrame(() => {
          start();
        });
      }
    };

    const handleHashStart = (): void => {
      if (window.location.hash === "#journey" && !timeline.hasStarted && journeyIntentRef.current === "start") {
        start();
      }

      journeyIntentRef.current = null;
    };

    document.addEventListener("click", handleJourneyIntent, true);
    window.addEventListener("hashchange", handleHashStart);

    return () => {
      document.removeEventListener("click", handleJourneyIntent, true);
      window.removeEventListener("hashchange", handleHashStart);
    };
  }, [start, timeline.hasStarted]);

  useEffect(() => {
    const previousTimeline = previousTimelineRef.current;

    if (!shouldAutoFocusTask(previousTimeline, timeline, bundle.tasks)) {
      previousTimelineRef.current = timeline;
      return;
    }

    const currentTask = bundle.tasks[timeline.currentTaskIndex];
    const focusSignature = `${timeline.currentTaskIndex}:${timeline.currentStageIndex}:${timeline.isComplete}`;

    if (!currentTask || lastFocusSignatureRef.current === focusSignature) {
      previousTimelineRef.current = timeline;
      return;
    }

    const currentElement = taskElementsRef.current[currentTask.taskId];

    if (currentElement) {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

      if (shouldRecenterTask(currentElement.getBoundingClientRect(), viewportHeight)) {
        currentElement.scrollIntoView({
          behavior: getFocusScrollBehavior(timeline.isReducedMotion),
          block: "center",
          inline: "nearest"
        });
      }
    }

    lastFocusSignatureRef.current = focusSignature;
    previousTimelineRef.current = timeline;
  }, [
    bundle.tasks,
    timeline.currentStageIndex,
    timeline.currentTaskIndex,
    timeline.hasStarted,
    timeline.isComplete,
    timeline.isReducedMotion
  ]);

  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div className="journey-shell">
        <div className="journey-intro">
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

        <div className="journey-helper-grid">
          {bundle.journey.helperCards.map((card) => (
            <article key={card.title} className="journey-helper-card">
              <strong>{card.title}</strong>
              <span>{card.body}</span>
            </article>
          ))}
        </div>

        <div className="journey-action-row">
          <button
            type="button"
            onClick={timeline.hasStarted ? advance : start}
            className="journey-button journey-button--primary"
          >
            {timeline.hasStarted ? bundle.journey.advanceLabel : bundle.journey.startLabel}
          </button>
          {timeline.hasStarted ? (
            <>
              <button
                type="button"
                onClick={restart}
                className="journey-button journey-button--secondary"
              >
                {bundle.journey.restartLabel}
              </button>
              <button
                type="button"
                onClick={() => setAutoplay(!timeline.isAutoplay)}
                className="journey-button journey-button--ghost"
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
          onTaskMount={(taskId, element) => {
            taskElementsRef.current[taskId] = element;
          }}
        />
      </div>
    </section>
  );
}

export default JourneySection;
