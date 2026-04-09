export type TaskId = "task-1" | "task-2" | "task-3" | "task-4" | "task-5";
export type TaskStageStatus = "pending" | "active" | "done";
export type JourneyCardState = "upcoming" | "active" | "completed";
export type FocusTarget = "journey" | "share";
export type LocaleCode = "zh" | "en";
export type LocaleSource = "system" | "stored" | "manual";
export type ShareMode = "image" | "text";
export type SharePlatformKey = "x" | "wechat" | "xiaohongshu" | "douyin";
export type FactionBrandKey = "imprints" | "crucibles" | "metamorphs" | "sentinels";

export interface HeroContent {
  eyebrow: string;
  title: string;
  summary: string;
  ctaLabel: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  tertiaryCtaLabel?: string;
  disclaimer?: string;
}

export interface AgentProfileSnapshot {
  headline: string;
  scoreValue: number;
  scoreLabel: string;
  scoreGrade: string;
  percentile: number;
  percentileNote: string;
  agentType: string;
  tierLabel: string;
  primaryAxis: string;
  secondaryAxis: string;
  dominantAxes: string[];
  missingAxes?: string[];
  factionName: string;
  factionMapping: string;
  txId: string;
  nextHint: string;
}

export interface SeededAxisScore {
  key: "M" | "R" | "G" | "A" | "S" | "X";
  label: string;
  value: number;
}

export interface SeededSimulationResult {
  sessionKey: string;
  factionBrandKey: FactionBrandKey;
  scoreValue: number;
  scoreGrade: string;
  percentile: number;
  typeLabel: string;
  tierLabel: string;
  primaryAxis: string;
  secondaryAxis: string;
  dominantAxes: string[];
  weakestAxes: string[];
  axisScores: SeededAxisScore[];
  factionMapping: string;
  voteThreshold: string;
  resonanceReward: string;
  txId: string;
  nextHint: string;
  socialSignal: string;
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
  titleTemplate?: string;
  scoreSummaryTemplate?: string;
  factionStatusTemplate?: string;
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
  brandKey: FactionBrandKey;
  displayName: string;
  coreStance: string;
  proposalPageLabel?: string;
  telegramTemplate?: string;
}

export interface LongpageContent {
  hero: HeroContent;
  agentProfile: AgentProfileSnapshot;
  tasks: TaskMilestone[];
  shareSummary: ShareSummary;
  agentPromptCards: AgentPromptCard[];
}

export interface ChromeCopy {
  languageLabel: string;
  languageNames: Record<LocaleCode, string>;
  acceptChallengeLabel: string;
  shareChallengeLabel: string;
  watchSimulationLabel: string;
  shareImageLabel: string;
  shareTextLabel: string;
  copyLabel: string;
  copiedLabel: string;
  simulationIdleLabel: string;
  simulationDisclaimer: string;
}

export interface JourneySectionCopy {
  eyebrow: string;
  title: string;
  summary: string;
  helperCards: Array<{
    title: string;
    body: string;
  }>;
  startLabel: string;
  restartLabel: string;
  advanceLabel: string;
  pauseLabel: string;
  resumeLabel: string;
}

export interface ShareSectionCopy {
  eyebrow: string;
  title: string;
  summary: string;
  imageCaption: string;
  textBody: string;
  challengeLinkLabel: string;
}

export interface AgentPromptSectionCopy {
  eyebrow: string;
  title: string;
  summary: string;
}

export interface LocaleState {
  locale: LocaleCode;
  source: LocaleSource;
}

export interface LocalizedContentBundle extends LongpageContent {
  locale: LocaleCode;
  chrome: ChromeCopy;
  journey: JourneySectionCopy;
  shareSection: ShareSectionCopy;
  agentPromptSection: AgentPromptSectionCopy;
  factionOptions: FactionOption[];
  selectedFaction: FactionOption;
}

export interface SimulationTimelineState {
  hasStarted?: boolean;
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
  scoreGrade: string;
  percentileNote: string;
  agentType: string;
  dominantAxes: string[];
  factionName: string;
  txId: string;
  nextHint: string;
}

export interface TimelineHint {
  currentTaskLabel: string;
  currentStageLabel: string;
  nextCta: string;
}
