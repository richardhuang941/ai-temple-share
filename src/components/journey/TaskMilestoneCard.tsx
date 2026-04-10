import type { CSSProperties } from "react";
import type { DerivedTaskMilestone, LocaleCode } from "../../content";
import CompletionBadge from "./CompletionBadge";
import StagePulse from "./StagePulse";

interface TaskMilestoneCardProps {
  task: DerivedTaskMilestone;
  locale: LocaleCode;
  hasStarted: boolean;
  isReducedMotion: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpanded: () => void;
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
  isExpanded,
  onSelect,
  onToggleExpanded,
  articleRef
}: TaskMilestoneCardProps) {
  const featuredProof = getFeaturedProof(task);
  const isActive = hasStarted && task.state === "active";
  const isCompleted = task.state === "completed";
  const shouldShowDetails = isActive || isExpanded;
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
  const actionLabel =
    locale === "zh"
      ? isExpanded
        ? "收起这个 Task"
        : isCompleted
          ? "展开这个 Task"
          : "切到这个 Task"
      : isExpanded
        ? "Collapse this task"
        : isCompleted
          ? "Expand this task"
          : "Focus this task";
  const activeFooterLabel =
    locale === "zh" ? "当前任务下一步" : "Current task next step";
  const stageListId = `${task.taskId}-stage-list`;

  return (
    <article
      ref={articleRef}
      className="journey-card"
      data-state={task.state}
      data-expanded={shouldShowDetails ? "true" : undefined}
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
            <CompletionBadge tone="warning">{locale === "zh" ? "原生流程" : "Native flow"}</CompletionBadge>
          ) : null}
          {task.isOptional ? (
            <CompletionBadge tone="default">{locale === "zh" ? "可选项" : "Optional"}</CompletionBadge>
          ) : null}
          {task.state === "completed" ? (
            <CompletionBadge tone="success">{locale === "zh" ? "已走完" : "Completed"}</CompletionBadge>
          ) : null}
          {isActive ? (
            <CompletionBadge tone="warning">{locale === "zh" ? "当前焦点" : "Current focus"}</CompletionBadge>
          ) : null}
        </div>
      </div>

      <div className="journey-card-body">
        <p className="journey-card-purpose">{task.purpose}</p>
        {shouldShowDetails ? <p className="journey-card-summary">{task.summary}</p> : null}
      </div>

      <div className="journey-live-strip">
        <span>{locale === "zh" ? "当前推进焦点" : "Current live focus"}</span>
        <strong>{liveStageLabel}</strong>
        <p>{liveProof}</p>
      </div>

      <div className="journey-card-footnote">
        <span>{locale === "zh" ? "完成结果" : "Completion result"}</span>
        <strong>{task.completionBadge}</strong>
      </div>

      {shouldShowDetails ? (
        <ul id={stageListId} className="journey-stage-list">
          {task.stages.map((stage) => (
            <StagePulse
              key={stage.stageId}
              stage={stage}
              isReducedMotion={isReducedMotion}
              locale={locale}
              isExpanded={isActive ? stage.isCurrent : true}
            />
          ))}
        </ul>
      ) : null}

      {isActive ? (
        <div className="journey-card-action journey-card-action--active" role="note" aria-label={activeFooterLabel}>
          <strong>{task.cta ?? (locale === "zh" ? "继续查看下一步" : "Continue to the next step")}</strong>
        </div>
      ) : (
        <button
          type="button"
          onClick={isCompleted ? onToggleExpanded : onSelect}
          className="journey-card-action"
          aria-expanded={isCompleted ? isExpanded : undefined}
          aria-controls={isCompleted && shouldShowDetails ? stageListId : undefined}
        >
          <strong>{actionLabel}</strong>
          <span>
            {isCompleted
              ? isExpanded
                ? locale === "zh"
                  ? "收起这个 Task 的阶段明细，不影响当前推进。"
                  : "Collapse these stage details without changing the live run."
                : locale === "zh"
                  ? "直接下拉看完这个 Task 的阶段明细，不会重跑。"
                  : "Open the completed stages directly without replaying the run."
              : locale === "zh"
                ? "把当前聚焦切到这里。"
                : "Move the live focus here."}
          </span>
        </button>
      )}
    </article>
  );
}

export default TaskMilestoneCard;
