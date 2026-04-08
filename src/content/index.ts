import { agentProfileSnapshot } from "./agentProfile";
import { agentPromptCards } from "./agentPromptCards";
import { factionOptions, selectedFaction } from "./factionContent";
import { heroContent } from "./heroContent";
import type { LongpageContent } from "./models";
import { shareSummary } from "./shareSummary";
import { taskMilestones } from "./taskMilestones";

export const longpageContent: LongpageContent = {
  hero: heroContent,
  agentProfile: agentProfileSnapshot,
  tasks: taskMilestones,
  shareSummary,
  agentPromptCards
};

export {
  agentProfileSnapshot,
  agentPromptCards,
  factionOptions,
  heroContent,
  selectedFaction,
  shareSummary,
  taskMilestones
};

export type {
  AgentProfileSnapshot,
  AgentPromptCard,
  DerivedTaskMilestone,
  DerivedTaskStage,
  FactionOption,
  FocusTarget,
  HeroContent,
  JourneyCardState,
  LongpageContent,
  ShareSummary,
  ShareSummaryView,
  SimulationTimelineState,
  TaskId,
  TaskMilestone,
  TaskStage,
  TaskStageStatus,
  TimelineHint
} from "./models";
