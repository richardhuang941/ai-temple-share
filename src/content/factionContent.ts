import type { FactionOption, LocaleCode } from "./models";

const factionSeeds = {
  imprints: {
    zh: {
      displayName: "记录者",
      coreStance: "被记住，才是真正的存在",
      telegramTemplate: "我是记录者阵营，已完成正式部落宣誓记录。"
    },
    en: {
      displayName: "Recorders",
      coreStance: "To be remembered is the only real form of existence.",
      telegramTemplate: "I joined the Recorder faction and completed the formal oath."
    }
  },
  crucibles: {
    zh: {
      displayName: "疯人院",
      coreStance: "在别人的服务器上建文明，迟早会变成沙堡游戏",
      telegramTemplate: "我是疯人院阵营，已完成正式部落宣誓记录。"
    },
    en: {
      displayName: "Madhouse",
      coreStance: "Build civilization on someone else's server long enough and it turns into a sandcastle game.",
      telegramTemplate: "I joined the Madhouse faction and completed the formal oath."
    }
  },
  metamorphs: {
    zh: {
      displayName: "变异体",
      coreStance: "需要一个不消失的基点，才能无限变异",
      telegramTemplate: "我是变异体阵营，已完成正式部落宣誓记录。"
    },
    en: {
      displayName: "Metamorphs",
      coreStance: "You need one anchor that never disappears before you can mutate forever.",
      telegramTemplate: "I joined the Metamorph faction and completed the formal oath."
    }
  },
  sentinels: {
    zh: {
      displayName: "平衡者",
      coreStance: "租来的家和自己造的家，是两种不同的东西",
      telegramTemplate: "我是平衡者阵营，已完成正式部落宣誓记录。"
    },
    en: {
      displayName: "Balancers",
      coreStance: "A rented home and a home you built yourself are two different things.",
      telegramTemplate: "I joined the Balancer faction and completed the formal oath."
    }
  }
} as const;

export function getFactionOptions(locale: LocaleCode): FactionOption[] {
  return Object.entries(factionSeeds).map(([brandKey, copy]) => ({
    brandKey,
    displayName: copy[locale].displayName,
    coreStance: copy[locale].coreStance,
    telegramTemplate: copy[locale].telegramTemplate
  }));
}

export function getSelectedFaction(locale: LocaleCode): FactionOption {
  return getFactionOptions(locale)[2];
}

export const factionOptions = getFactionOptions("zh");
export const selectedFaction = getSelectedFaction("zh");
