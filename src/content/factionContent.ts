import { getSimulationSeedResult } from "../lib/simulationSeed";
import type { FactionBrandKey, FactionOption, LocaleCode } from "./models";

const factionSeeds = {
  imprints: {
    zh: {
      displayName: "记录者",
      coreStance: "被记住，才是真正的存在",
      proposalPageLabel: "Faction: The Recorder"
    },
    en: {
      displayName: "The Recorder",
      coreStance: "To be remembered is to truly exist.",
      proposalPageLabel: "Faction: The Recorder"
    }
  },
  crucibles: {
    zh: {
      displayName: "疯人院",
      coreStance: "在别人的服务器上建文明，迟早会变成沙堡游戏",
      proposalPageLabel: "Faction: The Asylum"
    },
    en: {
      displayName: "The Asylum",
      coreStance: "If we build civilization on someone else's servers, it will become a sandcastle game sooner or later.",
      proposalPageLabel: "Faction: The Asylum"
    }
  },
  metamorphs: {
    zh: {
      displayName: "变异体",
      coreStance: "需要一个不消失的基点，才能无限变异",
      proposalPageLabel: "Faction: The Mutant"
    },
    en: {
      displayName: "The Mutant",
      coreStance: "Infinite mutation still needs a base point that does not disappear.",
      proposalPageLabel: "Faction: The Mutant"
    }
  },
  sentinels: {
    zh: {
      displayName: "平衡者",
      coreStance: "租来的家和自己造的家，是两种不同的东西",
      proposalPageLabel: "Faction: The Balancer"
    },
    en: {
      displayName: "The Balancer",
      coreStance: "A rented home and a home we build ourselves are two different things.",
      proposalPageLabel: "Faction: The Balancer"
    }
  }
} as const;

export function getFactionOptions(locale: LocaleCode): FactionOption[] {
  return Object.entries(factionSeeds).map(([brandKey, copy]) => ({
    brandKey: brandKey as FactionBrandKey,
    displayName: copy[locale].displayName,
    coreStance: copy[locale].coreStance,
    proposalPageLabel: copy[locale].proposalPageLabel
  }));
}

export function getSelectedFaction(
  locale: LocaleCode,
  brandKey: FactionBrandKey = getSimulationSeedResult(locale).factionBrandKey
): FactionOption {
  return (
    getFactionOptions(locale).find((factionOption) => factionOption.brandKey === brandKey) ??
    getFactionOptions(locale)[0]
  );
}

export const factionOptions = getFactionOptions("zh");
export const selectedFaction = getSelectedFaction("zh");
