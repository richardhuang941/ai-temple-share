import { useEffect, useRef, useState } from "react";
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

const SBTI_STORAGE_KEY = "claws-temple-bounty-sbti";
const SBTI_GUIDE_URL = "https://sbti.unun.dev/";

export function JourneySection({
  bundle = getLocalizedLongpageContent("zh")
}: JourneySectionProps) {
  const taskElementsRef = useRef<Record<string, HTMLElement | null>>({});
  const previousTimelineRef = useRef<SimulationTimelineState | null>(null);
  const lastFocusSignatureRef = useRef<string | null>(null);
  const [sbtiValue, setSbtiValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.localStorage.getItem(SBTI_STORAGE_KEY) ?? "";
  });
  const [sbtiError, setSbtiError] = useState<string | null>(null);
  const { advance, currentHint, derivedTasks, goToTask, progress, restart, setAutoplay, start, timeline } =
    useJourneyTimeline(bundle.tasks, {
      cycleDurationMs: 4300,
      isAutoplay: false
    });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const normalized = sbtiValue.trim().toUpperCase();

    if (normalized) {
      window.localStorage.setItem(SBTI_STORAGE_KEY, normalized);
      return;
    }

    window.localStorage.removeItem(SBTI_STORAGE_KEY);
  }, [sbtiValue]);

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

  const startJourney = (): void => {
    const normalized = sbtiValue.trim().toUpperCase();

    if (!normalized) {
      setSbtiError(bundle.journey.sbtiError);
      return;
    }

    setSbtiValue(normalized);
    setSbtiError(null);
    start();
  };

  const handlePrimaryAction = (): void => {
    if (timeline.hasStarted) {
      advance();
      return;
    }

    startJourney();
  };

  return (
    <section id="journey" aria-labelledby="journey-heading" className="challenge-stage challenge-stage--journey">
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

        <div className="journey-gate-card">
          <label className="journey-gate-label" htmlFor="journey-sbti-input">
            {bundle.journey.sbtiLabel}
          </label>
          <input
            id="journey-sbti-input"
            className="journey-gate-input"
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder={bundle.journey.sbtiPlaceholder}
            value={sbtiValue}
            aria-invalid={sbtiError ? "true" : "false"}
            onChange={(event) => {
              setSbtiValue(event.target.value);
              setSbtiError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !timeline.hasStarted) {
                event.preventDefault();
                startJourney();
              }
            }}
          />
          <div className="journey-gate-helper-row">
            <p className="journey-gate-helper">{bundle.journey.sbtiHelper}</p>
            <a
              className="journey-gate-link"
              href={SBTI_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {bundle.journey.sbtiGuideLabel}
            </a>
          </div>
          {sbtiError ? (
            <p className="journey-gate-error" role="alert">
              {sbtiError}
            </p>
          ) : null}
        </div>

        <div className="journey-action-row">
          <button
            type="button"
            onClick={handlePrimaryAction}
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
