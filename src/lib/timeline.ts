import type { SimulationTimelineState, TaskMilestone } from "../content";

export const DEFAULT_CYCLE_DURATION_MS = 2400;

function resolveAutoplay(isReducedMotion: boolean, requestedAutoplay?: boolean): boolean {
  if (isReducedMotion) {
    return false;
  }

  return requestedAutoplay ?? true;
}

export function createInitialTimelineState(
  tasks: TaskMilestone[],
  options?: {
    cycleDurationMs?: number;
    isAutoplay?: boolean;
    isReducedMotion?: boolean;
  }
): SimulationTimelineState {
  const isReducedMotion = options?.isReducedMotion ?? false;

  return {
    currentTaskIndex: tasks.length > 0 ? 0 : -1,
    currentStageIndex: tasks.length > 0 ? 0 : -1,
    isAutoplay: resolveAutoplay(isReducedMotion, options?.isAutoplay),
    isReducedMotion,
    cycleDurationMs: options?.cycleDurationMs ?? DEFAULT_CYCLE_DURATION_MS,
    isComplete: false,
    focusTarget: "journey"
  };
}

export function advanceTimeline(
  state: SimulationTimelineState,
  tasks: TaskMilestone[]
): SimulationTimelineState {
  if (tasks.length === 0 || state.currentTaskIndex < 0 || state.currentStageIndex < 0) {
    return state;
  }

  if (state.isComplete) {
    return {
      ...state,
      isAutoplay: false,
      focusTarget: "share"
    };
  }

  const currentTask = tasks[state.currentTaskIndex];

  if (state.currentStageIndex < currentTask.stages.length - 1) {
    return {
      ...state,
      currentStageIndex: state.currentStageIndex + 1,
      focusTarget: "journey"
    };
  }

  if (state.currentTaskIndex < tasks.length - 1) {
    return {
      ...state,
      currentTaskIndex: state.currentTaskIndex + 1,
      currentStageIndex: 0,
      focusTarget: "journey"
    };
  }

  return {
    ...state,
    isAutoplay: false,
    isComplete: true,
    focusTarget: "share"
  };
}

export function jumpToTask(
  state: SimulationTimelineState,
  tasks: TaskMilestone[],
  taskIndex: number
): SimulationTimelineState {
  if (tasks.length === 0) {
    return state;
  }

  const clampedTaskIndex = Math.min(Math.max(taskIndex, 0), tasks.length - 1);

  return {
    ...state,
    currentTaskIndex: clampedTaskIndex,
    currentStageIndex: 0,
    isComplete: false,
    focusTarget: "journey"
  };
}

export function restartTimeline(
  state: SimulationTimelineState,
  tasks: TaskMilestone[]
): SimulationTimelineState {
  return createInitialTimelineState(tasks, {
    cycleDurationMs: state.cycleDurationMs,
    isAutoplay: state.isAutoplay,
    isReducedMotion: state.isReducedMotion
  });
}

export function getTimelineProgress(
  state: SimulationTimelineState,
  tasks: TaskMilestone[]
): number {
  const totalStages = tasks.reduce((sum, task) => sum + task.stages.length, 0);

  if (totalStages === 0) {
    return 0;
  }

  if (state.isComplete) {
    return 1;
  }

  const completedFromPriorTasks = tasks
    .slice(0, Math.max(state.currentTaskIndex, 0))
    .reduce((sum, task) => sum + task.stages.length, 0);

  const completedInCurrentTask = Math.max(state.currentStageIndex, 0);

  return (completedFromPriorTasks + completedInCurrentTask) / totalStages;
}
