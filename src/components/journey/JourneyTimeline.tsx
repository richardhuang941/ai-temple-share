import type { CSSProperties } from "react";
import type { DerivedTaskMilestone, TimelineHint } from "../../content";
import TaskMilestoneCard from "./TaskMilestoneCard";

interface JourneyTimelineProps {
  tasks: DerivedTaskMilestone[];
  progress: number;
  currentHint: TimelineHint;
  isReducedMotion: boolean;
  onTaskSelect: (taskIndex: number) => void;
}

export function JourneyTimeline({
  tasks,
  progress,
  currentHint,
  isReducedMotion,
  onTaskSelect
}: JourneyTimelineProps) {
  const progressBarStyle: CSSProperties = {
    width: `${Math.max(progress * 100, 8)}%`,
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
            <strong style={{ fontSize: "1rem" }}>当前聚焦：{currentHint.currentTaskLabel}</strong>
            <span style={{ color: "var(--color-muted)" }}>阶段：{currentHint.currentStageLabel}</span>
          </div>
          <span style={{ color: "var(--color-muted)" }}>
            {isReducedMotion ? "已切换到低动态模式" : "自动推进会把五个 Task 串成一段完整旅程"}
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
            下一步提示：{currentHint.nextCta}
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
            isReducedMotion={isReducedMotion}
            onSelect={() => onTaskSelect(taskIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default JourneyTimeline;
