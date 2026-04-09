import type {
  AgentProfileSnapshot,
  DerivedTaskMilestone,
  DerivedTaskStage,
  FactionOption,
  ShareSummary,
  ShareSummaryView,
  SimulationTimelineState,
  TaskMilestone,
  TaskStageStatus,
  TimelineHint
} from "../content";

function applyTemplate(
  template: string | undefined,
  replacements: Record<string, string>
): string | undefined {
  if (!template) {
    return undefined;
  }

  return Object.entries(replacements).reduce((output, [key, value]) => {
    return output.replaceAll(`{${key}}`, value);
  }, template);
}

function getDerivedStageStatus(
  taskIndex: number,
  stageIndex: number,
  timeline: SimulationTimelineState
): TaskStageStatus {
  if (timeline.isComplete) {
    return "done";
  }

  if (taskIndex < timeline.currentTaskIndex) {
    return "done";
  }

  if (taskIndex > timeline.currentTaskIndex) {
    return "pending";
  }

  if (stageIndex < timeline.currentStageIndex) {
    return "done";
  }

  if (stageIndex > timeline.currentStageIndex) {
    return "pending";
  }

  return "active";
}

function countCompletedStages(stages: DerivedTaskStage[]): number {
  return stages.filter((stage) => stage.status === "done").length;
}

export function deriveJourneyMilestones(
  tasks: TaskMilestone[],
  timeline: SimulationTimelineState
): DerivedTaskMilestone[] {
  return tasks.map((task, taskIndex) => {
    const derivedStages = task.stages.map<DerivedTaskStage>((stage, stageIndex) => {
      const status = getDerivedStageStatus(taskIndex, stageIndex, timeline);

      return {
        ...stage,
        status,
        isCurrent: !timeline.isComplete && taskIndex === timeline.currentTaskIndex && stageIndex === timeline.currentStageIndex
      };
    });

    const completedStageCount = countCompletedStages(derivedStages);
    const state =
      timeline.isComplete || taskIndex < timeline.currentTaskIndex
        ? "completed"
        : taskIndex === timeline.currentTaskIndex
          ? "active"
          : "upcoming";

    return {
      ...task,
      state,
      stages: derivedStages,
      progressRatio:
        timeline.isComplete && taskIndex === tasks.length - 1
          ? 1
          : completedStageCount / derivedStages.length
    };
  });
}

function pickProof(task: TaskMilestone, stageId: string): string | undefined {
  return task.stages.find((stage) => stage.stageId === stageId)?.proof;
}

export function deriveShareSummaryView(
  agentProfile: AgentProfileSnapshot,
  baseShareSummary: ShareSummary,
  tasks: TaskMilestone[],
  faction: FactionOption
): ShareSummaryView {
  const task2 = tasks.find((task) => task.taskId === "task-2");
  const task3 = tasks.find((task) => task.taskId === "task-3");

  const supportingFacts = [
    pickProof(tasks[0], "task-1-faction"),
    pickProof(task2 ?? tasks[1], "task-2-user-id"),
    pickProof(task2 ?? tasks[1], "task-2-token"),
    pickProof(task3 ?? tasks[2], "task-3-threshold"),
    pickProof(task3 ?? tasks[2], "task-3-telegram"),
    ...(baseShareSummary.supportingFacts ?? [])
  ].filter((fact): fact is string => Boolean(fact));

  return {
    ...baseShareSummary,
    title:
      applyTemplate(baseShareSummary.titleTemplate, {
        headline: agentProfile.headline,
        faction: faction.displayName
      }) ?? baseShareSummary.title,
    scoreSummary:
      applyTemplate(baseShareSummary.scoreSummaryTemplate, {
        score: String(agentProfile.scoreValue),
        label: agentProfile.scoreLabel
      }) ?? baseShareSummary.scoreSummary,
    resonanceStatus: baseShareSummary.resonanceStatus,
    factionStatus:
      applyTemplate(baseShareSummary.factionStatusTemplate, {
        faction: faction.displayName
      }) ?? baseShareSummary.factionStatus,
    supportingFacts: Array.from(new Set(supportingFacts)),
    agentHeadline: agentProfile.headline,
    scoreGrade: agentProfile.scoreGrade,
    percentileNote: agentProfile.percentileNote,
    agentType: agentProfile.agentType,
    dominantAxes: agentProfile.dominantAxes,
    factionName: faction.displayName,
    txId: agentProfile.txId,
    nextHint: agentProfile.nextHint
  };
}

export function deriveCurrentTaskHint(
  tasks: TaskMilestone[],
  timeline: SimulationTimelineState
): TimelineHint {
  if (timeline.isComplete) {
    return {
      currentTaskLabel: tasks[tasks.length - 1].brandedName,
      currentStageLabel: tasks[tasks.length - 1].completionBadge,
      nextCta: tasks[tasks.length - 1].cta ?? "Continue with the next public-facing action"
    };
  }

  const currentTask = tasks[timeline.currentTaskIndex];
  const currentStage = currentTask.stages[timeline.currentStageIndex];
  const nextTask = tasks[timeline.currentTaskIndex + 1];

  return {
    currentTaskLabel: currentTask.brandedName,
    currentStageLabel: currentStage.label,
    nextCta: currentTask.cta ?? nextTask?.brandedName ?? "继续观看后续结果"
  };
}
