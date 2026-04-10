import { useState, type CSSProperties } from "react";
import type { DerivedTaskMilestone, LocaleCode, TimelineHint } from "../../content";
import TaskMilestoneCard from "./TaskMilestoneCard";

interface JourneyTimelineProps {
  tasks: DerivedTaskMilestone[];
  progress: number;
  currentHint: TimelineHint;
  hasStarted: boolean;
  idleLabel: string;
  isAutoplay: boolean;
  isComplete: boolean;
  isReducedMotion: boolean;
  locale: LocaleCode;
  pauseLabel: string;
  resumeLabel: string;
  onToggleAutoplay: () => void;
  onTaskSelect: (taskIndex: number) => void;
  onTaskMount: (taskId: string, element: HTMLElement | null) => void;
}

export function JourneyTimeline({
  tasks,
  progress,
  currentHint,
  hasStarted,
  idleLabel,
  isAutoplay,
  isComplete,
  isReducedMotion,
  locale,
  pauseLabel,
  resumeLabel,
  onToggleAutoplay,
  onTaskSelect,
  onTaskMount
}: JourneyTimelineProps) {
  const [expandedTaskIds, setExpandedTaskIds] = useState<Record<string, boolean>>({});
  const activeTask =
    tasks.find((task) => task.state === "active") ??
    (hasStarted && tasks.length > 0 ? tasks[tasks.length - 1] : undefined);
  const activeStage = activeTask?.stages.find((stage) => stage.isCurrent);
  const proofNote =
    activeStage?.proof ??
    [...(activeTask?.stages ?? [])].reverse().find((stage) => stage.status === "done")?.proof ??
    idleLabel;
  const progressBarStyle: CSSProperties = {
    width: hasStarted ? `${Math.max(progress * 100, 8)}%` : "0%",
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, var(--color-highlight), var(--coral-bright))",
    transition: "width var(--step-slow) var(--ease-emphatic)"
  };
  const showFloatingAutoplayControl = hasStarted && !isReducedMotion && !isComplete;

  return (
    <div className="journey-flow-column">
      <div
        className={`journey-summary-card${showFloatingAutoplayControl ? " journey-summary-card--with-control" : ""}`}
      >
        {showFloatingAutoplayControl ? (
          <button
            type="button"
            className="journey-floating-toggle"
            aria-pressed={isAutoplay}
            onClick={onToggleAutoplay}
          >
            <span className="journey-floating-toggle__icon" aria-hidden="true">
              {isAutoplay ? "||" : ">"}
            </span>
            <span>{isAutoplay ? pauseLabel : resumeLabel}</span>
          </button>
        ) : null}
        <div className="journey-summary-row">
          <div className="journey-summary-copy">
            <strong>
              {hasStarted
                ? `${locale === "zh" ? "当前聚焦" : "Current focus"}：${currentHint.currentTaskLabel}`
                : locale === "zh"
                  ? "等待你来启动模拟"
                  : "Waiting for you to start the simulation"}
            </strong>
            <span>
              {hasStarted
                ? `${locale === "zh" ? "阶段" : "Stage"}：${currentHint.currentStageLabel}`
                : idleLabel}
            </span>
          </div>
          <span className="journey-summary-note">
            {isReducedMotion
              ? locale === "zh"
                ? "已切换到低动态模式"
                : "Reduced-motion mode is active"
              : locale === "zh"
                ? "自动推进会把六个 Task 串成一段完整旅程"
                : "Autoplay will connect all six tasks into one readable journey"}
          </span>
        </div>

        <div style={{ display: "grid", gap: "0.65rem" }}>
          <div aria-hidden="true" className="journey-progress-track">
            <div style={progressBarStyle} />
          </div>
          <span className="journey-summary-proof">
            {locale === "zh" ? "当前可见证据" : "Visible proof"}: {proofNote}
          </span>
          <span className="journey-summary-note" style={{ fontSize: "0.9rem" }}>
            {hasStarted
              ? `${locale === "zh" ? "下一步提示" : "Next hint"}：${currentHint.nextCta}`
              : idleLabel}
          </span>
        </div>
      </div>

      <div className="journey-card-grid">
        {tasks.map((task, taskIndex) => (
          <TaskMilestoneCard
            key={task.taskId}
            task={task}
            locale={locale}
            hasStarted={hasStarted}
            isReducedMotion={isReducedMotion}
            isExpanded={Boolean(expandedTaskIds[task.taskId])}
            onSelect={() => onTaskSelect(taskIndex)}
            onToggleExpanded={() =>
              setExpandedTaskIds((previousState) => ({
                ...previousState,
                [task.taskId]: !previousState[task.taskId]
              }))
            }
            articleRef={(element) => onTaskMount(task.taskId, element)}
          />
        ))}
      </div>
    </div>
  );
}

export default JourneyTimeline;
