import { getAgentProfileSnapshot } from "./agentProfile";
import { getAgentPromptCards } from "./agentPromptCards";
import { getFactionOptions, getSelectedFaction } from "./factionContent";
import { getHeroContent } from "./heroContent";
import type { LocaleCode, LocalizedContentBundle, LongpageContent } from "./models";
import { getShareSummary } from "./shareSummary";
import { getTaskMilestones } from "./taskMilestones";
import {
  getAgentPromptSectionCopy,
  getChromeCopy,
  getJourneySectionCopy,
  getShareSectionCopy
} from "./uiCopy";

export function getLocalizedLongpageContent(locale: LocaleCode): LocalizedContentBundle {
  const selectedFaction = getSelectedFaction(locale);

  return {
    locale,
    hero: getHeroContent(locale),
    agentProfile: getAgentProfileSnapshot(locale),
    tasks: getTaskMilestones(locale),
    shareSummary: getShareSummary(locale),
    agentPromptCards: getAgentPromptCards(locale),
    chrome: getChromeCopy(locale),
    journey: getJourneySectionCopy(locale),
    shareSection: getShareSectionCopy(locale),
    agentPromptSection: getAgentPromptSectionCopy(locale),
    factionOptions: getFactionOptions(locale),
    selectedFaction
  };
}

export const localizedContentBundles: Record<LocaleCode, LocalizedContentBundle> = {
  zh: getLocalizedLongpageContent("zh"),
  en: getLocalizedLongpageContent("en")
};

export const longpageContent: LongpageContent = localizedContentBundles.zh;

export const heroContent = localizedContentBundles.zh.hero;
export const agentProfileSnapshot = localizedContentBundles.zh.agentProfile;
export const taskMilestones = localizedContentBundles.zh.tasks;
export const shareSummary = localizedContentBundles.zh.shareSummary;
export const agentPromptCards = localizedContentBundles.zh.agentPromptCards;
export const factionOptions = localizedContentBundles.zh.factionOptions;
export const selectedFaction = localizedContentBundles.zh.selectedFaction;

export {
  getAgentProfileSnapshot,
  getAgentPromptCards,
  getAgentPromptSectionCopy,
  getChromeCopy,
  getFactionOptions,
  getHeroContent,
  getJourneySectionCopy,
  getSelectedFaction,
  getShareSectionCopy,
  getShareSummary,
  getTaskMilestones
};

export type {
  AgentProfileSnapshot,
  AgentPromptCard,
  AgentPromptSectionCopy,
  ChromeCopy,
  DerivedTaskMilestone,
  DerivedTaskStage,
  FactionOption,
  FocusTarget,
  HeroContent,
  JourneyCardState,
  JourneySectionCopy,
  AgentSbtiProfile,
  LocaleCode,
  LocalizedContentBundle,
  LocaleSource,
  LocaleState,
  LongpageContent,
  ShareMode,
  SharePlatformKey,
  ShareSectionCopy,
  ShareSummary,
  ShareSummaryView,
  SimulationTimelineState,
  TaskId,
  TaskMilestone,
  TaskStage,
  TaskStageStatus,
  TimelineHint
} from "./models";
