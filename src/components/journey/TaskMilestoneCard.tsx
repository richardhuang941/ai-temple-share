import type { CSSProperties } from "react";
import type { DerivedTaskMilestone } from "../../content";
import CompletionBadge from "./CompletionBadge";
import StagePulse from "./StagePulse";

interface TaskMilestoneCardProps {
  task: DerivedTaskMilestone;
  isReducedMotion: boolean;
  onSelect: () => void;
}

function getFeaturedProof(task: DerivedTaskMilestone): string | undefined {
  const currentStage = task.stages.find((stage) => stage.isCurrent);
  if (currentStage?.proof) {
    return currentStage.proof;
  }

  const lastDoneStage = [...task.stages].reverse().find((stage) => stage.status === "done");
  return lastDoneStage?.proof;
}

export function TaskMilestoneCard({
  task,
  isReducedMotion,
  onSelect
}: TaskMilestoneCardProps) {
  const featuredProof = getFeaturedProof(task);
  const cardStyle: CSSProperties = {
    display: "grid",
    gap: "1rem",
    padding: "1.4rem",
    minHeight: "100%",
    borderRadius: "var(--radius-lg)",
    border:
      task.state === "active"
        ? "1px solid rgba(142, 228, 255, 0.28)"
        : "1px solid rgba(255, 255, 255, 0.08)",
    background:
      task.state === "active"
        ? "linear-gradient(180deg, rgba(16, 26, 39, 0.98), rgba(8, 15, 25, 0.94))"
        : "linear-gradient(180deg, rgba(10, 16, 26, 0.8), rgba(7, 12, 21, 0.92))",
    boxShadow:
      task.state === "active" && !isReducedMotion
        ? "0 0 0 1px rgba(142, 228, 255, 0.12), 0 24px 65px rgba(5, 11, 20, 0.4)"
        : "0 18px 42px rgba(2, 7, 19, 0.28)",
    transform: task.state === "active" && !isReducedMotion ? "translateY(-4px)" : "none",
    transition:
      "transform var(--step-base) var(--ease-emphatic), box-shadow var(--step-base) var(--ease-emphatic), border-color var(--step-base) var(--ease-emphatic)"
  };

  return (
    <article className="shell-panel" style={cardStyle}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.75rem" }}>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: task.state === "active" ? "var(--color-accent)" : "var(--color-muted)"
            }}
          >
            Task {task.order.toString().padStart(2, "0")}
          </span>
          <h3 style={{ margin: 0, fontSize: "1.4rem", lineHeight: 1.2 }}>{task.brandedName}</h3>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "0.5rem" }}>
          {task.isExternalFlow ? <CompletionBadge tone="warning">原生流</CompletionBadge> : null}
          {task.isOptional ? <CompletionBadge tone="default">可选项</CompletionBadge> : null}
          {task.state === "completed" ? <CompletionBadge tone="success">已走完</CompletionBadge> : null}
          {task.state === "active" ? <CompletionBadge tone="warning">当前主舞台</CompletionBadge> : null}
        </div>
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <p style={{ margin: 0, fontWeight: 600 }}>{task.purpose}</p>
        <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.6 }}>{task.summary}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "0.75rem"
        }}
      >
        <div
          style={{
            padding: "0.85rem 0.95rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", color: "var(--color-muted)", fontSize: "0.82rem" }}>完成徽记</span>
          <strong>{task.completionBadge}</strong>
        </div>
        <div
          style={{
            padding: "0.85rem 0.95rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", color: "var(--color-muted)", fontSize: "0.82rem" }}>推进进度</span>
          <strong>{Math.round(task.progressRatio * 100)}%</strong>
        </div>
        <div
          style={{
            padding: "0.85rem 0.95rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          <span style={{ display: "block", color: "var(--color-muted)", fontSize: "0.82rem" }}>高亮证据</span>
          <strong>{featuredProof ?? "等待当前阶段点亮"}</strong>
        </div>
      </div>

      <ul style={{ margin: 0, padding: 0, display: "grid", gap: "0.75rem", listStyle: "none" }}>
        {task.stages.map((stage) => (
          <StagePulse key={stage.stageId} stage={stage} isReducedMotion={isReducedMotion} />
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        style={{
          border: "1px solid rgba(142, 228, 255, 0.22)",
          background: "rgba(12, 20, 31, 0.88)",
          color: "var(--color-ink)",
          padding: "0.85rem 1rem",
          borderRadius: "var(--radius-md)",
          textAlign: "left",
          cursor: "pointer"
        }}
      >
        <strong style={{ display: "block", marginBottom: "0.2rem" }}>{task.cta ?? "继续查看下一步"}</strong>
        <span style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
          点击可把聚焦切到这个任务，从头看它的阶段推进。
        </span>
      </button>
    </article>
  );
}

export default TaskMilestoneCard;
