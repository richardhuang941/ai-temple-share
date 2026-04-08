import type { CSSProperties } from "react";
import type { DerivedTaskMilestone, LocaleCode, TimelineHint } from "../../content";
import TaskMilestoneCard from "./TaskMilestoneCard";

interface JourneyTimelineProps {
  tasks: DerivedTaskMilestone[];
  progress: number;
  currentHint: TimelineHint;
  hasStarted: boolean;
  idleLabel: string;
  isReducedMotion: boolean;
  locale: LocaleCode;
  onTaskSelect: (taskIndex: number) => void;
  onTaskMount: (taskId: string, element: HTMLElement | null) => void;
}

export function JourneyTimeline({
  tasks,
  progress,
  currentHint,
  hasStarted,
  idleLabel,
  isReducedMotion,
  locale,
  onTaskSelect,
  onTaskMount
}: JourneyTimelineProps) {
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

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="journey-summary-card">
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
                ? "自动推进会把五个 Task 串成一段完整旅程"
                : "Autoplay will connect all five tasks into one readable journey"}
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
            onSelect={() => onTaskSelect(taskIndex)}
            articleRef={(element) => onTaskMount(task.taskId, element)}
          />
        ))}
      </div>
    </div>
  );
}

export default JourneyTimeline;
