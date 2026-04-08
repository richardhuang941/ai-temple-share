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
}

export function JourneyTimeline({
  tasks,
  progress,
  currentHint,
  hasStarted,
  idleLabel,
  isReducedMotion,
  locale,
  onTaskSelect
}: JourneyTimelineProps) {
  const progressBarStyle: CSSProperties = {
    width: hasStarted ? `${Math.max(progress * 100, 8)}%` : "0%",
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, var(--color-accent), var(--color-highlight))",
    transition: "width var(--step-slow) var(--ease-emphatic)"
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div
        className="shell-panel"
        style={{
          display: "grid",
          gap: "1rem",
          padding: "1.2rem 1.3rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center"
          }}
        >
          <div style={{ display: "grid", gap: "0.3rem" }}>
            <strong style={{ fontSize: "1rem" }}>
              {hasStarted
                ? `${locale === "zh" ? "当前聚焦" : "Current focus"}：${currentHint.currentTaskLabel}`
                : locale === "zh"
                  ? "等待你来启动模拟"
                  : "Waiting for you to start the simulation"}
            </strong>
            <span style={{ color: "var(--color-muted)" }}>
              {hasStarted
                ? `${locale === "zh" ? "阶段" : "Stage"}：${currentHint.currentStageLabel}`
                : idleLabel}
            </span>
          </div>
          <span style={{ color: "var(--color-muted)" }}>
            {isReducedMotion
              ? locale === "zh"
                ? "已切换到低动态模式"
                : "Reduced-motion mode is active"
              : locale === "zh"
                ? "自动推进会把五个 Task 串成一段完整旅程"
                : "Autoplay will connect all five tasks into one readable journey"}
          </span>
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "0.65rem",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <div style={progressBarStyle} />
          </div>
          <span style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
            {hasStarted
              ? `${locale === "zh" ? "下一步提示" : "Next hint"}：${currentHint.nextCta}`
              : idleLabel}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.1rem"
        }}
      >
        {tasks.map((task, taskIndex) => (
          <TaskMilestoneCard
            key={task.taskId}
            task={task}
            locale={locale}
            hasStarted={hasStarted}
            isReducedMotion={isReducedMotion}
            onSelect={() => onTaskSelect(taskIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default JourneyTimeline;
