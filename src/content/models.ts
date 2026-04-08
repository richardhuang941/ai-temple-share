export type TaskId = "task-1" | "task-2" | "task-3" | "task-4" | "task-5";
export type TaskStageStatus = "pending" | "active" | "done";
export type JourneyCardState = "upcoming" | "active" | "completed";
export type FocusTarget = "journey" | "share";

export interface HeroContent {
  eyebrow: string;
  title: string;
  summary: string;
  ctaLabel: string;
}

export interface AgentProfileSnapshot {
  headline: string;
  scoreValue: number;
  scoreLabel: string;
  agentType: string;
  dominantAxes: string[];
  missingAxes?: string[];
  nextHint: string;
}

export interface TaskStage {
  stageId: string;
  label: string;
  description: string;
  status: TaskStageStatus;
  proof?: string;
  externalTarget?: string;
}

export interface TaskMilestone {
  taskId: TaskId;
  order: number;
  brandedName: string;
  purpose: string;
  summary: string;
  isOptional: boolean;
  isExternalFlow: boolean;
  stages: TaskStage[];
  completionBadge: string;
  cta?: string;
}

export interface ShareSummary {
  title: string;
  scoreSummary: string;
  resonanceStatus: string;
  factionStatus: string;
  supportingFacts?: string[];
  qualificationNote: string;
}

export interface AgentPromptCard {
  title: string;
  goal: string;
  context: string[];
  referenceRepo: string;
  promptBody: string;
  expectedOutput: string[];
}

export interface FactionOption {
  brandKey: string;
  displayName: string;
  coreStance: string;
  telegramTemplate?: string;
}

export interface LongpageContent {
  hero: HeroContent;
  agentProfile: AgentProfileSnapshot;
  tasks: TaskMilestone[];
  shareSummary: ShareSummary;
  agentPromptCards: AgentPromptCard[];
}

export interface SimulationTimelineState {
  currentTaskIndex: number;
  currentStageIndex: number;
  isAutoplay: boolean;
  isReducedMotion: boolean;
  cycleDurationMs: number;
  isComplete: boolean;
  focusTarget: FocusTarget;
}

export interface DerivedTaskStage extends Omit<TaskStage, "status"> {
  status: TaskStageStatus;
  isCurrent: boolean;
}

export interface DerivedTaskMilestone extends Omit<TaskMilestone, "stages"> {
  state: JourneyCardState;
  progressRatio: number;
  stages: DerivedTaskStage[];
}

export interface ShareSummaryView extends ShareSummary {
  agentHeadline: string;
  agentType: string;
  dominantAxes: string[];
  nextHint: string;
}

export interface TimelineHint {
  currentTaskLabel: string;
  currentStageLabel: string;
  nextCta: string;
}
