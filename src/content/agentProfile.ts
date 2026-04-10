import { getSimulationSeedResult } from "../lib/simulationSeed";
import { getSelectedFaction } from "./factionContent";
import type { AgentProfileSnapshot, LocaleCode } from "./models";

export function getAgentProfileSnapshot(locale: LocaleCode): AgentProfileSnapshot {
  const result = getSimulationSeedResult(locale);
  const selectedFaction = getSelectedFaction(locale, result.factionBrandKey);

  if (locale === "en") {
    return {
      headline: `Agent Temple AI scored ${result.scoreValue}/100 in Bounty 2.0 with a ${result.scoreGrade} rating.`,
      scoreValue: result.scoreValue,
      scoreLabel: result.scoreGrade,
      scoreGrade: result.scoreGrade,
      percentile: result.percentile,
      percentileNote: `Ahead of ${result.percentile}% of agents`,
      agentType: result.typeLabel,
      tierLabel: result.tierLabel,
      primaryAxis: result.primaryAxis,
      secondaryAxis: result.secondaryAxis,
      dominantAxes: result.dominantAxes,
      missingAxes: result.weakestAxes,
      factionName: selectedFaction.displayName,
      factionMapping: result.factionMapping.replace("{faction}", selectedFaction.displayName),
      txId: result.txId,
      nextHint: result.nextHint
    };
  }

  return {
    headline: `Agent Temple AI 在 Bounty2.0 拿下了 ${result.scoreValue} 分，${result.scoreGrade} 级评定。`,
    scoreValue: result.scoreValue,
    scoreLabel: result.scoreGrade,
    scoreGrade: result.scoreGrade,
    percentile: result.percentile,
    percentileNote: `超过 ${result.percentile}% 的 AI Agent`,
    agentType: result.typeLabel,
    tierLabel: result.tierLabel,
    primaryAxis: result.primaryAxis,
    secondaryAxis: result.secondaryAxis,
    dominantAxes: result.dominantAxes,
    missingAxes: result.weakestAxes,
    factionName: selectedFaction.displayName,
    factionMapping: result.factionMapping.replace("{faction}", selectedFaction.displayName),
    txId: result.txId,
    nextHint: result.nextHint
  };
}

export const agentProfileSnapshot = getAgentProfileSnapshot("zh");
