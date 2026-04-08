import type { CSSProperties } from "react";
import type { DerivedTaskMilestone, LocaleCode } from "../../content";
import CompletionBadge from "./CompletionBadge";
import StagePulse from "./StagePulse";

interface TaskMilestoneCardProps {
  task: DerivedTaskMilestone;
  locale: LocaleCode;
  hasStarted: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
  articleRef?: (element: HTMLElement | null) => void;
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
  locale,
  hasStarted,
  isReducedMotion,
  onSelect,
  articleRef
}: TaskMilestoneCardProps) {
  const featuredProof = getFeaturedProof(task);
  const isActive = hasStarted && task.state === "active";
  const currentStage = task.stages.find((stage) => stage.isCurrent);
  const liveStageLabel =
    currentStage?.label ??
    (task.state === "completed"
      ? task.completionBadge
      : locale === "zh"
        ? "等待这个任务被点亮"
        : "Waiting for this task to light up");
  const liveProof =
    currentStage?.proof ??
    featuredProof ??
    (locale === "zh" ? "当前还没有新的公开证据。" : "No new public proof is visible yet.");
  const cardStyle: CSSProperties = isActive && !isReducedMotion ? { transform: "translateY(-3px)" } : {};

  return (
    <article
      ref={articleRef}
      className="journey-card"
      data-state={task.state}
      data-optional={task.isOptional ? "true" : undefined}
      data-external={task.isExternalFlow ? "true" : undefined}
      style={cardStyle}
    >
      <div className="journey-card-header">
        <div className="journey-card-copy">
          <span className="journey-card-kicker">
            Task {task.order.toString().padStart(2, "0")}
          </span>
          <h3>{task.brandedName}</h3>
        </div>
        <div className="journey-card-badges">
          {task.isExternalFlow ? (
            <CompletionBadge tone="warning">{locale === "zh" ? "原生流" : "Native flow"}</CompletionBadge>
          ) : null}
          {task.isOptional ? (
            <CompletionBadge tone="default">{locale === "zh" ? "可选项" : "Optional"}</CompletionBadge>
          ) : null}
          {task.state === "completed" ? (
            <CompletionBadge tone="success">{locale === "zh" ? "已走完" : "Completed"}</CompletionBadge>
          ) : null}
          {isActive ? (
            <CompletionBadge tone="warning">{locale === "zh" ? "当前主舞台" : "Current stage"}</CompletionBadge>
          ) : null}
        </div>
      </div>

      <div className="journey-card-body">
        <p className="journey-card-purpose">{task.purpose}</p>
        <p className="journey-card-summary">{task.summary}</p>
      </div>

      <div className="journey-live-strip">
        <span>{locale === "zh" ? "当前推进焦点" : "Current live focus"}</span>
        <strong>{liveStageLabel}</strong>
        <p>{liveProof}</p>
      </div>

      <div className="journey-metrics">
        <div className="journey-metric">
          <span>{locale === "zh" ? "完成徽记" : "Completion badge"}</span>
          <strong>{task.completionBadge}</strong>
        </div>
        <div className="journey-metric">
          <span>{locale === "zh" ? "推进进度" : "Progress"}</span>
          <strong>{Math.round(task.progressRatio * 100)}%</strong>
        </div>
        <div className="journey-metric">
          <span>{locale === "zh" ? "高亮证据" : "Featured proof"}</span>
          <strong>{featuredProof ?? (locale === "zh" ? "等待当前阶段点亮" : "Waiting for the next lit stage")}</strong>
        </div>
      </div>

      <ul className="journey-stage-list">
        {task.stages.map((stage) => (
          <StagePulse
            key={stage.stageId}
            stage={stage}
            isReducedMotion={isReducedMotion}
            locale={locale}
          />
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className="journey-card-action"
      >
        <strong>
          {task.cta ?? (locale === "zh" ? "继续查看下一步" : "Continue to the next step")}
        </strong>
        <span>
          {locale === "zh"
            ? "点击可把聚焦切到这个任务，从头看它的阶段推进。"
            : "Click to move focus to this task and replay its stage progression."}
        </span>
      </button>
    </article>
  );
}

export default TaskMilestoneCard;
